"""CRUD operations"""

from model import db, User, Place, Rating, Favorite, connect_to_db

#---------------------------------------------------------------------#

def create_user(email, password):
    """Create new user"""
    user = User(email=email, password=password)
    return user

def get_user_by_id(user_id):
    """Return a user by primary key."""
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return user by email"""
    return User.query.filter(User.email == email).first()

#---------------------------------------------------------------------#

def create_place(name, description, website, address, external_id):
    """Create a place/generate place result"""
    # check if place already exists in the database
        # if it doesn't exist, create it, and then grab the place object id
        # if exists, get the place object
    place = Place.query.filter_by(external_id=external_id).first()

    if not place:
        place = Place(name=name, description=description, website=website, address=address, external_id=external_id)
    return place

def get_places():
    """"Return all places"""
    return Place.query.all()

def get_place_by_id(place_id):
    """Return a place by primary key."""
    return Place.query.get(place_id)

#---------------------------------------------------------------------#

def create_rating(stars, user, place):
    """Create and return a rating on a place"""
    rating = Rating(stars=stars, user=user, place=place)
    return rating

def get_ratings():
    """Return all ratings"""
    return Rating.query.all()

def update_rating(rating_id, new_star_rating):
    """Update an existing rating through its rating_id"""
    rating = Rating.query.get(rating_id)
    rating.stars = new_star_rating

#---------------------------------------------------------------------#

def create_favorite(user, place):
    """Create a new favorite place"""
    favorite = Favorite.query.filter_by(user=user, place=place)

    if not favorite:
        favorite = Favorite(user=user, place=place)
    return favorite

def get_favorite_by_user_id(user_id):
    """Return favorite by user id"""
    return Favorite.query.get(user_id)

#---------------------------------------------------------------------#

def delete_place_from_favorites(favorite):
    """Delete a favorite place."""
    db.session.delete(favorite)
    db.session.commit()

if __name__ == '__main__':
    from server import app
    connect_to_db(app)
