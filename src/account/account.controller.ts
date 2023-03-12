import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  getAccountCateCodeByDesc,
  getAccountCateDescByCode,
} from 'src/enum/account-cate-enum';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entity/account.entity';

@Controller('api/account')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAccount(
    @Request() request,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<any> {
    const { name, icon, cate } = createAccountDto;
    const account: AccountEntity = new AccountEntity();
    account.name = name;
    account.icon = icon;
    account.cate = getAccountCateCodeByDesc(cate);
    account.userId = request.user.id;
    return await this.accountService.create(account);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAccount(
    @Request() request,
    @Param() params: any,
    @Body() updateAccountDto: CreateAccountDto,
  ): Promise<any> {
    const { name, icon, cate } = updateAccountDto;
    const account: AccountEntity = new AccountEntity();
    account.id = params.id;
    account.name = name;
    account.icon = icon;
    account.cate = getAccountCateCodeByDesc(cate);
    account.userId = request.user.id;
    this.logger.debug(JSON.stringify(account));
    return this.accountService.update(account);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAccount(@Request() request, @Param() params: any): Promise<any> {
    return this.accountService.delete(params.id, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAccount(@Request() request, @Param() params: any): Promise<any> {
    const { id, name, icon, cate } = await this.accountService.getById(
      params.id,
      request.user.id,
    );
    return {
      id,
      name,
      icon,
      cate: getAccountCateDescByCode(cate),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAccountList(@Request() request): Promise<any> {
    const arr: AccountEntity[] = await this.accountService.getList(
      request.user.id,
    );
    return arr.map(({ id, name, icon, cate }) => {
      return {
        id,
        name,
        icon,
        cate: getAccountCateDescByCode(cate),
      };
    });
  }
}
