const express = require("express");
const router = express.Router();
const job = require("../schemas/job.schema");
const User = require("../schemas/user.schema");
const { isLoggedin } = require("../midway/auth");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

router.post("/create", isLoggedin, async (req, res) => {
  try {
    const { title, description, salary, location } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const newjob = await new job({
      title,
      description,
      salary,
      location,
      userId: user._id,
    }).save();
    return res.status(200).json({ message: "job created", id: newjob._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

router.put("/:id", isLoggedin, async (req, res) => {
  try {
    const { title, description, salary, location } = req.body;
    const user = await User.findOne({ email: req.user.email });
    console.log(user);
    const Job = await job.findOne({ _id: req.params.id, userId: user._id });
    if (!Job) {
        console.log(Job);
      res.status(400).json({ message: "job not found" });
      return;
    }
    Job.title = title;
    Job.description = description;
    Job.salary = salary;
    Job.location = location;
    await job.save();
    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server not connected" });
  }
});

module.exports = router;
