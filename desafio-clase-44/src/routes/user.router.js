import { CustomRouter } from './routes.js'
import UserController from "../controllers/users.controller.js"
import { uploadMulter } from '../config/multer.config.js';

export default class UserRouter extends CustomRouter {
  init() {
    this.put("/premium/:uid", ['user', 'premium'], UserController.updateAlternatePremium);
    this.post("/:uid/documents", ['user', 'premium'], uploadMulter.array('documents', 10), UserController.uploadDocument)
  }
}
