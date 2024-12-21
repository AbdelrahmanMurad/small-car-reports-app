import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Session, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { LogInUserDto } from './dto/login-user.dto';

@Controller('users')
@Serialize(SignUpUserDto)
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  // @Post('/create')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Post('/signUp')
  async signUp(@Body() body: SignUpUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.name, body.email, body.password)
    session.userId = user.id;
    return user;
  }

  @Post('/logIn')
  async logIn(@Body() body: LogInUserDto, @Session() session: any) {
    const user = await this.authService.logIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signOut')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard) // in our case, we can't use it indeividual controller, because it will prevent us from every route.
  // from the http, id is string. 
  // +id => + before id means convert from str to number
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard) // in our case, we can't use it indeividual controller, because it will prevent us from every route.
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }

  @Get('/whoami')
  @UseGuards(AuthGuard) // in our case, we can't use it indeividual controller, because it will prevent us from every route.
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}