import User from '../models/Users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    user = new User({ name, email, password: hashedPassword })

    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
