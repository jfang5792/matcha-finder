"""CRUD operations"""

from model import db, User, Place, Rating, Favorite, connect_to_db

def create_user(email, user_name):
    """Create new user"""
    user = User(email=email, user_name=user_name)
    return user

def create_place(name, description, website, address):
    """Create a place/generate place result"""
    place = Place(name=name, description=description,
                   website=website, address=address)
    return place

def create_rating(comment, stars, user, place):
    """Create a rating on a place"""
    rating = Rating(comment=comment, stars=stars,
                    user=user, place=place)
    return rating

def create_favorite(user, place):
    """Add a place to favorite"""
    favorite = Favorite(user=user, place=place)
    return favorite


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
