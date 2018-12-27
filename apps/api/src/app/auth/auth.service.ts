import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../core/crud/crud.service';
import { User } from './user.entity';

@Injectable()
export class AuthService extends CrudService<User> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }

  async getLoggedUserOrCreate(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    } else {
      const newUser = {};
      return super.create(newUser);
    }
  }
}
