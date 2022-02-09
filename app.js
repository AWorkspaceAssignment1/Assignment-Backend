const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app =express();
app.use(bodyParser.urlencoded({extended: true}));

let database = process.env.DBLink;
mongoose.connect(database, {useNewUrlParser: true});

const eventSchema = {
    eventId: Number,
    eventName: String,
    description: String,
    amount: Number,
    owner: Number,
    categories: [String],
    paticipant: [Number]
};

const Event = mongoose.model("Event", eventSchema);

app.route("/events")

.get(function(req, res){
    Event.find(function(err, events){
      if (events) {
        const jsonEvents = JSON.stringify(events);
        res.send(jsonEvents);
      } 
      else {
        res.send("Database is empty");
      }
    });
  })
  
.post(function(req, res){
    const newEvent = Event({
        eventId: req.body.eventId,
        eventName: req.body.eventName,
        description: req.body.description,
        amount: req.body.amount,
        owner: req.body.owner,
        categories: req.body.categories,
        paticipant: req.body.paticipant
    });
  
    newEvent.save(function(err){
      if (!err){
        res.send("Successful");
      } 
      else {
        res.send(err);
      }
    });
  })

app.route("/events/:eventId")

.get(function(req, res){
  const eventId = req.params.eventId;
  Event.findOne({eventId: eventId}, function(err, event){
    if (event){
      const jsonEvent = JSON.stringify(event);
      res.send(jsonEvent);
    } 
    else {
      res.send("Event not exist");
    }
  });
})

.patch(function(req, res){
    const eventId = req.params.eventId;
    Event.update(
      {eventId: eventId},
      {$set: req.body},
      function(err){
        if (!err){
          res.send("updated");
        } 
        else {
          res.send(err);
        }
      });
  })

.delete(function(req, res){
    const eventId = req.params.eventId;
    Event.findOneAndDelete({eventId: eventId}, function(err){
      if (!err){
        res.send("Deleted");
      } 
      else {
        res.send(err);
      }
    });
  });

app.route("/category/:category")

.get(function(req, res){
    const category = req.params.category;
    Event.find({categories: category}, function(err, event){
      if (event){
        const jsonEvent = JSON.stringify(event);
        res.send(jsonEvent);
      } 
      else {
        res.send("No event in this category");
      }
    });
  })

app.route("/ownedEvent/:userId")

.get(function(req, res){
    const user = req.params.userId;
    Event.find({owner: user}, function(err, event){
      if (event){
        const jsonEvent = JSON.stringify(event);
        res.send(jsonEvent);
      } 
      else {
        res.send("No event found");
      }
    });
  })

app.route("/paticipatedEvent/:userId")

.get(function(req, res){
    const user = req.params.userId;
    Event.find({paticipant: user}, function(err, event){
      if (event){
        const jsonEvent = JSON.stringify(event);
        res.send(jsonEvent);
      } 
      else {
        res.send("No event found");
      }
    });
  })

app.route("/events/:eventId/join/:userId")

.patch(function(req, res){
  const eventId = req.params.eventId;
  const userId = req.params.userId;

  Event.findOne({eventId: eventId}, function(err, event){
    if (event){
      let a = event.amount;
      if (a > 0){
        Event.update(
          {eventId: eventId},
          {$push: {paticipant: userId}, $inc: {amount: -1 }},
          function(err){
            if (!err){
              res.send("join successful");
            } 
            else {
              res.send(err);
            }
          });
      }
      else{
        res.send("Event is already full");
      }
    } 
    else {
      res.send("Event not exist");
    }
  });
})

app.route("/events/:eventId/cancel/:userId")

  .patch(function(req, res){
      const eventId = req.params.eventId;
      const userId = req.params.userId;
      Event.update(
        {eventId: eventId},
        {$pull: {paticipant: userId}, $inc: {amount: 1}},
        function(err){
          if (!err){
            res.send("cancel successful");
          } 
          else {
            res.send(err);
          }
        });
    })

let port = process.env.PORT;

if (port == null || port == ""){
    port = 3000
}

app.listen(port, function() {
    console.log("Server started");
  });