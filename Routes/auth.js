const express = require("express");
var router = express.Router();
const {check} = require("express-validator")
const {signout, signin, signup, isAuthenticated, isSignedIn} = require("../Controllers/auth.js")

router.post("/signup",[
    check("name", "name must contain atleast 3 characters").isLength({min: 3}),
    check("email", "Email is required").isEmail(),
    check("password", "Password must contain atleast 5 characters").isLength({min: 5})
], 
signup);

router.post("/signin",
[
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 1 })
],
signin)

router.get("/testroute",isSignedIn, (req,res) => {
    res.send("A protected route")
})

router.get("/signout", signout)

module.exports = router;