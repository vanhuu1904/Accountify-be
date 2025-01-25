import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import { UsersService } from '../organizations/users/users.service';
import { RegisterResponse } from './dto/register-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateProfileRequestDto } from './dto/update-profile.dto';
import { LoginWithGoogleRequestDto } from './dto/login-with-google-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({
    tags: ['Auth'],
    operationId: 'Login',
    summary: 'Login endpoint for users',
    description: 'Login with email and password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponse,
  })
  async login(@Body() loginRequest: LoginRequestDto): Promise<LoginResponse> {
    return await this.authService.login(loginRequest);
  }

  @Post('login-google')
  @ApiOperation({
    tags: ['Auth'],
    operationId: 'Login with Google',
    summary: 'Login with Google endpoint for users',
    description: 'Login with Google',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponse,
  })
  async loginGoogle(
    @Body() loginWithGoogleRequest: LoginWithGoogleRequestDto,
  ): Promise<LoginResponse> {
    return await this.authService.loginWithGoogle(loginWithGoogleRequest);
  }

  @Post('register')
  @ApiOperation({
    tags: ['Auth'],
    operationId: 'Register',
    summary: 'Register endpoint for users',
    description: 'Register with email and password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RegisterResponse,
  })
  async register(
    @Body() registerRequest: RegisterRequestDto,
  ): Promise<RegisterResponse> {
    return await this.authService.register(registerRequest);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProfileResponseDto,
  })
  @ApiOperation({
    tags: ['Auth'],
    operationId: 'Get user profile',
    summary: 'Get user profile ',
    description: 'Return user data and their belonging organization',
  })
  @ApiBearerAuth('accessToken')
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<ProfileResponseDto> {
    return await this.usersService.findByIdWithOrganizationsAndRolesAndProjects(
      req.user.id,
    );
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProfileResponseDto,
  })
  @ApiOperation({
    tags: ['Auth'],
    operationId: 'Update user profile',
    summary: 'Update user profile',
    description: 'Update user profile',
  })
  @ApiBearerAuth('accessToken')
  async updateProfile(
    @Body() updateRequest: UpdateProfileRequestDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<ProfileResponseDto> {
    return await this.usersService.updateProfile(req.user.id, updateRequest);
  }
}
