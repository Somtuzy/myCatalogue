class RefServices {
    constructor(Model) {
        this.model = Model
    }

    async getOne(filter, data) {
        return await this.model.findOne(filter).populate(data)
     }

    async getAll(filter, data) {
        return await this.model.find(filter).populate(data)
     }
}

module.exports = RefServices;