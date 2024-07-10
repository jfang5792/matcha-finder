"""Server for matcha finder app."""

from flask import Flask, render_template, request, redirect, flash, session
from model import db, connect_to_db
import crud
import jinja2

app = Flask(__name__)
app.secret_key = 'MATCHA_FINDER_TOKEN'

app.jinja_env.undefined = jinja2.StrictUndefined

@app.route("/")
def index():
    """View homepage."""
    return render_template("homepage.html")

@app.route("/users")
def get_users():
    """View all users."""
    users = crud.get_users()
    return render_template("users.html", users=users)

@app.route("/users", methods=["POST"])
def create_user():
    """Register as new user"""
    email = request.form.get("email")
    user_name = request.form.get("user_name")

    user = crud.get_user_by_email(email)
    if user:
        flash("Account with that email already exists. Try logging in.")
    else:
        user = crud.create_user(email, user_name)
        db.session.add(user)
        db.session.commit()
        flash("Account successfully created. Please log in.")
    return redirect("/")

# @app.route("/login", methods=["POST"])
#     """Process user login."""

#     return render_template("login.html")

# @app.route("/favorites")
#     return

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=7000)
