import { IsNumber, IsString, Min, Max, IsLatitude, IsLongitude } from "class-validator";

export class CreateReportDto {

    @IsString()
    make: string;

    @IsString({ message: "Model must be a string." })
    model: string;

    @IsNumber({}, { message: "Year must be a number." })
    @Min(1886, { message: "Year must not be earlier than 1886 (the year of the first car)." })
    @Max(new Date().getFullYear(), { message: `Year cannot be later than ${new Date().getFullYear()}.` })
    year: number;

    @IsNumber({}, { message: "Mileage must be a number." })
    @Min(0, { message: "Mileage cannot be negative." })
    mileage: number;

    @IsLongitude({ message: "Longitude must be a valid value (-180 to 180)." })
    lng: number;

    @IsLatitude({ message: "Latitude must be a valid value (-90 to 90)." })
    lat: number;

    @IsNumber({}, { message: "Price must be a number." })
    @Min(0, { message: "Price cannot be negative." })
    price: number;
}
