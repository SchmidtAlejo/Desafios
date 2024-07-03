import { CustomRouter } from './routes.js'
import SessionsController from "../controllers/sessions.controller.js"

export default class UserController extends CustomRouter {
  init() {
    this.put("/premium/:id", ['user', 'premium'], SessionsController.updateAlternatePremium);
  }
}
