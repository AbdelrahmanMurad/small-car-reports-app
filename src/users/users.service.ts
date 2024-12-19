import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    // const user = this.repo.create(createUserDto)
    // return await this.repo.save(user);
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.id = createUserDto.id;
    return await this.repo.save(user);
  }

}
