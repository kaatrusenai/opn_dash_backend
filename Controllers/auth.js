const dashusercred = require("../Models/dashusercred");
const {check, validationResult} = require("express-validator");
var JWT = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");

//SIGNUP
exports.signup = (req,res) => {
    const user = new dashusercred(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Unable to save user in the database"
            })
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    })
}

//SIGNIN
exports.signin = (req,res) => {
    const errors = validationResult(req);
    const {email, password} = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
          error: errors.array()[0].msg
        });
    }

    dashusercred.findOne({email}, (err,user) => {
        if (err || !user) {
            return res.status(400).json({
              error: "USER email does not exists"
            });
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
              error: "Email and password do not match"
            });
        }

         //create token
        const token = JWT.sign({ _id: user._id }, "shhhhhh");
        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to front end
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email } });
    })

    
}

//SIGNOUT
exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//PROTECTED ROUTE
exports.isSignedIn = jwt({
    secret: 'shhhhh',
    userProperty: "auth",
    algorithms: ['HS256']
})

exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    } 
    next();
}