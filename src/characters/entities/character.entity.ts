import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ timestamps: true })
export class Character {
    @Prop({ require: true })
    name: string;

    @Prop({ require: false })
    description: String

    @Prop({ require: true })
    imagePath: String

    @Prop({ require: true })
    idApi: number
}

export const CharacterSchema = SchemaFactory.createForClass(Character);