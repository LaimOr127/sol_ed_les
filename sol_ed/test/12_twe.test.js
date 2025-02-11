const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Demo_test", function () {
    let oener

    beforeEach(async function () {
        [owner] = await ethers.getSigners()

        const Logger = await ethers.getContractFactory("Logger", owner)
        const logger = await logger.deploy()
        await logger.deployed()

        const Demo_test = await ethers.getContractFactory("Demo_test", owner)
        demo_test = await Demo_test.deploy(logger.address)
        await demo_test.deployed()
    })
})