import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindAllResponseDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}
