"""Server for Matcha Finder app."""

from flask import Flask, jsonify, request, redirect, flash, session
from model import db, connect_to_db
import crud as crud
import requests
from dotenv import load_dotenv
import os
import json

load_dotenv(os.path.join(os.path.dirname(__file__), "env", "development.env"))

app = Flask(__name__, static_folder="frontend/dist", static_url_path="/")
app.secret_key = os.getenv("FLASK_SECRET_KEY") or os.urandom(24)
print("Secret Key Check:", app.secret_key)

api_key = os.getenv("API_KEY")


def get_api_key():
    return api_key


# ---------------------------------------------------------------------#


@app.route("/api/register", methods=["POST"])
def api_register():
    """Register as new user"""
    email = request.json.get("email")
    password = request.json.get("password")
    user = crud.get_user_by_email(email)

    print("USER SAVED:", user)
    print("EMAIL SAVED:", email)
    print("PW SAVED:", password)
    if user:
        msg = f"Account with that email already exists. Please log in."
        status = "Error"
    else:
        user = crud.create_user(email, password)
        db.session.add(user)
        db.session.commit()
        session["user"] = user.user_id  # "user": user.user_id
        msg = f"Account successfully created."
        status = "Ok"
    return jsonify({"msg": msg, "status": status, "user_id": user.user_id})


@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.json
        print("Login Data ->", data)
        email = request.json.get("email")
        password = request.json.get("password")
        user = crud.get_user_by_email(email)
        if not user or user.password != password:
            return jsonify(
                {
                    "msg": "The email or password you entered was incorrect. Try again or create an account.",
                    "status": "Error",
                }
            ), 401  # failed login error code
        session["email"] = user.email
        return jsonify({"msg": f"Welcome back, {user.email}!", "status": "Ok"})
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"status": "Error", "msg": str(e)}), 500


# @app.route("/api/login", methods=["POST"])
# def api_login():
#     """Process user login."""
#     email = request.json.get("email")
#     password = request.json.get("password")
#     user = crud.get_user_by_email(email)
#     if not user or user.password != password:
#         msg = "The email or password you entered was incorrect. Try again or create an account."
#         status = "Error"
#     else:
#         session["email"] = user.email
#         msg = f"Welcome back, {user.email}!"
#         status = "Ok"
#     return jsonify({"msg": msg, "status": status})


# helper function:
def if_user_in_session():
    return "email" in session and session["email"]


@app.route("/api/logout", methods=["POST"])
def logout():
    """Log out by clearing user session data"""
    session.clear()
    return jsonify({"msg": "Logged out successfully", "status": 200})


# ------------------------------------------------------------------------#


# endpoints for places
@app.route("/api/places/textsearch", methods=["GET"])
def text_search():
    query = request.args.get("query")
    api_key = get_api_key()
    response = requests.get(
        f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={api_key}"
    )
    return jsonify(response.json())


@app.route("/api/places/details", methods=["GET"])
def place_details():
    place_id = request.args.get("place_id")
    api_key = get_api_key()
    response = requests.get(
        f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key}"
    )
    return jsonify(response.json())


# ------------------------------------------------------------------------#


# get endpoint for list of favorites
@app.route("/api/favorites")
def view_favs():
    """View list of favorites"""
    email = session.get("email")
    user = crud.get_user_by_email(email)
    myfavs = crud.get_user_favs(user)
    favList = []
    for fav in myfavs:
        favList.append(
            {
                "name": fav.place.name,
                "formatted_address": fav.place.address,
                "description": fav.place.description,
                "place_id": fav.place.place_id,
            }
        )
    print("favList:", favList)
    return jsonify(favList)


@app.route("/api/favorites", methods=["POST"])
def create_favorite():
    """Create a new favorite place"""
    email = session.get("email")
    # user = crud.get_user_by_email(email)

    if not email:
        flash(f"Must create account or login to add to favorites")
        return redirect("/")
    # getting data from the frontend
    google_place_id = request.json.get("place_id")
    # print("user crud.get_user_by_email:", user) #<User user_id=3 email=jenny@gmail>
    # print("place_id from req.json.get:", place_id) #ChIJX57b5vWHhYARRNKgLz2GwFc

    # using the google_place_id to query google place details API for place information
    response = requests.get(
        f"https://maps.googleapis.com/maps/api/place/details/json?place_id={google_place_id}&key={api_key}"
    )
    # from pprint import pprint
    # print("result")
    # pprint(response.json()['result'])

    # parsing response data that's returned from the place details API
    data = response.json()["result"]
    print("DATA ERROR HERE:", data)
    name = data["name"]
    print(name)
    address = data["formatted_address"]
    website = data.get("website")
    description = None
    if data.get("editorial_summary"):
        description = data.get("editorial_summary").get("overview")
    print("address:", address)
    print("website:", website)
    print("description:", description)

    # Get or create the place I want to store in my db
    place = crud.create_place(
        name=name,
        description=description,
        website=website,
        address=address,
        external_id=google_place_id,
    )
    db.session.add(place)
    db.session.commit()

    # Creating the user favorite place
    user = crud.get_user_by_email(email)
    favorite = crud.create_favorite(user=user, place=place)
    print("favorite is:", favorite)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"Status": "Ok"})


# ------------------------------------------------------------------------#


# get endpoint for rated favorites
@app.route("/api/favorites")
def view_rated_favs():
    """View list of rated favorites"""
    email = session.get("email")
    user = crud.get_user_by_email(email)
    rated = crud.get_user_favs(user)
    user_ratings = crud.get_user_ratings(user)
    ratedList = []
    for rate in rated:
        ratedList.append(
            {
                "name": rate.place.name,
                "formatted_address": rate.place.address,
                "description": rate.place.description,
                "place_id": rate.place.place_id,
            }
        )
    print("ratedList:", ratedList)
    return jsonify(ratedList)


@app.route("/api/favorites", methods=["POST"])
def add_rating():
    data = request.json
    place_id = data.get("place_id")
    email = session.get("email")
    user = crud.get_user_by_email(email)
    try:
        rating = crud.create_rating(user, place_id)
        return jsonify({"success": True, "rating": rating})
    except Exception as err:
        return jsonify({"success": False, "error": str(err)})


# ------------------------------------------------------------------------#


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(_error):
    return app.send_static_file("index.html")


# ---------------------------------------------------------------------#


if __name__ == "__main__":
    connect_to_db(app)
    app.run(port=6060)
    # app.run(host="0.0.0.0", debug=True, port=6060)
