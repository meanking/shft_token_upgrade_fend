import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const WrappedWeb3ReactProvider: React.FC = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
);

export default WrappedWeb3ReactProvider;
