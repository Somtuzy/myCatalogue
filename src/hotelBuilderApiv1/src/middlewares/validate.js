const Joi = require('joi')

// Checking the user schema fields against pre-set conditions
const userSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required().lowercase(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  role: Joi.string().required(),
  age: Joi.number().integer().min(18).max(99).required()
});

// Checking the room schema fields against pre-set conditions
const roomSchema = Joi.object({
  codename: Joi.string().lowercase().required(),
  roomtype: Joi.required(),
  price: Joi.number().required(),
  description: Joi.string().required()
});

// Checking the roomtype schema fields against pre-set conditions
const roomTypeSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  description: Joi.string().required()
});

// Catching required fields errors when creating a user
const validateUserInputs = (req, res, next) => {
  try {
      const validateInput = userSchema.validate(req.body)

      if(validateInput.error) {
          return res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateInput.error.details[0].message
        })
      } else {
        console.log("Validated successfully");
        next()
      } 
  } catch (err) {
        return res.status(400).send({
          message: err,
          status: 'failed'
        })
  }
}

// Catching required fields errors when creating a user
const validateRoomInputs = (req, res, next) => {
  try {
      const validateInput = roomSchema.validate(req.body)

      if(validateInput.error) {
          return res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateInput.error.details[0].message
        })
      } else {
        console.log("Validated successfully");
        next()
      } 
  } catch (err) {
        return res.status(400).send({
          message: err,
          status: 'failed'
        })
  }
}

// Catching required fields errors when creating a user
const validateRoomTypeInputs = (req, res, next) => {
  try {
      const validateInput = roomTypeSchema.validate(req.body)

      if(validateInput.error) {
          return res.status(400).send({
            success: false,
            status: 'failed',
            errormessage: validateInput.error.details[0].message
        })
      } else {
        console.log("Validated successfully");
        next()
      } 
  } catch (err) {
        return res.status(400).send({
          message: err,
          status: 'failed'
        })
  }
}

module.exports = { validateUserInputs, validateRoomInputs, validateRoomTypeInputs };