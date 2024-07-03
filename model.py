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
    user_name = db.Column(db.String(20))
    email = db.Column(db.String, unique=True)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    rating = db.relationship("Rating", back_populates="users")
    favorite = db.relationship("Favorite", back_populates="users")

    def __repr__(self):
        """Show user info."""
        return f"<User user_id={self.user_id} email={self.email}>"

class Place(db.Model):
    """A Place."""
    __tablename__ = "places"

    place_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    # google_rating = db.Column(db.Integer)
    website = db.Column(db.String)
    address = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    rating = db.relationship("Rating", back_populates="places")
    favorite = db.relationship("Favorite", back_populates="places")

    def __repr__(self):
        """Show place info."""
        return f"<Place place_id={self.place_id} name={self.name}>"

class Rating(db.Model):
    """A Rating."""
    __tablename__ = "ratings"

    rating_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    comment = db.Column(db.Text)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    place_id = db.Column(db.Integer, db.ForeignKey("places.place_id"))

    user = db.relationship("User", back_populates="ratings")
    place = db.relationship("Place", back_populates="ratings")

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

    user = db.relationship("User", back_populates="favorites")
    place = db.relationship("Place", back_populates="favorites")

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
