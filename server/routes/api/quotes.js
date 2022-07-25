const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const mongoose = require('mongoose');
// Load Quote model
const Quote = require("../../../models/Quote");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Quote.find({userId: req.user._id.toString()}, function(err, doc) {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true, quotes: doc });
    }});
});

router.get("/get/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  let myquery = { _id: mongoose.Types.ObjectId( req.params.id ), userId: req.user._id.toString()};
  Quote.findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/add", passport.authenticate("jwt", { session: false }), (req, response) => {
  let newQuote = new Quote({
    quote: req.body.quote,
    city: req.body.city,
    date: req.body.date,
    speaker: req.body.speaker,
    userId: req.user._id.toString(),
    img: req.body.img,
  });
  console.log(newQuote);
  const createQuote = async (quote) => {
    try {
      await Quote.create(newQuote);
      response.json({
        success: true
      });
    } catch (err) {
      response.json({
        success: true,
        error: err.message,
      });
    }
  };
  createQuote(newQuote);
});

router.post("/:id", passport.authenticate("jwt", { session: false }), (req, response) => {
  let myquery = { _id: mongoose.Types.ObjectId( req.params.id ), userId: req.user._id.toString()};
  let updatedQuote = ({
    quote: req.body.quote,
    city: req.body.city,
    date: req.body.date,
    speaker: req.body.speaker,
  });
  Quote.findOneAndUpdate(myquery, updatedQuote, (error, result) => {
    if (error) {
      response.json({
        success: false,
        error: error.message,
      });
    } else {
      response.json({
        success: true
      });
    }
  });
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, response) => {
  let myquery = { _id: mongoose.Types.ObjectId( req.params.id ), userId: req.user._id.toString()};
  Quote.findOneAndDelete(myquery, (error, result) => {
    if (error) {
      response.json({
        success: false,
        error: error.message,
      });
    } else {
      response.json({
        success: true
      });
    }
  });
});

module.exports = router;