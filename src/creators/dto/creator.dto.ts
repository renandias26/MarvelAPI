import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreatorDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty()
    comics: string[]

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    role: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    fullName: string

    @IsUrl()
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    imagePath: string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @ApiProperty({ required: false })
    idApi: number
}
