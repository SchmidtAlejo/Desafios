import UserDAO from '../dao/UserDAO.js'
import fs from 'fs';
import path from 'path';

class UsersController {
  static updateAlternatePremium = async (req, res) => {
    const { uid } = req.params;

    try {
      // Obtener el usuario por su ID
      const user = await UserDAO.getBy({ _id: uid });
      console.log(user);
      if (!user) {
        return res.badRequest('User not found');
      }

      if (user.role === 'premium') {
        await UserDAO.updateUser(uid, { role: 'user' });
        return res.success('Role updated to user');
      }

      const requiredDocuments = ['Identificacion', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
      const uploadedDocuments = user.documents.map(doc => doc.name.split(".")[0]);

      const missingDocuments = requiredDocuments.filter(doc => !uploadedDocuments.includes(doc));

      if (missingDocuments.length > 0) {
        return res.badRequest(`Missing documents: ${missingDocuments.join(', ')}`);
      }
      await UserDAO.updateUser(uid, { role: 'premium' });

      res.success('Role updated to premium');
    } catch (error) {
      res.error500(error.message);
    }
  }

  static uploadDocument = async (req, res) => {
    try {
      const userId = req.params.uid;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.badRequest('No files were uploaded.');
      }
      const user = await UserDAO.getBy({ _id: userId });
      if (!user) {
        return res.badRequest('User not found.');
      }
      for (const file of files) {
        const existingDocument = user.documents.find(doc => doc.name === file.originalname);
        if (existingDocument) {
          fs.unlinkSync(path.resolve(existingDocument.reference));
          existingDocument.reference = file.path;
        } else {
          await UserDAO.updateUser(userId, { $push: { documents: { name: file.originalname, reference: file.path } } });
        }
      }

      res.success('Documents uploaded successfully.');
    } catch (error) {
      res.error500(error.message);
    }
  }
}

export default UsersController;