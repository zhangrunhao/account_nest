import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
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
    @Param() params: any,
    @Body() updateTradeDto: CreateTradeDto,
  ): Promise<any> {
    // TODO: 判断次trade是否为此用户的trade
    const trade: TradeEntity = Object.assign({}, updateTradeDto, {
      id: params.id,
      operate: getTradeOperationCodeByDesc(updateTradeDto.operate),
    });
    await this.tradeService.update(trade);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTrade(@Param() params: any): Promise<any> {
    // TODO: 判断次trade是否为此用户的trade
    await this.tradeService.delete(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTradeList(@Request() request, @Query() query): Promise<any> {
    const tradeList: TradeEntity[] = await this.tradeService.list(
      request.user.id,
      query.tradeCateId ? query.tradeCateId : null,
      query.accountId ? query.accountId : null,
      query.operate ? getTradeOperationCodeByDesc(query.operate) : null,
      query.spendDate ? query.spendDate : null,
    );
    return tradeList.map(
      ({ id, accountId, money, remark, spendDate, tradeCateId, operate }) => {
        return {
          id,
          accountId,
          money,
          remark,
          spendDate,
          tradeCateId,
          operate: getTradeOperationDescByCode(operate),
        };
      },
    );
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
