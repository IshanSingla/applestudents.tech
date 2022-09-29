const router = require("express").Router();
const User = require("../../models/users.schema");
const registration = require("../../models/registration.schema");
// var images = require("images");
var path = require("path");
// const download = require("image-downloader");

// home route
router.get("/:id", async (req, res) => {
  try{
  let data = await registration.findById(req.params.id).exec();
  if (data) {
    let userdata = await User.findById(data.user).exec();
    if (userdata.rollNo) {
      res.status(200).render("status", {
        spam: "Welcome to the event",
        description: "Show qr to enter in event",
        custom: `<center><img style="width:85%" src='/GenerateTickets/${req.params.id}/Image'/></center>`,
      });
    } else {
      res.status(200).render("status", {
        spam: "Required Some Details",
        description: "We need Some Delails to provide you DL's <br>Fill Details to Continue",
        custom: `
        <div class="w-full max-w-xs">
  <form action="/GenerateTickets/${req.params.id}/Register" method="POST" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Roll Number
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Roll Number" name="rollNo" required>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Phone Number
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Phone Number" name="phoneNumber" required >
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-[#11809a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Save Details
      </button>
    </div>
  </form>
</div>`,
      });
    }
  } else {
    res.status(404).render("status", {
      spam: "Invalid Ticket Id",
      description: "Contact Admin for more details.",
      custom: ""
    });
  }
  } catch (err) {
    res.status(404).render("status", {
      spam: "Invalid Ticket Id",
      description: "Contact Admin for more details.",
      custom: ""
    });
  }
});
router.post("/:id/Register", async (req, res) => {
  const { phoneNumber, rollNo } = req.body;
  let datas = await registration.findById(req.params.id).exec();
  const data = await User.findByIdAndUpdate(datas.user, {
    phoneNumber,
    rollNo,
  });
  res.redirect(`/GenerateTickets/${req.params.id}`);
});

router.get("/:id/Image", async (req, res) => {
  let data = await registration.findById(req.params.id).exec();
  if (data) {
    let userdata = await User.findById(data.user).exec();
    if (userdata.rollNo) {
      // await download.image({
      //   url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${req.params.id}`,
      //   dest: path.join(__dirname, "./qr.png"), // will be saved to /path/to/dest/image.jpg
      // });
      // images(path.join(__dirname, "./ticket.png")) //Load image from file
      //   .draw(images(path.join(__dirname, "./qr.png")).size(270), 1000, 300) //Drawn logo at coordinates (10,10)
      //   .save(path.join(__dirname, "./output.png")); //Save the image to a file
      res.sendFile(path.join(__dirname, "./output.png"));
      // fs.unlink(path.join(__dirname, "./output.png"));
      // fs.unlink(path.join(__dirname, "./or.png"));
      return;
    }
  }
  res.send("Error");
});

module.exports = router;
