import { Transform } from "class-transformer"
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator"

export class GetEstimateDto {
    @IsString()
    make: string

    @IsString()
    model: string

    @IsNumber()
    @Max(2050)
    @Min(1930)
    @Transform(({ value }) => parseInt(value))
    year: number

    @IsLongitude()
    @Transform(({ value }) => parseFloat(value))
    lng: number

    @IsLatitude()
    @Transform(({ value }) => parseFloat(value))
    lat: number

    @IsNumber()
    @Max(1000000)
    @Min(0)
    @Transform(({ value }) => parseFloat(value))
    mileage: number
}