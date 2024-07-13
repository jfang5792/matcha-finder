"""Server for matcha finder app."""

from flask import Flask, render_template, request, redirect, flash, session
from model import db, connect_to_db
import crud as crud
import jinja2

app = Flask(__name__)
app.secret_key = 'MATCHA_FINDER_TOKEN'

app.jinja_env.undefined = jinja2.StrictUndefined

@app.route("/")
def index():
    """View homepage."""
    return render_template("base.html")

#homepage >> 1register account or 2login
#1register >> email/pass buttons >> back to homepage to login
#2login >> email/pass buttons >> to favorites page

@app.route("/register", methods=["GET"])
def register_user():
    return render_template("register.html")

@app.route("/registered", methods=["POST"])
def registered():
    """Register as new user"""
    email = request.form.get("email")
    password = request.form.get("password")
    print("email is:", email)
    user = crud.get_user_by_email(email)
    print("user is:", user)
    if user:
        flash("Account with that email already exists. Try logging in.")
    else:
        user = crud.create_user(email, password)
        db.session.add(user)
        db.session.commit()
        flash("Account successfully created. Please log in.")
    return redirect("/")

# @app.route("/login", methods=["GET"])
# def login():
#     return render_template("login.html")

@app.route("/login", methods=["POST"])
def login():
    """Process user login."""
    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")
    else:
        session["email"] = user.email
        flash(f"Welcome back, {user.email}!")
    return render_template("login.html", email=email, password=password)

# @app.route("/favorites")
#     return

@app.route("/users")
def get_users():
    """View all users."""
    users = crud.get_users()
    return render_template("users.html", users=users)

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=7770)
