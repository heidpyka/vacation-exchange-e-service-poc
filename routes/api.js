const express = require("express");
const router = express.Router();
const passport = require("passport");
const Applications = require("../models/applicationSchema");

router.post("/applications", (req, res, next) => {
  if (req.body.name && req.body.pid) {
    Applications.create(req.body)
      .then((data) => res.json(data))
      .catch(function (err) {
        if (err.name == "ValidationError") {
          res
            .status(400)
            .json({ message: "Kontrollera angivet personnummer." });
        }
      });
  } else {
    res.json({
      error: "The name or pid field is empty",
    });
  }
});

router.get("/applications/manager", (req, res, next) => {
  Applications.find({ manager: req.query.username, status: req.query.status })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/applications/payroll", (req, res, next) => {
  Applications.find({ status: req.query.status })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/applications/history", (req, res, next) => {
  Applications.find({ $or: [{ status: "completed" }, { status: "rejected" }] })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/application", (req, res, next) => {
  Applications.find({ username: req.query.username })
    .then((data) => res.json(data))
    .catch(next);
});

router.put("/application", (req, res, next) => {
  Applications.findOneAndUpdate(
    { _id: req.body.id },
    { status: req.body.status }
  )
    .then((data) => res.json(data))
    .catch(next);
});

router.post(
  "/users",
  passport.authenticate("ldapauth", {
    session: false,
  }),
  function (req, res) {
    res.json(req.user);
  }
);

module.exports = router;
