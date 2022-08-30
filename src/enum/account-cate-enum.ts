export enum AccountCate {
  Property = 1, // 资产
  Debt = 2, // 负债
}

export const getAccountCateDescByCode = function (code: number): string {
  return AccountCate[code];
};

export const getAccountCateCodeByDesc = function (desc: string): number {
  desc =
    desc.substring(0, 1).toLocaleUpperCase() +
    desc.substring(1).toLocaleLowerCase();
  switch (desc) {
    case 'Property':
      return AccountCate.Property;
    case 'Debt':
      return AccountCate.Debt;
  }
};
