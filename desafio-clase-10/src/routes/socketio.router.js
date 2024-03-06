import express from 'express';

const socketioRouter = (io) => {
    const router = express.Router();

    io.on('connection', (socket) => {
        socket.on('addProduct', (product) => {

            io.emit('productAdded', product);
        });

        socket.on('deleteProduct', (productId) => {

            io.emit('productDeleted', productId);
        });
    });

    return router;
};

export default socketioRouter;