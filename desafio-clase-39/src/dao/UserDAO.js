import { modelUser } from "./models/user.model.js";

export default class UserDAO {

    static async create(user) {
        let newUser = await modelUser.create(user)
        return newUser.toJSON()
    }

    static async getBy(filter) {
        return await modelUser.findOne(filter).lean()
    }

    static async updatePassword(userId, password) {
        return await modelUser.findByIdAndUpdate(userId, { password: password }, { new: true }).lean()
    }

    static async updateUser(userId, user) {
        return await modelUser.findByIdAndUpdate(userId, user).lean()
    }

}