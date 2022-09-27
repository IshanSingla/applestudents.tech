const router = require("express").Router();
const mongoose = require("mongoose");
const events = require("../models/events.schema");
const User = require("../models/users.schema");
const { isLoggedIn } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// All Events page
router.get("/", async (req, res) => {
  res.status(200).render("index");
});

// 404 page
router.get("/404", async (req, res) => {
  res.status(404).render("status", {
    spam: "404",
    description: "The page you are looking for was not found.",
  });
  // res.status(404).render("404Error")
});

// for future use
router.post("/create", async (req, res) => {
  const {
    route,
    eventDescription,
    eventName,
    isRegistrationOpen,
    eventCategory,
    eventCreationTimestamp,
  } = req.body;
  let newdata = await new events({
    _id: new mongoose.Types.ObjectId(),
    route,
    eventDescription,
    eventName,
    isRegistrationOpen,
    eventCategory,
    eventCreationTimestamp,
  }).save();
  res.send(`events save sucessfully${newdata}}`);
});

router.use("/login", require("./login.routes"));
// Event Dynamic Page /event/:route
router.get("/:route", async (req, res) => {
  const data = await events.findOne(req.params).exec();
  // res.send(data);
  if (data) {
    const { token } = req.cookies;
    var da;
    try {
      const verify = jwt.verify(token, JWT_SECRET);
      let userdata = await User.findById(verify._id);

      if (userdata.rollNo == null) {
        da = `
        <div class="modal fade fixed top-0 left-0 w-200 h-full outline-none overflow-x-hidden overflow-y-auto justify-center"
  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Enter Details</h5>
      </div>
      <div class="modal-body relative p-4">
      <form action="/${data.route}/Register" method="POST">
      <input placeholder="phoneNumber" name="phoneNumber" required >
      <input placeholder="rollNo" name="rollNo" required>
      <button type="submit">save dedails</button>
      </form>
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button" class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1">Save changes</button>
      </div>
    </div>
  </div>
</div>
        `;
      }
    } catch (err) {}
    res.render("event", { data, da });
  } else {
    res.status(404).redirect("/404");
  }
});

// /:route/Register
router.get("/:route/Register", isLoggedIn, async (req, res) => {
  res.send("Register");
});
router.post("/:route/Register", isLoggedIn, async (req, res) => {
  const { token } = req.cookies;
  const verify = jwt.verify(token, JWT_SECRET);
  const { phoneNumber, rollNo } = req.body;
  const data = await User.findByIdAndUpdate(verify._id, {
    phoneNumber,
    rollNo,
  });
  res.redirect(`/${req.params.route}`);
});

router.get("*", async (req, res) => {
  res.status(404).redirect("/404");
});

module.exports = router;
