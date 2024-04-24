import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class valueDto {
  @IsNotEmpty()
  @IsUUID()
  projectQuestionMappingId: string;

  @IsOptional()
  @IsString()
  text: string;

  @ValidateIf((o) => o.text === undefined)
  @IsNotEmpty()
  files: string[];
}

export class CreateResponseDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => valueDto)
  values: valueDto[];
}
