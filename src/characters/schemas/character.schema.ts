import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ timestamps: true })
export class Character {
    @Prop({ require: true })
    name: string;

    @Prop({ require: false })
    description: String

    @Prop({ require: false })
    imagePath: String

    @Prop({ require: false })
    idApi: number
}

export const CharacterSchema = SchemaFactory.createForClass(Character);