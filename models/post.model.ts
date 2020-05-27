import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});

// la fecha se crea antes de la inserción en la base de datos
postSchema.pre<IPost>('save', function( next ) {
    this.created = new Date();
    next();
});

// interface 
interface IPost extends Document {
    created: Date,
    mensaje: string,
    img: string[],
    coords: string,
    usuario: string
}

export const Post = model<IPost>('Post', postSchema)