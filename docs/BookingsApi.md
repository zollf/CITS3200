# Booking API
Used for getting specific booking results.
A billboard can be integrated with this by created scheduled request at every half hour.
I recommend pulling full payload at 00:00 and running a scheduled billboard based on that.

## Carpark List - `/api/v1/open/carparks` GET
Example Response
```json
[
  {
    "pk": 1,
    "name": "test",
    "description": "test",
    "google_maps_link": "https://google.com",
    "carbays": [
      1,
      2
    ]
  },
  {
    "pk": 2,
    "name": "new one",
    "description": "new one",
    "google_maps_link": "123",
    "carbays": []
  }
]
```

## Bays List All `/api/v1/open/bay` GET
Example Response
```json
[
  {
    "pk": 1,
    "carpark": 1,
    "bay_number": "1",
    "description": "This is bay"
  },
  {
    "pk": 2,
    "carpark": 1,
    "bay_number": "2",
    "description": "this is another bay"
  }
]
```

## Single bay with specific id `/api/v1/open/bays/{bay_id}` GET
Example Response
```json
{
  "pk": 1,
  "carpark": 1,
  "bay_number": "1",
  "description": "This is bay"
}
```

## Bays given carpark id `/api/v1/open/carparks/{carpark_id}/bays` GET
Example Response
```json
[
  {
    "pk": 1,
    "carpark": 1,
    "bay_number": "1",
    "description": "This is bay"
  },
  {
    "pk": 2,
    "carpark": 1,
    "bay_number": "2",
    "description": "this is another bay"
  }
]
```

## Bays Booked `/api/v1/open/bays-booked/` POST
Example Request
```json
{
  "date": "2000-01-01",
  "carpark": 1
}
```
Example Response
```json
{
  "success": true,
  "bays": [
    {
      "pk": 2,
      "bay": {
        "id": 1,
        "bay_number": "1",
        "description": "This is bay",
        "carpark": 1
      },
      "start_time": "00:00:00",
      "end_time": "12:30:00"
    },
    {
      "pk": 3,
      "bay": {
        "id": 2,
        "bay_number": "2",
        "description": "this is another bay",
        "carpark": 1
      },
      "start_time": "00:00:00",
      "end_time": "12:30:00"
    },
  ],
}
```
### To get all bookings for an individual bay supply `bay`
Example Request
```json
{
  "date": "2000-01-01",
  "carpark": 1,
  "bay": 1
}
```
Example Response
```json
{
  "success": true,
  "bays": [
    {
      "pk": 2,
      "bay": {
        "id": 1,
        "bay_number": "1",
        "description": "This is bay",
        "carpark": 1
      },
      "start_time": "00:00:00",
      "end_time": "12:30:00"
    },
  ],
}
```
