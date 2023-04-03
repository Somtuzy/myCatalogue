const bcrypt = require('bcrypt')
const rounds = parseFloat(process.env.ROUNDS)

// Masks the passsword with random characters to protect user data
const hashPassword = async (password, rounds) => {
    const salt = await bcrypt.genSalt(rounds)
    password = await bcrypt.hash(password, salt)
    return password
}

// Confirms the input password is the same password that was masked when the user signed up
const verifyPassword = async (userInput, hashedPassword) => {
    const isValid = await bcrypt.compare(userInput, hashedPassword)
    return isValid
}

module.exports = { hashPassword, verifyPassword }