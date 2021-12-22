import React, { useCallback, useContext, useState } from 'react';
import { TCurrency } from 'types/currency';

interface ICurrencyContextState {
  currency: TCurrency;
  changeCurrency: (currency: TCurrency) => void;
}

const contextDefaultValues = {
  currency: TCurrency.ETHER,
  changeCurrency: () => undefined
};
const CurrencyContext = React.createContext<ICurrencyContextState>(contextDefaultValues);

const CurrencyProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = useState<TCurrency>(TCurrency.ETHER);
  const changeCurrency = useCallback((c: TCurrency) => setCurrency(c), [setCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        changeCurrency
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

const useCurrency = () => useContext(CurrencyContext);

export { CurrencyContext, useCurrency };
export default CurrencyProvider;