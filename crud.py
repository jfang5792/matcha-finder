"""CRUD operations"""

from model import db, User, Place, Rating, Favorite, connect_to_db

def create_user(email, user_name):
    """Create new user"""
    user = User(email=email, user_name=user_name)
    return user

def get_users():
    """Returns all users"""
    return User.query.all()

def get_user_by_id(user_id):
    """Return a user by primary key."""
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return user by email"""
    return User.query.filter(User.email == email).first()



def create_place(name, description, website, address):
    """Create a place/generate place result"""
    place = Place(name=name, description=description,
                   website=website, address=address)
    return place

def get_places():
    """"Return all places"""
    return Place.query.all()

def get_place_by_id(place_id):
    """Return a place by primary key."""
    return Place.query.get(place_id)



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




def create_favorite(user, place):
    """Add a place to favorite"""
    favorite = Favorite(user=user, place=place)
    return favorite

def get_favorites():
    """Return all favorites"""
    return Favorite.query.all()

# def get_favorite_by_user_id(user_id):
#     """Return favorite by user id"""
#     return Favorite.query.get(user_id)



if __name__ == '__main__':
    from server import app
    connect_to_db(app)
