import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsIn(['Property', 'Debt'])
  @IsString()
  cate: 'Property' | 'Debt';
}
