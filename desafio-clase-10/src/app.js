import express from "express";
import http from 'http';
import handlebars from "express-handlebars";
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import socketioRouter from './routes/socketio.router.js'

const PORT = 8080;

const app = express()

const httpServer = http.createServer(app);

const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(express.json())

app.use('/api/products', viewsRouter)

app.use('/socketio', socketioRouter(socketServer));

app.get("/", (req, res) => {
    res.render("index", { welcome: "Bienvenidos a la tienda de productos" });
});

socketServer.on('connection', socket => {
    console.log("Cliente conectado");
})

httpServer.listen(PORT, () => {
    console.log(`Server OK en puerto ${PORT}`)
})

