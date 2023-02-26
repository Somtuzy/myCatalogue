import bcrypt from 'bcrypt'
const rounds: number = parseFloat(process.env.ROUNDS as string)

// Masks the passsword with random characters to protect user data
const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(rounds)
    password = await bcrypt.hash(password, salt)
    return password
}

// Confirms the input password is the same password that was masked when the user signed up
const verifyPassword = async (userPassword: string, hashedUserPassword: string) => {
    const isValid = await bcrypt.compare(userPassword, hashedUserPassword)
    return isValid
}

export { hashPassword, verifyPassword }