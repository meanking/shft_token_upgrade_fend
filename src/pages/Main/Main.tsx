import React, { useState, useEffect, useCallback } from 'react'
import classes from './Main.module.scss';
import Button from 'components/Buttons/Button'
import Text from 'components/Text/Text';
import TokenInput from 'components/TokenInput/TokenInput';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useContract from 'hooks/useContract';
import { parseUnits, formatEther, parseEther } from '@ethersproject/units';
import SHYFTV1ABI from 'constants/ABI/SHYFT_V1_ABI.json';
import SHYFTV2ABI from 'constants/ABI/SHYFT_V2_ABI.json';
import { useToast } from 'components/Toast/ToastProvider';
import { BigNumber, FixedNumber } from '@ethersproject/bignumber';
import debounce from 'lodash/debounce';
import { useQuery } from 'react-query';

const refetchInterval = 3000;
const toastTimeoutGeneral = 10100;
const toastTimeoutCompleted = 30000;

const Main: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [v1Token, setV1Token] = useState('0');
  const [v2Token, setV2Token] = useState('0');

  const [readied, setReadied] = useState(false);
  const [actualUpgradeAmountWei, setActualUpgradeAmountWei] = useState(BigNumber.from(0));

  const { account } = useWeb3React<Web3Provider>();
  const { addToast } = useToast();

  const v1TokenContract = useContract(process.env.REACT_APP_SHYFT_TOKEN_V1, SHYFTV1ABI);
  const v2TokenContract = useContract(process.env.REACT_APP_SHYFT_TOKEN_V2, SHYFTV2ABI);

  const convert = async (value: BigNumber) => {
    if (v1TokenContract) {
      try {
        setLoading(true);

        let transferResult = await v1TokenContract.callStatic['transfer(address,uint256,bytes)'](process.env.REACT_APP_SHYFT_TOKEN_V2, value, 0x0);

        //check for result using static calls before performing transaction. validate that it passes.

        if (transferResult == true) {
          let txSent = await v1TokenContract['transfer(address,uint256,bytes)'](process.env.REACT_APP_SHYFT_TOKEN_V2, value, 0x0);

          // using async/await instead of polling, let's us be sure this code execute
          // in this context, and doesn't trigger on every event.
          await txSent.wait();

          await refetchV1Balance();
          await refetchV2Balance();

          addToast({ title: "Transaction Info", description: `Transaction was successfully finished: ${formatEther(actualUpgradeAmountWei)} SHFT Upgraded.`, type: 'TOAST_SUCCESS', timeout: toastTimeoutCompleted});

          setV1Token('0');
          setV2Token('0');
        } else {
          let errStr = "Error Code #127: No funds transferred";
          addToast({ title: "Transaction Error", description: errStr, type: 'TOAST_ERROR', timeout: toastTimeoutGeneral});
        }

        setLoading(false);
      } catch (error) {
        addToast({ title: "Transaction Error", description: error.message, type: 'TOAST_ERROR', timeout: toastTimeoutGeneral});
        setLoading(false);
      }
    }
  }

  const { data: v1Balance, refetch: refetchV1Balance } = useQuery<BigNumber>('v1-token', async () => {
    if (v1TokenContract && account) {
      const v1Balance = await v1TokenContract.callStatic.balanceOf(account);
      return v1Balance;
    } else {
      return BigNumber.from('0');
    }
  }, { refetchInterval })

  const { data: v2Balance, refetch: refetchV2Balance } = useQuery<BigNumber>('v2-token', async () => {
    if (v2TokenContract && account) {
      const v2Balance = await v2TokenContract.callStatic.balanceOf(account);
      return v2Balance;
    } else {
      return BigNumber.from('0');
    }
  }, { refetchInterval })

  const handleMaxClick = () => {
    if (v1Balance) {
      setReadied(true);
      setActualUpgradeAmountWei(v1Balance);

      let stringyValue = formatEther(v1Balance);
      setV1Token(stringyValue);
      debouncedChange(stringyValue);
    }
  }

  const handleUpgrade = async () => {
    // make sure wallet is connected
    if (!account) {
      addToast({ title: "Account Error", description: "Please connect your wallet", type: 'TOAST_ERROR', timeout: toastTimeoutGeneral })
      return;
    }

    // make sure that the user has either clicked the 'max' button, or entered numbers by hand
    // in the input fields.
    if (!readied) {
      addToast({ title: "Input Error", description: "Please enter a token amount to upgrade.", type: 'TOAST_ERROR', timeout: toastTimeoutGeneral })
      return;
    }

    // make sure that the "actual upgrade amount" is higher than the v1 balance.
    // scenario: user has balance X SHFT v1
    // user starts upgrade process for SHFT v1 on interface, enters all values
    // then the user's balance has been lowered by Y, then (X - Y) > X = false.
    await refetchV1Balance();

    if (v1Balance && readied) {
      if (actualUpgradeAmountWei.gt(v1Balance)) {
        addToast({ title: "Input Error", description: "Input value you is entered greater than the balance in your wallet.", type: 'TOAST_ERROR', timeout: toastTimeoutGeneral })
        return;
      }
    }

    let floatyValue = parseFloat(v1Token);

    // make sure float value isn't a NaN, sanity check.
    if (isNaN(floatyValue)) {
      addToast({ title: "Input Error", description: "Input value is invalid.", type: 'TOAST_ERROR', timeout: toastTimeoutGeneral })
      return;
    }

    if (floatyValue == 0) {
      addToast({ title: "Input Error", description: "Input value is zero.", type: 'TOAST_ERROR', timeout: toastTimeoutGeneral })
      return;
    }

    await convert(actualUpgradeAmountWei);
  }

  const e5decimalToBigNumber = (value: string) => {
    const roundedValue = Math.floor(parseFloat(value) * 1e5) / 1e5;

    return BigNumber.from(parseUnits(roundedValue.toString(), "ether"));
  }

  const getStringyFixedValue = (value: string) => {
    let floatyValue:number = parseFloat(value);
    let stringyValue:string = "0";

    if (isNaN(floatyValue)) {
      stringyValue = "0";
    } else {
      stringyValue = parseFloat(floatyValue.toFixed(5)).toString();
    }

    return stringyValue;
  }

  const handleV1Change = (value: string) => {
    let stringyValue:string = getStringyFixedValue(value);

    setV1Token(value);
    debouncedChange(stringyValue);
  }

  const handleV1Complete = () => {
    let stringyValue:string = getStringyFixedValue(v1Token);

    setReadied(true);
    setActualUpgradeAmountWei(e5decimalToBigNumber(stringyValue));

    setV1Token(stringyValue);
    debouncedChange(stringyValue);
  }
  const handleV2Change = (value: string) => {
    setV2Token(value);
  }

  const debouncedChange = useCallback(
    debounce(handleV2Change, 1000)
    , []);

  return (
    <div className="px-6 border-gray-800 rounded-lg bg-white-0 dark:bg-black-700 py-7">
      <div>
        <div className="flex justify-between mb-4">
          <Text className="font-bold">
            SHFT v1 Token Balance
          </Text>
          <div className="text-right">
            <Text>
              {v1Balance ? formatEther(v1Balance) : '0'} <b>SHFT</b>
            </Text>
            <Text className="text-sm">
              -  <b>USD</b>
            </Text>
          </div>
        </div>
        <TokenInput
          label="SHFT v1"
          value={v1Token}
          onClickMax={handleMaxClick}
          onChange={handleV1Change}
          onBlur={handleV1Complete}
        />
      </div>
      <div className="relative my-8 -mx-6">
        <div className={classes.divider}></div>
        <Button className="relative z-50 m-auto" loading={loading} variant="secondary" onClick={handleUpgrade}>
          {loading ? "Pending..." : "Upgrade"}
        </Button>
      </div>
      <div>
        <div className="flex justify-between mb-4">
          <Text className="font-bold">
            SHFT v2 Token Balance
          </Text>
          <div className="text-right">
            <Text>
              {v2Balance ? formatEther(v2Balance) : '0'} <b>SHFT</b>
            </Text>
            <Text className="text-sm">
              - <b>USD</b>
            </Text>
          </div>
        </div>
        <TokenInput
          label="SHFT v2"
          disabled
          value={v2Token}
        />
      </div>
    </div>
  )
}

export default Main
