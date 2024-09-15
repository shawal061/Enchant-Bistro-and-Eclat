const express = require('express');
const router = express.Router()

const User = require('../models/User');

const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken');
const jwtSecret = "MyNameIsShawalHelloHelloHelloSadDepressed";

router.post("/createuser", [
    // express-validator
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password', 'Minimum password length is 5.').isLength({ min: 5 })
],
    async (req, res) => {

        // express-validator
        // It will return an error if any; otherwise, it will proceed to the next statements.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Added unique email per account property
        User.findOne({ email: req.body.email }).then(async (result) => {
            if (result) {  // result will be 'null' if no user is found
                res.status(400).json({
                    success: false,
                    message: "User with this email already exists",
                });
            } else {
                // Encrypting password and adding user to the database
                const salt = await bcrypt.genSalt(10);
                let secPassword = await bcrypt.hash(req.body.password, salt);

                try {
                    await User.create({
                        name: req.body.name,
                        password: secPassword,
                        email: req.body.email,
                        location: req.body.location
                    })
                    res.json({ success: true });
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ success: false, message: "Server Error" });
                }
            }
        })
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Minimum password length is 5.').isLength({ min: 5 })
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let email = req.body.email
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with correct credentials!" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)

            if (!pwdCompare) {
                // req.body.password !== userData.password
                return res.status(400).json({ errors: "Try logging in with correct credentials!" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)

            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;