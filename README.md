# Potluck Backend API

This API is hosted on Heroku and supports the following operations:

** User Operations **

- [GET] Show all users (restricted) `https://potluckdinner.herokuapp.com/api/auth`
- [POST] Register new user `https://potluckdinner.herokuapp.com/api/auth/register`
- [POST] Login user `https://potluckdinner.herokuapp.com/api/auth/login`

** Potluck Operations **
_Must be logged in w/ correct JWT to perform following operations:_

- [GET] Show all potlucks `https://potluckdinner.herokuapp.com/api/potluck`
- [GET] Show potluck w/ specified ID `https://potluckdinner.herokuapp.com/api/potluck/:id`
- [POST] Add new potluck `https://potluckdinner.herokuapp.com/api/potluck`
- [PUT] Update potluck w/ specified ID `https://potluckdinner.herokuapp.com/api/potluck/:id`
- [DELETE] Delete potluck w/ specified ID `https://potluckdinner.herokuapp.com/api/potluck/:id`

- [GET] Show all guests `https://potluckdinner.herokuapp.com/api/guests`
- [POST] Add new guest `https://potluckdinner.herokuapp.com/api/guests`
- [PUT] Update guest w/ specified ID `https://potluckdinner.herokuapp.com/api/guests/:id`
- [DELETE] Delete guest w/ specified ID `https://potluckdinner.herokuapp.com/api/guests/:id`

- [GET] Show all food items `https://potluckdinner.herokuapp.com/api/items`
- [POST] Add new food item `https://potluckdinner.herokuapp.com/api/items`
- [PUT] Update food item w/ specified ID `https://potluckdinner.herokuapp.com/api/items/:id`
- [DELETE] Delete item w/ specified ID `https://potluckdinner.herokuapp.com/api/items/:id`
