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
    const email = req.body;
    volunteersCollection.find({ email: email }).toArray((err, events) => {
      if (events) {
        res.status(200).send(events);
      } else {
        res.status(404).send("No event registered");
      }
    });
  });
};