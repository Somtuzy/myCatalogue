class Services {
    constructor(Model) {
        this.model = Model
    }

    async create(model) {
        return await new this.model(model)
    }

    async edit(id, data) {
       return await this.model.findByIdAndUpdate({_id: id}, data, {new: true}) 
    }

    async delete(id) {
       return await this.model.findByIdAndDelete({_id: id})
    }

    async getOne(filter) {
        return await this.model.findOne(filter)
     }

    async getAll(filter) {
        return await this.model.find(filter)
     }
}

module.exports = Services;