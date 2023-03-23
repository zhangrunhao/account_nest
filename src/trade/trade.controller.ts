import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  getTradeOperationCodeByDesc,
  getTradeOperationDescByCode,
} from 'src/enum/trade-operation.enum';
import { CreateTradeDto } from './dto/create-trade.dto';
import { TradeEntity } from './entity/trade.entity';
import { ViewTradeEntity } from './entity/view-trade.entity';
import { TradeService } from './trade.service';

@Controller('/api/trade')
export class TradeController {
  private readonly logger = new Logger(TradeController.name);

  constructor(private readonly tradeService: TradeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTrade(
    @Request() request,
    @Body() createTradeDto: CreateTradeDto,
  ): Promise<any> {
    const trade: TradeEntity = Object.assign(createTradeDto, {
      userId: request.user.id,
      operate: getTradeOperationCodeByDesc(createTradeDto.operate),
    });
    await this.tradeService.create(trade);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTrade(
    @Request() request,
    @Param() params: any,
    @Body() updateTradeDto: CreateTradeDto,
  ): Promise<any> {
    const trade: TradeEntity = new TradeEntity();
    trade.userId = request.user.id;
    trade.id = params.id;
    trade.spendDate = new Date(updateTradeDto.spendDate);
    trade.operate = getTradeOperationCodeByDesc(updateTradeDto.operate);
    trade.accountId = updateTradeDto.accountId;
    trade.money = updateTradeDto.money;
    trade.remark = updateTradeDto.remark;
    trade.tradeCateId = updateTradeDto.tradeCateId;
    await this.tradeService.update(trade);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTrade(@Param() params: any): Promise<any> {
    await this.tradeService.delete(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTradeList(@Request() request): Promise<any> {
    const tradeList: ViewTradeEntity[] = await this.tradeService.list(
      request.user.id,
    );
    return tradeList.map((t: ViewTradeEntity) => {
      return {
        ...t,
        operate: getTradeOperationDescByCode(t.operate),
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTradeDetail(@Param() params: any): Promise<any> {
    const { id, accountId, money, remark, spendDate, operate, tradeCateId } =
      await this.tradeService.detail(params.id);
    return {
      id,
      accountId,
      money,
      remark,
      spendDate,
      tradeCateId,
      operate: getTradeOperationDescByCode(operate),
    };
  }
}
