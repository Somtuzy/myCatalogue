const BaseService = require('./service')
const Users = require('../models/user.model')

class UserService extends BaseService {
    constructor(model) {
        super(model)
    }

    async find(filter) {
        return await this.model.findOne(filter, ' -password ')
    }

    async findWithDetails(filter) {
        return await this.model.findOne(filter)
    }

    async findAll(filter) {
        return await this.model.find(filter, ' -password ')
    }
}

const user = new UserService(Users)
module.exports = user;