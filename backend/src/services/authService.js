// services/authService.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");
const User = require("../models/userModel");
const jwtConfig = require("../config/jwt");


const login = async (email, password) => {

    const userData = await userRepository.findByEmail(email);

    if (!userData) {
        return null;
    }

    const passwordIsValid = await bcrypt.compare(
        password,
        userData.password
    );

    if (!passwordIsValid) {
        return null;
    }

    const token = jwt.sign(
        {
            id: userData.id,
            email: userData.email,
            role: userData.role
        },
        jwtConfig.secret,
        {
            expiresIn: jwtConfig.expiresIn
        }
    );

    const user = new User(userData);

    return {
        token,user
    };
};


const getMe = async (id) => {
    return await userRepository.findById(id);
};


module.exports = {login,getMe};