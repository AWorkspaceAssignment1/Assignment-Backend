# EventHub-BackEnd

EventHub web application is an application where user can find fascinating events from around the world and be able to paticipate in the event! Moreover, user can create their own event and post it in the main dashboard.

### Development tools
* NodeJS
* Express
* MongoDB
* Mongoose
* Heroku server

### Database Schema

```
const eventSchema = {
    eventId: Number,
    eventName: String,
    amount: Number,
    owner: String,
    categories: String,
    paticipant: [String]
};
```

### API Documentation

Deployed node JS application => https://sheltered-tundra-26707.herokuapp.com

1. Get all events

```
GET : https://sheltered-tundra-26707.herokuapp.com/events
```

2. Add a event

```
POST : https://sheltered-tundra-26707.herokuapp.com/events
```

body : x-www-form-urlencoded

```
    const newEvent = Event({
        eventId: <Number>,
        eventName: <String>,
        amount: <Number>,
        owner: <String>,
        categories: <String>,
        paticipant: <[String]>
    });
```

3. Get a specific event

```
GET : https://sheltered-tundra-26707.herokuapp.com/events/:eventId
```

4. Modify a specific event

```
PATCH : https://sheltered-tundra-26707.herokuapp.com/events/:eventId
```

5. Delete a specific event

```
DELETE : https://sheltered-tundra-26707.herokuapp.com/events/:eventId
```

6. Get all events in a specific category

```
GET : https://sheltered-tundra-26707.herokuapp.com/category/:categoryName
```

7. Get all events that created by a specific user

```
GET : https://sheltered-tundra-26707.herokuapp.com/ownedEvent/:userEmail
```

8. Get all events that paticipated by a specific user

```
GET : https://sheltered-tundra-26707.herokuapp.com/paticipatedEvent/:userEmail
```

9. Join an event

```
PATCH : https://sheltered-tundra-26707.herokuapp.com/events/:eventId/join/:userMail
```

10. Cancel an event

```
PATCH : https://sheltered-tundra-26707.herokuapp.com/events/:eventId/cancel/:userMail
```



