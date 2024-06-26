import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreatorDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty()
    comics: string[]

    @IsString()
    @ApiProperty()
    role: string

    @IsString()
    @ApiProperty()
    fullName: string

    @IsUrl()
    @IsOptional()
    @ApiProperty({ required: false })
    imagePath: string

    @IsPositive()
    @IsOptional()
    @ApiProperty({ required: false })
    idApi: number
}
