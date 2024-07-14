import UserDAO from "../dao/UserDAO.js";

class UserService {
  static async create(user) {
    return await UserDAO.create(user);
  }

  static async getBy(filter) {
    return await UserDAO.getBy(filter);
  }

  static async updateUser(userId, user) {
    return await UserDAO.updateLastConnection(userId, user);
  }

  static async updateLastConnection(userId) {
    return await UserDAO.updateLastConnection(userId);
  }
}

export default UserService;