import { NetworkConnector } from '@web3-react/network-connector';
import { CHAINS } from '../constants/chain';
import { IRPC_URLS } from '../types/chain';

const RPC_URLS: IRPC_URLS = {
  [CHAINS.BSCMAIN]: process.env.REACT_APP_RPC_URL_BSCMAIN || '',
  [CHAINS.RINKEBY]: process.env.REACT_APP_RPC_URL_BSCMAIN || '',
  [CHAINS.GOERLI]: process.env.REACT_APP_RPC_URL_BSCMAIN || '',
  [CHAINS.HOMESTEAD]: process.env.REACT_APP_RPC_URL_HOMESTEAD || '',
};

export const networkConnector = new NetworkConnector({
  urls: Object.fromEntries(
    Object.values(CHAINS).map((i) => [i, RPC_URLS[i]]),
  ),
  defaultChainId: CHAINS.HOMESTEAD,
});
