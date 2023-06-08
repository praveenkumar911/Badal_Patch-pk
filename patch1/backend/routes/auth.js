const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("collectionUser")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const JWT_SECRET = "jernfvlie23456]][][42345dsf8nfvDSFGDherheRgh<>?<::";
const secretkey = "thisisthesecretkeyfortokengeneration"
const requireLogin = require('../middleware/protectedRoutes')

router.get('/protected', requireLogin, (req, res) => {
    res.send("hello")
})

router.post('/signup', (req, res) => {
    const { userName, userPassword } = req.body.profileData;
  if (!userName || !userPassword) {
    return res.send({ message: 10 });
  } else {
    User.findOne({ userName: userName }, (err, user) => {
      if (err) {
        return res.send({ message: 0 });
      } else if (user) {
        bcrypt.compare(userPassword, user.userPassword, function (err, isMatch) {
          if (isMatch) {
            const token = jwt.sign(user.toJSON(), secretkey);
            const tosend = { message: 1, tok: token };

            // Push signin data to Elasticsearch
            const signinData = {
              username: userName,
              status: "success"
            };
            client.index({
              index: 'signin_logs',
              body: signinData
            })
              .then(response => {
                console.log("Signin data indexed in Elasticsearch");
              })
              .catch(error => {
                console.log("Error indexing signin data in Elasticsearch:", error);
              });

            return res.send(tosend);
          } else {
            res.send({ message: 11 });

            // Push signin data to Elasticsearch
            const signinData = {
              username: userName,
              status: "error"
            };
            client.index({
              index: 'signin_logs',
              body: signinData
            })
              .then(response => {
                console.log("Signin data indexed in Elasticsearch");
              })
              .catch(error => {
                console.log("Error indexing signin data in Elasticsearch:", error);
              });
          }
        });
      } else {
        return res.send({ message: 12 });
      }
    });
  }
})

// router.post('/signin',(req,res)=>{
//     const {username,password} = req.body
//     if(!username || !password) {
//         return res.status(422).json({error:"Fill the required Fields"})
//     }
//     User.findOne({username:username})
//     .then(savedUser=>{
//         if(!savedUser) {
//             return res.status(422).json({error:"Invalid username"})
//         }
//         bcrypt.compare(password,savedUser.password)
//         .then(doMatch=>{
//             if(doMatch) {
//                 const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
//                 console.log(token)
//                 const {_id,fname,username,email} = savedUser
//                 res.json({token,user:{_id,fname,username,email},message: "Successfully Logged In"})

//             }
//             else {
//                 return res.status(422).json({error:"Invalid password"})
//             }
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     })
// })


router.post("/signin", (req, res) => {
    const { userName, userPassword } = req.body.profileData;
    if (!userName || !userPassword) {
        return res.send({ message: 10 });
    }
    else {
        User.findOne({ userName: userName }, (err, us) => {
            if (err) {
                return res.send({ message: 0 })
            }
            else if (us) {
                bcrypt.compare(userPassword, us.userPassword,function (err,ans){
                    if(ans == true)
                    {
                        const token = jwt.sign(us.toJSON(), secretkey);
                        const tosend = { message: 1, tok: token };
                        return res.send(tosend);
                    }
                    else {
                        res.send({ message: 11 });
                    }
                });
            }
            else {
                return res.send({ message: 12 });
            }
        })
    }
}
)

module.exports = router