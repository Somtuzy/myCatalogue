import { iModel } from "../interfaces/service.int"

class RefServices <iRef extends iModel>{
    private model: any
    constructor(Model: any) {
        this.model = Model
    }

    async getOne(filter: iModel, data: string) {
        return await this.model.findOne(filter).populate(data)
     }

    async getAll(filter: iModel, data: string) {
        return await this.model.find(filter).populate(data)
     }
}

export default RefServices;