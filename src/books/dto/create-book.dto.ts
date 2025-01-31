import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
@IsNotEmpty()
@IsString()
tittle: string;

@IsNotEmpty()
@IsNumber()
isbn: number;

@IsNotEmpty()
@IsString()
publisher: string;

@IsNotEmpty()
@IsDate()
@Type(() => Date)
published_date: Date;

@IsNotEmpty()
@IsString()
author: string;

@IsNotEmpty()
@IsString()
category: string;

@IsNotEmpty()
@IsNumber()
availabel_copies: number;

@IsNotEmpty()
@IsNumber()
total_copies: number;
}
