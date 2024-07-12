"""Models for matcha finder app."""

from flask_sqlalchemy import SQLAlchemy
# from flask_login import LoginManager
# login_manager = LoginManager()
# login_manager.init_app(app)

db = SQLAlchemy()

class User(db.Model):
    """A User."""
    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    password = db.Column(db.String(10))
    email = db.Column(db.String, unique=True)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    rating = db.relationship("Rating", back_populates="user")
    favorite = db.relationship("Favorite", back_populates="user")

    def __repr__(self):
        """Show user info."""
        return f"<User user_id={self.user_id} email={self.email}>"

class Place(db.Model):
    """A Place."""
    __tablename__ = "places"

    place_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    website = db.Column(db.String)
    address = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    rating = db.relationship("Rating", back_populates="place")
    favorite = db.relationship("Favorite", back_populates="place")

    def __repr__(self):
        """Show place info."""
        return f"<Place place_id={self.place_id} name={self.name}>"

class Rating(db.Model):
    """A Rating."""
    __tablename__ = "ratings"

    rating_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    place_id = db.Column(db.Integer, db.ForeignKey("places.place_id"))

    user = db.relationship("User", back_populates="rating")
    place = db.relationship("Place", back_populates="rating")

    def __repr__(self):
        """Show rating."""
        return f"<Rating rating_id={self.rating_id} stars={self.stars}>"

class Favorite(db.Model):
    """A Favorite place."""
    __tablename__ = "favorites"

    favorite_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    place_id = db.Column(db.Integer, db.ForeignKey("places.place_id"))

    user = db.relationship("User", back_populates="favorite")
    place = db.relationship("Place", back_populates="favorite")

    def __repr__(self):
        """Show favorite(s)."""
        return f"<Favorite favorite_id={self.favorite_id}>"

def connect_to_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///matcha'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = False

    db.app = app
    db.init_app(app)
    print("Connected to the db!")

if __name__ == "__main__":
    from server import app

    connect_to_db(app)
