import Server from './clases/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post';
import fileUpload from 'express-fileupload';
import cors from 'cors';

// usar clase servidor 
const server = new Server();

//  middleware Body-parser
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );

// fileupload
server.app.use( fileUpload({ useTempFiles: true}) );

// configuracion del CROSS
server.app.use( cors({ origin: true, credentials: true }));

// rutas del usuario
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);



// conectar base de datos
mongoose.connect('mongodb://localhost:27017/fotosgram',
 { useNewUrlParser: true, useCreateIndex: true}, (err) => {
    if(err) throw err;

    console.log('Base de datos ONLINE');
 });

// levantar servidor
server.start( () => {
    console.log(`El servidor esta corriendo en el puerto ${ server.port }`);
});