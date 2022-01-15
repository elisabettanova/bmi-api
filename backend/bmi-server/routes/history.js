var express = require("express");
const { create } = require("hbs");
var Measurements = require("../models/measurements");
var router = express.Router();

//creates
router.post("/", function (req, res, next) {
  console.log(req.body);

  let weight = req.body.weight;
  let height = req.body.height;

  let bmi = ((weight / height / height) * 10000).toFixed(2);
  let datetime = new Date().toLocaleString();

  let responseObject = { bmi: bmi, datetime: datetime };

  Measurements.add(responseObject, function (err) {
    if (err) {
      res.status(500).send("There was an error");
    } else {
      res.json(responseObject);
    }
  });
});

//All
router.get("/", function (req, res, next) {
  Measurements.all(function (err, data) {
    if (err) {
      res.status(500).send("There was an error");
    } else {
      res.json(data);
    }
  });
});

//One
router.get("/:id", function (req, res, next) {
  Measurements.one(id, function (err, data) {
    if (err) {
      res.status(500).send("There was an error");
    } else {
      res.json(data);
    }
  });
});

//Update
router.put("/:id", function (req, res, next) {
  const id = parseInt(req.params.id);

  let weight = req.body.weight;
  let height = req.body.height;

  let bmi = ((weight / height / height) * 10000).toFixed(2);
  let datetime = new Date().toLocaleString();

  let newData = { bmi: bmi, dateTime: dateTime };

  Measurements.update(id, newData, function (err, data) {
    if (err) {
      res.status(500).send("There was an error");
    } else {
      res.status(200).send();
    }
  });
});
//Delete
router.delete("/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  Measurements.delete(id, function (err) {
    if (err) {
      res.status(500).send("There was an error");
    } else {
      res.status(200).send();
    }
  });
});
module.exports = router;
