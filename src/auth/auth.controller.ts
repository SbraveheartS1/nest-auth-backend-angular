import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto,UpdateAuthDto,CreateUserDto } from './dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces/login.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    console.log(createAuthDto );
    return this.authService.create(createAuthDto);
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll( @Request() req: Request ) {
    return this.authService.findAll();
  }
  
  @UseGuards( AuthGuard )
  @Get('check-token')
  checkToken( @Request() req: Request): LoginResponse{
    const user = req['user'] as User;

    return{
      user,
      token : this.authService.getJwtToken({id:user._id}),
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('/login')
  login( @Body() loginDto: LoginDto ){
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register( @Body() registerDto: RegisterUserDto ){
    return this.authService.register(registerDto);
  }


}
