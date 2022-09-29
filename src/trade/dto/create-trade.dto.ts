import {
  IsDate,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateTradeDto {
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  tradeCateId: number;

  @IsNotEmpty()
  @IsNumber()
  money: number;

  @IsString()
  @ValidateIf((object, value) => value != null)
  remark: string;

  @IsDateString()
  spendDate: number;

  @IsNotEmpty()
  @IsIn(['Income', 'Expend'])
  @IsString()
  operate: 'Income' | 'Expend';
}
