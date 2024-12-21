import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) throw new NotFoundException('Email is already in use');
    const user = this.repo.create({ name, email, password });
    return this.repo.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async findUserByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found');
    if (attrs.password) {
      const salt = randomBytes(8).toString('hex');
      const hashedBuffer = (await scrypt(attrs.password, salt, 32)) as Buffer;
      attrs.password = `${salt}.${hashedBuffer.toString('hex')}`;
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found');
    return this.repo.remove(user);
  }
}