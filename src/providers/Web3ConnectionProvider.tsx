import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

import useEagerConnect from 'hooks/useEagerConnect';
import useInactiveListener from 'hooks/useInactiveListener';
import { networkConnector } from 'connectors/networkConnector';

function Web3ConnectionProvider({ children }: { children: JSX.Element }) {
  const context = useWeb3React<Web3Provider>();
  const { activate, active } = context;

  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !active) {
      activate(networkConnector);
    }
  }, [triedEager, active, activate]);

  useInactiveListener(!triedEager);

  return children;
}

export default Web3ConnectionProvider;
