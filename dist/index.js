"use strict";
require('./config/config');

var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const post_1 = __importDefault(require("./routes/post"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
// usar clase servidor 
const server = new server_1.default();
//  middleware Body-parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// fileupload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
// configuracion del CROSS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// rutas del usuario
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
// conectar base de datos
// 'mongodb://localhost:27017/fotosgram'
mongoose_1.default.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// levantar servidor
server.start(() => {
    console.log(`El servidor esta corriendo en el puerto ${server.port}`);
});