import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthNftDto {
  @ApiProperty()
  @IsString()
  collection: string;

  @ApiProperty()
  @IsNumber()
  id: number;
}
