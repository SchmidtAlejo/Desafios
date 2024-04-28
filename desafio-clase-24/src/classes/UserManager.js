import { modelUser } from "../dao/models/user.model.js";

export default class UserManager {

    async create(user) {
        let newUser = await modelUser.create(user)
        return newUser.toJSON()
    }

    async getBy(filter) {
        return await modelUser.findOne(filter).lean()
    }

}