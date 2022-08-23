export enum TradeOperation {
  // 收入 add
  Income = 1,
  // 支出 subtract
  Expend = 2,
  // 转入 add
  TransferIn = 3,
  // 转出 subtract
  TransferOut = 4,
  // 借入 add
  Borrow = 5,
  // 借出 subtract
  Lend = 6,
  // 收款 add
  Receive = 7,
  // 还款 subtract
  Repayment = 8,
  // 初始化 add
  Init = 9,
  // 平款 add
  Flat = 10,
}

export const getTradeOperationDescByCode = function (code: number): string {
  return TradeOperation[code];
};

export const getTradeOperationCodeByDesc = function (desc: string): number {
  desc =
    desc.substring(0, 1).toLocaleUpperCase() +
    desc.substring(1).toLocaleLowerCase();
  switch (desc) {
    case 'Income':
      return TradeOperation.Income;
    case 'Expend':
      return TradeOperation.Expend;
    case 'TransferIn':
      return TradeOperation.TransferIn;
    case 'TransferOut':
      return TradeOperation.TransferOut;
    case 'Borrow':
      return TradeOperation.Borrow;
    case 'Lend':
      return TradeOperation.Lend;
    case 'Receive':
      return TradeOperation.Receive;
    case 'Repayment':
      return TradeOperation.Repayment;
    case 'Init':
      return TradeOperation.Init;
    case 'Flat':
      return TradeOperation.Flat;
  }
};
