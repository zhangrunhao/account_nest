import {
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
  Get,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  getTradeCateTypeDescByCode,
  TradeCateType,
} from 'src/enum/trade-cate-type.enum';
import {
  getTradeOperationCodeByDesc,
  getTradeOperationDescByCode,
} from 'src/enum/trade-operation.enum';
import { UserEntity } from 'src/user/entity/user.entity';
import { CreateTradeCateDto } from './dto/create-trade-cate.dto';
import { TradeCateEntity } from './entity/trade-cate.entity';
import { TradeCateService } from './trade-cate.service';

@Controller('api/trade-cate')
export class TradeCateController {
  private readonly logger = new Logger(TradeCateController.name);

  constructor(private readonly tradeCateService: TradeCateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTradeCate(
    @Request() request,
    @Body() createTradeCateDto: CreateTradeCateDto,
  ): Promise<any> {
    const user: UserEntity = request.user;
    const { name, icon, operate } = createTradeCateDto;
    const tradeCate: TradeCateEntity = new TradeCateEntity();
    tradeCate.name = name;
    tradeCate.icon = icon;
    tradeCate.type = TradeCateType.Extra;
    tradeCate.operate = getTradeOperationCodeByDesc(operate);
    return this.tradeCateService.create(user, tradeCate);
  }

  @Put(':id')
  async updateTradeCate(
    @Param() params: any,
    @Body() updateTradeCateDto: CreateTradeCateDto,
  ): Promise<any> {
    const tradeCate: TradeCateEntity = new TradeCateEntity();
    const { name, icon, operate } = updateTradeCateDto;
    tradeCate.id = params.id;
    tradeCate.name = name;
    tradeCate.icon = icon;
    tradeCate.operate = getTradeOperationCodeByDesc(operate);
    return this.tradeCateService.update(tradeCate);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTradeCate(
    @Request() request: any,
    @Param() params: any,
  ): Promise<any> {
    return this.tradeCateService.delete(request.user.id, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTradeCate(@Param() params): Promise<any> {
    const tradeCate: TradeCateEntity = await this.tradeCateService.getById(
      params.id,
    );
    const { id, name, icon, type, operate } = tradeCate;
    return {
      id,
      name,
      icon,
      type: getTradeCateTypeDescByCode(type),
      operate: getTradeOperationDescByCode(operate),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTradeCateList(@Request() request): Promise<any> {
    const tradeCateArray: TradeCateEntity[] =
      await this.tradeCateService.getList(request.user.id);
    return tradeCateArray.map(({ id, name, type, operate, icon }) => {
      return {
        id,
        name,
        icon,
        type: getTradeCateTypeDescByCode(type),
        operate: getTradeOperationDescByCode(operate),
      };
    });
  }
}
