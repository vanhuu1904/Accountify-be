import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateOrganizationUserRequestDto {
  @ApiProperty({
    type: [Number],
    example: [2, 3],
    required: true,
  })
  @Transform(
    ({ value: roleIds }) =>
      Array.isArray(roleIds)
        ? roleIds.map((roleId: string) => Number(roleId))
        : roleIds,
    {
      toClassOnly: true,
    },
  )
  roleIds: Array<number>;
}
