# API Documentation

## Car Parks and Car Bays

`api/carparks/`

| Method | Action                |
| ------ | --------------------- |
| GET    | Returns all carparks  |
| POST   | Creates a new carpark |

`api/carparks/<id>`

| Method | Action               |
| ------ | -------------------- |
| GET    | Returns carpark `id` |
| PUT    | Updates carpark `id` |
| DELETE | Deletes carpark `id` |

`api/carparks/<id>/bays`

| Method | Action                               |
| ------ | ------------------------------------ |
| GET    | Returns all bays within carpark `id` |
| POST   | Creates a new bay in carpark `id`    |

`api/bay/`

| Method | Action                                                              |
| ------ | ------------------------------------------------------------------- |
| GET    | Returns all bays                                                    |
| POST   | Creates a new bay in a carpark specified in the body of the request |

`api/bays/<id>`

| Method | Action           |
| ------ | ---------------- |
| GET    | Returns bay `id` |
| PUT    | Updates bay `id` |
| DELETE | Deletes bay `id` |

## Bookings

`api/bays-booked`

| Method | Action |
| ------ | ------ |
| POST   | ???    |

`api/bookings`

| Method | Action |
| ------ | ------ |
| GET    | ???    |
| POST   | ???    |

`api/bookings/<int>`

| Method | Action |
| ------ | ------ |
| GET    | ???    |
| DELETE | ???    |

## Users

`api/users [GET, POST]`

| Method | Action |
| ------ | ------ |
| GET    | ???    |
| POST   | ???    |

`api/users/<int> [GET, PUT, DELETE]`

| Method | Action |
| ------ | ------ |
| GET    | ???    |
| PUT    | ???    |
| DELETE | ???    |