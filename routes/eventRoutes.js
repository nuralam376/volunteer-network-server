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
};
