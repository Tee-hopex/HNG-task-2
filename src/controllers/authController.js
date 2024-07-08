const { User, Organisation, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    // Check if the email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(422).json({
        status: 'Unprocessable Entity',
        message: 'Email already exists',
        statusCode: 422
      });
    }

    const userId = `${firstName}_${lastName}_${Date.now()}`;

    // Check if the userId already exists (although highly unlikely with Date.now())
    const existingUserId = await User.findOne({ where: { userId } });
    if (existingUserId) {
      return res.status(422).json({
        status: 'Unprocessable Entity',
        message: 'User ID already exists',
        statusCode: 422
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });

    const orgId = `${firstName}_Org_${Date.now()}`;
    const organisation = await Organisation.create({
      orgId,
      name: `${firstName}'s Organisation`,
      description: `Organisation for ${firstName}`
    });

    await newUser.addOrganisation(organisation);

    const token = jwt.sign({ id: newUser.userId }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: newUser.userId,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Registration unsuccessful',
      statusCode: 400
    });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401
      });
    }

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    res.status(401).json({
      status: 'Bad request',
      message: 'Authentication failed',
      statusCode: 401
    });
  }
};

module.exports = { register, login };
