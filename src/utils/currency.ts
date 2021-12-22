import { TCurrency } from 'types/currency';
import web3 from 'web3';

interface fromWeiProps {
  weiBalance: string;
  showUnit?: boolean;
  toCurrency: TCurrency;
}

export const fromWei = ({ weiBalance, showUnit = true, toCurrency }: fromWeiProps) => {
  if (toCurrency === TCurrency.ETHER) {
    return showUnit ? `${web3.utils.fromWei(weiBalance, 'ether')} ETH` : web3.utils.fromWei(weiBalance, 'ether');
  } else if (toCurrency === TCurrency.WEI) {
    return showUnit ? `${weiBalance} WEI` : weiBalance;
  } else {
    return showUnit ? `${weiBalance} WEI` : weiBalance;
  }
};

interface toWeiProps {
  balance: string;
  showUnit?: boolean;
  fromCurrency: TCurrency;
}

export const toWei = ({ balance, showUnit = true, fromCurrency }: toWeiProps) => {
  if (fromCurrency === TCurrency.ETHER) {
    return showUnit ? `${web3.utils.toWei(balance, 'ether')} WEI` : web3.utils.toWei(balance, 'ether');
  } else if (fromCurrency === TCurrency.WEI) {
    return showUnit ? `${balance} WEI` : balance;
  } else {
    return showUnit ? `${balance} WEI` : balance;
  }
};


