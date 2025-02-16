import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";

describe("Demo_test", function () {//создание тестов для контракта
    let owner: Signer;
    let demo_test: Contract;
    let logger: Contract;

    beforeEach(async function () {//начальная инициализация контракта
        [owner] = await ethers.getSigners();

        const Logger = await ethers.getContractFactory("Logger", owner);
        logger = await Logger.deploy() as unknown as Contract;//развертывание контракта
        await logger.waitForDeployment();

        console.log("Logger address:", logger.address);//вывод адреса контракта

        const Demo_test = await ethers.getContractFactory("Demo_test", owner);
        demo_test = await Demo_test.deploy(logger.address as string) as unknown as Contract;
        await demo_test.waitForDeployment();
    });

    it("allows to pay for a service", async function () {//тест на возможность оплаты услуги
        const sum = 100;

        const txData = {
            value: sum,
            to: await demo_test.getAddress()//адрес контракта
        };

        const tx = await owner.sendTransaction(txData);

        await tx.wait();//ожидание завершения транзакции

        await expect(tx)
            .to.changeEtherBalance(demo_test, sum);

        const amount = await demo_test.payment(await owner.getAddress(), 0);

        expect(amount).to.equal(sum);//проверка суммы
    });
});