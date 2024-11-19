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
    console.log(JSON.stringify(user));

    const newjob = await new job({
      title,
      description,
      salary,
      location,
      userid: user,
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
    const jo = await job.findOne({ _id: req.params.id, userid: user._id });

    if (!jo) {
      res.status(400).json({ message: "job not found" });
      return;
    }
    jo.title = title;
    jo.description = description;
    jo.salary = salary;
    jo.location = location;
    await jo.save();
    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server not connected" });
  }
});

router.delete("/:id", isLoggedin, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const jo = await job.findOne({ _id: req.params.id, userid: user._id });

    if (!jo) {
      res.status(400).json({ message: "job not found to delete" });
      return;
    }
    await job.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server issue" });
  }
});

router.get("/:id", isLoggedin, async(req,res)=>{
  try{
    const jo= await job.findById(req.params.id);
    if(!jo){
      res.status(404).json({message:"not find job to show"});
      return
    }
    res.status(200).json(jo);
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"server error to get"})
  }
})

module.exports = router;
