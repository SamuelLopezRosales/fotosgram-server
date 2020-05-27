import { FileUpload } from '../interfaces/file-upload';

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor(){}

    guardarImagenTemporal( file: FileUpload, userId: string){

        return new Promise((resolve, reject)=> {
            // crear carpetas
            const path = this.crearCarpetaUsuario( userId );

            // nombre de archivo
            const nombreArchivo = this.generarNombreUnico( file.name );

            // mover archivo a carpeta temporal
            file.mv( `${ path }/${ nombreArchivo }`, ( err: any ) => {

                if( err ){
                    reject(err);
                }else{
                    resolve();
                }
            });
        });
        

    }

    private generarNombreUnico( nombreOriginal: string ){
        const nombreArr = nombreOriginal.split('.');
        const extencion = nombreArr[ nombreArr.length -1 ];

        const idUnico = uniqid();

        return `${ idUnico }.${ extencion }`;
    }

    // metodo para crear carpeta del usuario
    private crearCarpetaUsuario( userId: string ) {
        const pathUser = path.resolve( __dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';

        // verificar si existe la carpeta
        const existe = fs.existsSync(pathUser);
        
        // si no existe creo las carpetas 
        if( !existe ){
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;
    }

    // methodo que mueva las imagenes de temp a post
    imagenesDeTempHaciaPost( userId: string ){
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'posts');

        if( !fs.existsSync(pathTemp)){
            return [];
        }

        if( !fs.existsSync(pathPost)){
            fs.mkdirSync(pathPost);
        }

        // tengo todos los nombres de las imagenes
        const imagenesTemp = this.obtenerImagenesEnTemp( userId );

        imagenesTemp.forEach( imagen => {
            fs.renameSync(`${ pathTemp }/${imagen}`,`${ pathPost }/${imagen}`);
        });

        return imagenesTemp;
    }

    private obtenerImagenesEnTemp( userId: string ){
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');

        return fs.readdirSync( pathTemp ) || [];
    }

    getFotoUrl( userId: string, img: string ){
        const pathFoto = path.resolve( __dirname, '../uploads', userId, 'posts', img);

        // si la imagen no existe
        const existe = fs.existsSync( pathFoto );
        if( !existe ){
            return path.resolve( __dirname, '../assets/450x250.jpg' );
        }
        
        return pathFoto;
    }
}