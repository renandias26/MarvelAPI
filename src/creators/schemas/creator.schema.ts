import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatorDocument = HydratedDocument<Creator>;

@Schema({ timestamps: true })
export class Creator {
    @Prop({ require: true })
    fullName: string;

    @Prop({ require: true })
    role: String

    @Prop({ require: true })
    imagePath: String

    @Prop({ require: false })
    idApi: number

    @Prop({ require: true })
    comics: string[]
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);