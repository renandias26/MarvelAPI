import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComicDocument = HydratedDocument<Comic>;

@Schema({ timestamps: true })
export class Comic {
    @Prop({ require: true })
    title: string;

    @Prop({ require: false })
    pageCount: number

    @Prop({ require: false })
    format: String

    @Prop({ require: true })
    imagePath: String

    @Prop({ require: true })
    idApi: number
}

export const ComicSchema = SchemaFactory.createForClass(Comic);