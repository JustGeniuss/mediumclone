import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };
    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (userByEmail) {
      errorResponse.errors['email'] = 'has already been taken';
    }
    if (userByUsername) {
      errorResponse.errors['username'] = 'has already been taken';
    }
    if (userByUsername || userByEmail) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {
        'email or password': 'is invalid',
      },
    };
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        image: true,
        password: true,
      },
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete user.password;

    return user;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async updateUser(
    updatefields: UpdateUserDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updatefields);
    return await this.userRepository.save(user);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
