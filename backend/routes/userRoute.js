import express from 'express';
import User from '../models/userModel';

const router = express.Router();

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'João',
      email: 'joaovictorvieira.23@hotmail.com',
      password: '1234',
      isAdmin: true
    });
    const newUser = await user.save();
    console.log(newUser);
    res.send(newUser);
  } catch (error) {
    console.log(error.message);
    res.send({ msg: error.message });
  }
});

export default router;