import { iModel } from "../interfaces/service.int"

class Services <iServe extends iModel>{
    private model: any
    constructor(Model: any) {
        this.model = Model
    }

    async create(collection: iModel) {
        return await new this.model(collection)
    }

    async edit(id: string, data: iModel) {
       return await this.model.findByIdAndUpdate({_id: id}, data, {new: true}) 
    }

    async delete(id: string) {
       return await this.model.findByIdAndDelete({_id: id})
    }

    async getOne(filter: iModel) {
        return await this.model.findOne(filter)
     }

    async getAll(filter: iModel) {
        return await this.model.find(filter)
     }
}

export default Services;