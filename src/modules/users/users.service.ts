import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { BcryptService } from '../../utils/bcrypt';
import { CustomException } from '../../utils/custom-exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private bcryptService: BcryptService,
    private entityManager: EntityManager,
  ) {}

  async create(body: CreateUserDto) {
    await this.entityManager.transaction(async (entityManager) => {
      const password = await this.bcryptService.hashPassword(body.password);

      const userAlreadyExists = await this.userRepository.findOne({
        where: {
          email: body.email,
        },
      });

      if (userAlreadyExists) {
        new CustomException().throwHttpError({
          message: 'User already exists!',
          status: HttpStatus.CONFLICT,
          errorKey: 'email',
        });
      }

      const user = this.userRepository.create({
        ...body,
        password,
      });

      await entityManager.save(user);
    });

    return;
  }
}
