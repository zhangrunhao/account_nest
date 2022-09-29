import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTradeCateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsIn(['Income', 'Expend'])
  @IsString()
  operate: 'Income' | 'Expend';
}
