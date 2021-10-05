# Admin Endpoint Technical Documentation

## Available Endpoints

### Car Parks and Car Bays

```
api/carparks/           [GET, POST]
api/carparks/<int>      [GET, PUT, DELETE]
api/carparks/<int>/bays [GET, POST]
api/bay/                [GET, POST]
api/bays/<int>          [GET, PUT, DELETE]
```

### Bookings

```
api/bays-booked     [POST]
api/bookings        [GET, POST]
api/bookings/<int>  [GET, DELETE]
```

### Users

```
api/users       [GET, POST]
api/users/<int> [GET, PUT, DELETE]
```