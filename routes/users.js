
const express = require("express");
const router = express.Router()
const {getAllUsers,createUser,login} = require("../controllers/users")


// get => get all users
router.get("/",getAllUsers)

// post => create  user
router.post("/",createUser)

// login user 
router.post("/login",login)

module.exports = router;

