module.exports = (app, volunteersCollection) => {
  // Saves the registered event
  app.post("/volunteer/registration", (req, res) => {
    const event = req.body;

    volunteersCollection
      .insertOne(event)
      .then((result) =>
        res.status(200).send(result.insertedCount ? true : false)
      )
      .catch((err) => res.status(404).send(err.message));
  });

  // Fetches registered events of the current user
  app.post("/volunteer/registeredevents", (req, res) => {
    const email = req.body.email;
    volunteersCollection
      .find({ email: email })
      .sort({ date: -1 })
      .toArray((err, events) => {
        if (events) {
          res.status(200).send(events);
        } else {
          res.status(404).send("No event registered");
        }
      });
  });

  app.get("/volunteer/lists", (req, res) => {
    volunteersCollection.find({}).toArray((err, events) => {
      if (!err) {
        res.status(200).send(events);
        return;
      }
      res.status(404).send("No Data found");
    });
  });
};
