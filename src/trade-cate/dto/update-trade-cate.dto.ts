import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTradeCateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsIn(['income', 'expand'])
  @IsString()
  operate: 'income' | 'expand';
}
