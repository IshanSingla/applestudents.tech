
const router = require("express").Router();
const { dashbord, eventsregestration } = require("../../utils/admin");
const registration = require("../../models/registration.schema")

// home route
router.get("/", async (req, res) => {
  let data=await dashbord()
    res.status(200).render("admin", {data});
});
router.get("/qrscanner", async (req, res) => {
    res.status(200).render("qrscanner");
});
router.post("/qrscanner", async (req, res) => {
    try{
      let id=await req.body.id
      if (id){
        let data=await registration.findById(id).exec()
        if (!data.entryVerified){
          if (data.entryVerified===false){
            await registration.findByIdAndUpdate(id,{entryVerified: true}).exec()
            return res.status(200).send({status: true, message: "Done Sucessfully"});
          } else{
            return res.status(500).send({status: false, message: `user not found ${id}`});
          }
        } else {
          return res.status(500).send({status: true, message: "Already Sucessfull"});
        }
    } else {
      return res.status(500).send({status: false, message: "not found id in sending qr"});
    }

    } catch (error){
      return res.status(500).send({status: false,message: error});
    }
});
router.get("/event/:id", async (req, res) => {
  let data= await eventsregestration(req.params.id)
    res.status(200).render("admin", {data});
});

module.exports = router;