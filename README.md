# Matcha Finder

A web app where users can search for matcha by location, create a secure account to continue building their curated favorites list, where they can also review and rate results.

## Technologies

- Python
- PostgreSQL
- React
- Flask
- JavaScript
- Vite
- Bootstrap
- HTML
- CSS
- Google Places API:
  - https://developers.google.com/maps/documentation/places/web-service/text-search
- AWS

## Key Features

- Data Model - created a PosgreSQL database to manage functionality of features.
  https://dbdiagram.io/d/matcha-finder-6671ee495a764b3c72d0f9b1

![db_model](frontend/src/assets/dbmodel.png)

- Users can search with text/get places rendered
- Users can create an account
- Users can login
- Logged in users can favorite places
- Logged in users can rate results (star)

## Future Development

- Logged in users can comment on/review places
- If the user visits a place more than once, average their ratings for that place
- Logged in users can set a date to visit and see last date visited
- Each place will display Google Map image
