const ObjectId = require("mongodb").ObjectID;

module.exports = (app, eventsCollection) => {
  // Adds all events
  app.post("/addevents", (req, res) => {
    const allevents = req.body;
    eventsCollection
      .insertMany(allevents)
      .then((res) => res.status(200).send(true))
      .catch((err) => res.status(200).send(false));
  });

  // Gets all events information
  app.get("/allevents", (req, res) => {
    eventsCollection.find({}).toArray((err, documents) => {
      if (!err) {
        res.status(200).send(documents);
        return;
      }
      res.status(404).send("No Data found");
    });
  });

  // Adds new Event
  app.post("/events/add", (req, res) => {
    const event = req.body;
    event.image = "/resources/images/extraVolunteer.png";

    eventsCollection.insertOne(event).then((result) => {
      if (result.insertedCount) {
        res.status(200).send(true);
        return;
      }
      res.status(404).send(false);
    });
  });

  //   Fetches individual event information
  app.get("/events/:id", (req, res) => {
    const eventId = req.params.id;

    eventsCollection
      .findOne({ _id: ObjectId(eventId) })
      .then((event) => res.status(200).send(event))
      .catch((err) => res.status(404).send(false));
  });
};
