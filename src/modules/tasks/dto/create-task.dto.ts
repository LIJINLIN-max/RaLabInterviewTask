import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '../../../common/common/dto/base.dto';
import { statusFormat } from '../entities/task.entity';

export class CreateTaskDto extends BaseDTO {
  @ApiProperty({ description: 'title', example: 'Finish Homework' })
  title: string;

  @ApiProperty({ description: 'description', example: 'Finish COMP631 Homework by April 14th' })
  description: string;

  @ApiProperty({ description: 'Status', example: statusFormat.TODO })
  status: statusFormat;
}
