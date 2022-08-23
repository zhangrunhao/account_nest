export enum TradeCateType {
  Default = 1, // 默认
  Extra = 2, // 扩展
  System = 3, // 系统
}

export const getTradeCateTypeDescByCode = function (code: number): string {
  return TradeCateType[code];
};

export const getTradeCateTypeCodeByDesc = function (desc: string): number {
  desc =
    desc.substring(0, 1).toLocaleUpperCase() +
    desc.substring(1).toLocaleLowerCase();
  switch (desc) {
    case 'Default':
      return TradeCateType.Default;
    case 'Extra':
      return TradeCateType.Extra;
    case 'System':
      return TradeCateType.System;
  }
};
