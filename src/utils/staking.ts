import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';

export async function depositLpToken(
  contract: Contract,
  lpContract: Contract,
  accountAddress: string,
  depositAmount: string,
) {
  const allowance: BigNumber = await lpContract.allowance(
    accountAddress,
    process.env.REACT_APP_SHYFT_CONTRACT,
  );
  if (allowance.gt(BigNumber.from(depositAmount))) {
    await contract?.deposit(0, depositAmount);
  } else {
    const tx = await lpContract.approve(
      process.env.REACT_APP_SHYFT_CONTRACT,
      depositAmount + 1,
    );
    await tx.wait();
    await contract?.deposit(0, depositAmount);
  }
}

export async function withdrawLpToken(contract: Contract, withdrawAmount: string) {
  await contract?.withdraw(0, withdrawAmount);
}

export async function harvest(contract: Contract) {
  await contract.harvest(0);
}
