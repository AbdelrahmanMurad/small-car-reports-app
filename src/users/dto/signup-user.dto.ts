import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString, Matches, MinLength, MaxLength } from "class-validator";

// DTO for Sign-Up
export class SignUpUserDto {
    @Expose() // Expose email in JSON responses
    @IsEmail({}, { message: "The email must be in a valid format." })
    readonly email: string;

    @Expose() // Expose email in JSON responses
    @IsString({ message: "The name must be a valid string." })
    @MinLength(2, { message: "The name must be at least 2 characters long." })
    @MaxLength(50, { message: "The name must not exceed 50 characters." })
    readonly name: string;

    // @Exclude() // Prevent password from being exposed in JSON responses // dont use it =>> gives error !!
    @IsString({ message: "The password must be a valid string." })
    @MinLength(8, { message: "The password must be at least 8 characters long." })
    @MaxLength(20, { message: "The password must not exceed 20 characters." })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, { 
        message: "The password must include at least one uppercase letter, one lowercase letter, one digit, and one special character." 
    })
    readonly password: string;
}