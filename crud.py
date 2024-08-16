"""CRUD operations"""

from model import db, User, Place, Rating, Favorite, connect_to_db

#------------------------------------------------------------------------#
# USERS

def create_user(email, password):
    """Create new user"""
    user = User(
        email=email,
        password=password
    )
    db.session.add(user)
    db.session.commit()
    return user

def get_user_by_id(user_id):
    """Return a user by primary key."""
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return user by email"""
    return User.query.filter(User.email == email).first()

def delete_user_by_email(email):
    """Delete user from database by email"""
    user = User.query.get(email)
    db.session.delete(user)
    db.session.commit()
    return

def delete_user_by_user_id(user_id):
    """Delete user from database by user id."""
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return

#------------------------------------------------------------------------#
# PLACES

def create_place(name, description, website, address, external_id):
    """Create a place/generate place result"""
    # check if place already exists in the database
        # if it doesn't exist, create it, and then grab the place object id
        # if exists, get the place object
    place = Place.query.filter_by(external_id=external_id).first()

    if not place:
        place = Place(
            name=name,
            description=description,
            website=website,
            address=address,
            external_id=external_id
        )
    # db.session.add(place)
    # db.session.commit()
    return place

def get_places():
    """"Return all places"""
    return Place.query.all()

def get_place_by_id(place_id):
    """Return a place by primary key."""
    return Place.query.get(place_id)

def get_place_by_external_id(external_id):
    """Return a place by API external_id."""
    return Place.query.get(external_id)

def delete_place(user_id, place_id):
    """Delete place"""
    place_to_delete = Place.query.filter_by(user_id=user_id, place_id=place_id).first()
    print(f"Place deleted:", place_to_delete)
    db.session.delete(place_to_delete)
    db.session.commit()
    print(f"Place {place_id} removed from User {user_id} Place()")
    return

#------------------------------------------------------------------------#
# RATINGS

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

#------------------------------------------------------------------------#
# FAVORITES

def create_favorite(user, place):
    """Create a new favorite place"""
    favorite = Favorite.query.filter_by(user=user, place=place).first()

    if not favorite:
        favorite = Favorite(
            user=user,
            place=place
        )
    return favorite

def get_favorite_by_user_id(user_id):
    """Return favorite by user id"""
    return Favorite.query.get(user_id)

def get_favs():
    """"Return all favorite places"""
    return Favorite.query.all()

# def delete_place_from_favorites(user_id, favorite_id):
#     """Delete a favorite place."""
#     favorite_place_to_delete = Favorite.query.filter_by(user_id=user_id, favorite_id=favorite_id).first()
#     print(f"Place now removed from Favorites list:", favorite_place_to_delete)
#     db.session.delete(favorite_place_to_delete)
#     db.session.commit()
#     return


#------------------------------------------------------------------------#
if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    #db.create_all()
