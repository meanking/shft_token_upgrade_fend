import React, { useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injectedConnector } from 'connectors/injectedConnecor';
import { ReactComponent as MetamaskIcon } from 'assets/images/svgs/metamask-icon.svg';
import styles from './Button.module.scss';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import { useToast } from 'components/Toast/ToastProvider';
import { CHAINS } from 'constants/chain';

const toastTimeoutGeneral = 10100;

const ConnectButton: React.FC = () => {
  const { activate, account, deactivate, error, chainId } = useWeb3React();
  const { addToast } = useToast();

  const toggleActive = () => {
    if (account) {
      deactivate();
    } else {
      activate(injectedConnector);
    }
  }

  useEffect(() => {
    if (error instanceof NoEthereumProviderError) {
      addToast({ title: 'Metamask connection error', type: 'TOAST_ERROR', description: 'Ethereum was not provided.' , timeout: toastTimeoutGeneral})
    } else if (error instanceof UserRejectedRequestError) {
      addToast({ title: 'Metamask connection error', type: 'TOAST_ERROR', description: 'User rejected the connection', timeout: toastTimeoutGeneral })
    } else if (error instanceof UnsupportedChainIdError) {
      addToast({ title: 'Metamask connection error', type: 'TOAST_ERROR', description: 'Metamask is not supporting the chain you are using. Please change your network on your Metamask.', timeout: toastTimeoutGeneral })
    }
  }, [error])

  return (
    <div
      className={`relative z-50 flex p-3 mx-2 md:mx-0 mb-4 md:mb-0 bg-white-0 dark:bg-black-700 rounded-lg shadow-2xl md:w-full cursor-pointer w-auto ${styles.connect_width}`}
      onClick={toggleActive}
    >
      <div className="mr-4">
        <MetamaskIcon />
      </div>
      {account ? (
        <div>
          <p className="text-sm text-gray-700 dark:text-white-0 font-bold">
            Connected with MetaMask
            {chainId === CHAINS.RINKEBY && (
              <span className="text-red-100"> (Rinkeby Test)</span>
            )}
            {chainId === CHAINS.GOERLI && (
              <span className="text-red-100"> (Goerli Test)</span>
            )}
            {chainId === CHAINS.HOMESTEAD && (
              <span className="text-red-100"> (Ethereum Mainnet)</span>
            )}
          </p>
          <p className="text-sm text-gray-700 dark:text-white-0 font-semibold">{`${account.substr(0, 6)}...${account.substr(account.length - 4)}`}</p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-700 dark:text-white-0 font-bold">Connect with Metamask</p>
          <p className="text-sm text-gray-700 dark:text-white-0 font-semibold">Please connect your metamask to use the app.</p>
        </div>
      )}

    </div>
  );
};

export default ConnectButton;
