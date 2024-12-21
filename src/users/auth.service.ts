import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async signUp(name: string, email: string, password: string) {
        // Step 1: Check if email already exists
        const existingUser = await this.usersService.findUserByEmail(email);
        if (existingUser) {
            throw new BadRequestException("Email is already in use.");
        }

        // Step 2: Generate a salt
        const salt = randomBytes(8).toString("hex");

        // Step 3: Hash the password with the salt
        const hashedBuffer = (await scrypt(password, salt, 32)) as Buffer;

        // Step 4: Combine salt and hash into a single string
        const hashedPassword = `${salt}.${hashedBuffer.toString("hex")}`;

        // Step 5: Create and return the new user
        const newUser = await this.usersService.create(name, email, hashedPassword);
        return newUser;
    }

    async logIn(email: string, password: string) {
        // Step 1: Find the user by email
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException("User not found.");
        }

        // Step 2: Extract the salt and hashed password from the stored password
        const [storedSalt, storedHashedPassword] = user.password.split(".");

        // Step 3: Hash the provided password with the extracted salt
        const providedHashedBuffer = (await scrypt(password, storedSalt, 32)) as Buffer;
        const providedHashedPassword = providedHashedBuffer.toString("hex");

        // Step 4: Compare passwords
        if (storedHashedPassword !== providedHashedPassword) {
            throw new BadRequestException("Invalid password.");
        }

        // Step 5: Return the authenticated user
        return user;
    }
}