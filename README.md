# Booking App

<hr>

- RegisterTemp and LoginTemp are currently not used. It may be added later to register email in database and login user using an OTP to mail to display a dashboard(currently there is no dashboard).

- For now, during checkout, email and mobile number are obtained and after payment is done, the ticket is mailed and SMS'ed to the user.

- A temporary checking portal is also implemented for any user to check the bookings on their behalf.

# Architecture :

    - Backend :- Heroku - company email
    - Database :- MongoDB - personal email
    - Frontend :- Vercel - personal email

# Schema for DB

<hr>

**City Schema**

displayName:

country:

    code:

    displayName:

    currency:

    code:

    currencyName:

    timeZone:

thumbnailSrc:

**Experience Schema**

cityId:

displayName:

startingPrice:

highlights: [String]

nextAvailable:

duration:

thumbnailSrc:

**Variant Schema**

experienceId:

displayName:

startingTime:

duration:

startingPrice:

price:

    adult:

    children:

    infants:

unavailableDates:[Date]

highlights:[String]

availableTimeSlots:[String]

ticketsLeft:

# Future additions to be made

- An admin panel to create, read, update and delete data in the database (e.g experiences, variants, cities, etc.)

- CMS integration for ease of modification of static content in the frontend

- UI improvements and additional functionalities for the users on the site

# Image dimensions

- Cities - 150 x 150
- Experiences - 200 x 200
- Variants - 200 x 200

# While deploying production

- Get images from mongoDB and not through server storage
- Admin panel
- During payment, get price from backend using a productId or so
- Bookings once, should send an alert to the employee designated and the vendors
- UI improvements
- PWA
- Searchbar and filters:
  - Place, date, experiences
- Recommendation system with ML people
- SEO
