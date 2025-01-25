import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationRequestDto } from './dto/create-organization-request.dto';
import { UpdateOrganizationRequestDto } from './dto/update-organization-request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationResponseDto } from './dto/organization-response.dto';
import { AuthenticatedRequest } from '../common/types/authenticated-request';
import { EmptyResponseDto } from '../common/types/empty-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckPermissions } from '../authz/permissions.decorator';
import { PermissionAction, PermissionSubject } from 'src/db/entities';
import { PermissionsGuard } from '../authz/permissions.guard';
import { OrganizationMemberGuard } from './organization-member.guard';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
export class OrganizationsController {
  constructor(private readonly orgService: OrganizationsService) {}

  @Post()
  @ApiOperation({
    tags: ['Organization'],
    summary: 'Create new organization',
    description:
      'Create new organization with organization name (Example org) and global unique name (example-org)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrganizationResponseDto,
  })
  async create(
    @Body() createRequest: CreateOrganizationRequestDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<OrganizationResponseDto> {
    return await this.orgService.create(createRequest, req.user.id);
  }

  @Get(':id')
  @UseGuards(OrganizationMemberGuard)
  @ApiOperation({
    tags: ['Organization'],
    operationId: 'Get organization',
    summary: 'Get organization',
    description: 'Get organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrganizationResponseDto,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrganizationResponseDto> {
    const org = await this.orgService.findById(id);
    if (org === undefined || org === null) {
      throw new NotFoundException(`Can't find org with id is ${id}`);
    }
    return new OrganizationResponseDto(org);
  }

  @Patch(':id')
  @UseGuards(OrganizationMemberGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.ORGANIZATION])
  @ApiOperation({
    tags: ['Organization'],
    operationId: 'Update organization',
    summary: 'Update organization',
    description: 'Update organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrganizationResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateOrganizationRequestDto,
  ): Promise<OrganizationResponseDto> {
    return await this.orgService.update(id, updateRequest);
  }

  @Delete(':id')
  @UseGuards(OrganizationMemberGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.DELETE, PermissionSubject.ORGANIZATION])
  @ApiOperation({
    tags: ['Organization'],
    operationId: 'Delete an organization',
    summary: 'Delete an organization',
    description: 'Delete an organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmptyResponseDto,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EmptyResponseDto> {
    await this.orgService.delete(id);
    return new EmptyResponseDto();
  }
}
