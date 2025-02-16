const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Demo_test", function () {
    let owner
    let demo_test
    let logger

    beforeEach(async function () {
        [owner] = await ethers.getSigners()

        const Logger = await ethers.getContractFactory("Logger", owner)
        logger = await Logger.deploy()
        await logger.waitForDeployment()

        console.log("Logger address:", logger.target);//проверка адреса

        const Demo_test = await ethers.getContractFactory("Demo_test", owner)
        demo_test = await Demo_test.deploy(logger.target)
        await demo_test.waitForDeployment()
    })

    it ("allows to pay for a service", async function () {
        const sum = 100

        const txDate = {
            value: sum,
            to : demo_test.target
        }

        const tx = await owner.sendTransaction(txDate)

        await tx.wait()

        await expect(tx)
            .to.changeEtherBalance(demo_test, sum)

        const amount = await demo_test.payment(owner.target, 0)

        expect(amount).to.equal(sum)

    })
})