import {Controller, Post, Body, UsePipes, ValidationPipe, Get, Req} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';
import {Request} from 'express';
@Controller()
export class UserController {
    constructor (private readonly userService: UserService) {}
    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }
    
    
    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    async currentUser(@Req() request: Request): Promise<UserResponseInterface> {
        console.log('request', request.headers)
        return 'currentUser' as any;
    }
}