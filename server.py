"""Server for matcha finder app."""

from flask import Flask, render_template, jsonify, request, redirect, flash, session
from model import db, connect_to_db
import crud as crud
import jinja2
import requests

import json
import os

app = Flask(__name__)
app.secret_key = 'MATCHA_FINDER_TOKEN'
app.jinja_env.undefined = jinja2.StrictUndefined

def get_api_key():
    pass

#---------------------------------------------------------------------#

@app.route("/")
def index():
    """View homepage."""
    return render_template("base.html")

@app.route("/register", methods=["GET"])
def register_user():
    """Create a new user account with email and password."""
    return render_template("register.html")

@app.route("/register", methods=["POST"])
def registered():
    """Register as new user"""
    email = request.form.get("email")
    password = request.form.get("password")
    user = crud.get_user_by_email(email)
    if user:
        flash("Account with that email already exists. Try logging in.")
    else:
        user = crud.create_user(email, password)
        db.session.add(user)
        db.session.commit()
        flash("Account successfully created. Please log in now.")
    return redirect("/")

@app.route("/login", methods=["GET"])
def logging():
    """Log in to account"""
    return render_template("login.html")

@app.route("/login", methods=["POST"])
def login():
    """Process user login."""
    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or password you entered was incorrect. Try again please.")
    else:
        session["email"] = user.email
        flash(f"Welcome back, {user.email}!")
    return render_template("login.html", email=email, password=password)

@app.route("/favorites")
def view_favorite():
    """View favorites page"""
    favorites = crud.get_favorites()
    return render_template("favorite.html", favorites=favorites)

@app.route("/api/favorite", methods=["POST"])
def create_favorite():
    """Add a place to Favorites"""
    email = session["email"]
    user = crud.get_user_by_email(email)
    print("USER IS HERE:", user)
    # place = crud.create_place(name, description, website, address)
    place_id = request.json.get("place_id")
    print("PLACE ID IS THIS:", place_id)
    res = requests.get('https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={API_KEY}')
    # name =
    # favorite = crud.create_favorite(user, place)
    print("YOOHOOOOOOOOOOOOO:", res)
    return {"Status": "Ok"}


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=7770)
