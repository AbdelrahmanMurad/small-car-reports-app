import { IsBoolean, IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class updateReport {

    @IsBoolean()
    @IsOptional()
    approve: boolean;

    @IsString()
    @IsOptional()
    make: string;

    @IsString({ message: "Model must be a string." })
    @IsOptional()
    model: string;

    @IsNumber({}, { message: "Year must be a number." })
    @Min(1886, { message: "Year must not be earlier than 1886 (the year of the first car)." })
    @Max(new Date().getFullYear(), { message: `Year cannot be later than ${new Date().getFullYear()}.` })
    @IsOptional()
    year: number;

    @IsNumber({}, { message: "Mileage must be a number." })
    @Min(0, { message: "Mileage cannot be negative." })
    @IsOptional()
    mileage: number;

    @IsLongitude({ message: "Longitude must be a valid value (-180 to 180)." })
    @IsOptional()
    lng: number;

    @IsLatitude({ message: "Latitude must be a valid value (-90 to 90)." })
    @IsOptional()
    lat: number;

    @IsNumber({}, { message: "Price must be a number." })
    @Min(0, { message: "Price cannot be negative." })
    @IsOptional()
    price: number;
}