// Tabela House

// Importando do mongoose apenas o Schema e model, sem necessidade de importar tudo
import { Schema, model } from 'mongoose';

// Criando Tabela
const HouseSchema = new Schema(
      {
            thumbnail: String,
            description: String,
            price: Number,
            location: String,
            status: Boolean,
            user: {
                  type: Schema.Types.ObjectId,
                  ref: 'User',
            },
      },
      {
            toJSON: {
                  virtuals: true, // Incluindo URL da imagem em campo virtual
            },
      }
);

// Criando o virtual
HouseSchema.virtual('thumbnail_url').get(function () {
      return `http://localhost:4100/files/${this.thumbnail}`;
});

export default model('House', HouseSchema);
