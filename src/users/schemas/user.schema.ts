import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ require: true })
    name: string;

    @Prop({ require: true })
    email: string

    @Prop({ require: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);