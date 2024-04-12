import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatorDocument = HydratedDocument<Creator>;

@Schema({ timestamps: true })
export class Creator {
    @Prop({ require: true })
    fullName: string;

    @Prop({ require: false })
    role: String

    @Prop({ require: true })
    imagePath: String

    @Prop({ require: true })
    idApi: number
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);