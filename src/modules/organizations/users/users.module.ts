import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  OrganizationRepository,
  UserRepository,
  RoleRepository,
} from 'src/db/repositories';
import { UserOrganizationRoleRepository } from 'src/db/repositories/user-organization-role.repository';
import { UserOrganizationRepository } from 'src/db/repositories/user-organization.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    RoleRepository,
    OrganizationRepository,
    UserOrganizationRepository,
    UserOrganizationRoleRepository,
  ],
  exports: [UsersService],
})
class UsersModule {}

export { UsersModule as OrganizationUsersModule };
