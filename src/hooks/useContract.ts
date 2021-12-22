import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import { getContract } from '../utils';
import useActiveWeb3React from './useActiveWeb3React';

// returns null on errors
const useContract = (
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): Contract | null => {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
};

export default useContract;
