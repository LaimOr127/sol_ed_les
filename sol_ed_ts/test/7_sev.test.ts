import { expect } from "chai";
import { ethers } from "hardhat";
import type { Signer, TransactionResponse } from "ethers";
import type { PaidContract } from "../contracts/7_sev.sol";

describe("PaidContract", function () {//начальная инициализация контракта
  let owner: Signer;
  let other_addr: Signer;
  let paid_contract: PaidContract;//тип контракта

  beforeEach(async function () {
    [owner, other_addr] = await ethers.getSigners();
    const PaidContract = await ethers.getContractFactory("PaidContract", owner);
    paid_contract = await PaidContract.deploy() as PaidContract;
    await paid_contract.waitForDeployment();
  });

  async function sendMoney(sender: Signer): Promise<[TransactionResponse, bigint]> {
    const amount = 100;
    const txData = {
      to: await paid_contract.getAddress(),
      value: amount
    };
    const tx = await sender.sendTransaction(txData);
    await tx.wait();
    return [tx, BigInt(amount)];
  }

  it("should allow to send money", async function() {//тест на возможность отправки эфира
    const [sendMoneyTx, amount] = await sendMoney(other_addr);
    
    await expect(() => sendMoneyTx)
      .to.changeEtherBalance(paid_contract, amount);
    
    const blockNumber = sendMoneyTx.blockNumber;
    if (blockNumber === null) {
      throw new Error("Block number is null");//проверка на null
    }
    const block = await ethers.provider.getBlock(blockNumber);//получение блока
    if (!block) {
      throw new Error("Block not found");
    }
    const timestamp = block.timestamp;
    
    await expect(sendMoneyTx)
      .to.emit(paid_contract, "Paid")
      .withArgs(await other_addr.getAddress(), amount, timestamp);
  });

  it("should allow owner to withdraw funds", async function() {//тест на возможность вывода средств
    const [_, amount] = await sendMoney(other_addr);
    const tx = await paid_contract.withdraw(await owner.getAddress());
    
    await expect(() => tx)
      .to.changeEtherBalances(
        [paid_contract, owner],
        [-amount, amount]//проверка на изменение баланса
      );
  });
  
  it("should not allow other accounts to withdraw funds", async function() {//тест на запрет вывода средств
    await sendMoney(other_addr);
    
    await expect(
      paid_contract.connect(other_addr).withdraw(await other_addr.getAddress())//проверка на запрет вывода средств
    ).to.be.revertedWith("you are not an owner!");
  });
});