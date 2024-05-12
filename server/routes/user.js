import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router();
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


router.post('/user-signup', async (req, res) => {
    const { firstName, lastName, email, password, userLocation } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.json({ Message: 'user is already present' })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const signupDate = new Date();

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        userLocation,
        signupDate,
    })
    await newUser.save();
    return res.json({ status: true, message: "user is created" })
})

router.post('/user-login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: 'user is not found. kindly do signup' })
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ email: user.email }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: 'Login successfully' })
})

router.post('/forgot-user-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'user registration is done' })
        }
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' })
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });

        var mailOptions = {
            from: '',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "error when sending the email" })
            } else {
                return res.json({ status: true, message: "email sent successfully" })
            }
        });
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
        return res.json({ status: true, message: 'New password is updated' })
    }
    catch (err) {
        return res.json("The token is not valid")
    }
})
const verifyUser = async (req, res, next) => {
    try {
        console.log("print request ", req?.headers)
        const token = req?.cookies?.token;
        console.log("token is ", token)
        if (!token) {
            console.log("here")
            return res.json({ status: false, message: 'no token' })
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        if (decoded) {
            console.log("print decoded value ", decoded)
            next();
        }
    }
    catch (err) {
        return res.json(err);
    }
}

router.get('/verify', verifyUser, (req, res) => {
    console.log("verify success ")
    return res.json({ status: 200, message: 'authorized' })
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true })
})

router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/deleteUser/:userEmail', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        console.log("user email is ", userEmail);
        const user = await User.findOneAndDelete({ email: userEmail });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as UserRouter }