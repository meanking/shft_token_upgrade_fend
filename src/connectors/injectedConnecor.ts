import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAINS } from 'constants/chain';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: Object.values(CHAINS),
});
