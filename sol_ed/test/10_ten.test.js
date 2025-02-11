const { expect } = require("chai")
const { ethers } = require("hardhat")


describe("AucEngine", function () {//тест для проверки аукциона
  let owner
  let seller
  let buyer
  let auct

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners()//получаем адреса

    const AucEngine = await ethers.getContractFactory("AucEngine", owner)
    auct = await AucEngine.deploy()
    await auct.deployed()
  })

  it("sets owner", async function() {//тест для проверки владельца
    const currentOwner = await auct.owner()
    expect(currentOwner).to.eq(owner.address)
  })

  async function getTimestamp(bn) {
    return (
      await ethers.provider.getBlock(bn)//получаем блок
    ).timestamp
  }

  describe("createAuction", function () {

    it("creates auction correctly", async function() {//тест для проверки создания аукциона
      const duration = 60
      const tx = await auct.createAuction(
        ethers.utils.parseEther("0.0001"),
        3,
        "fake item",//предмет аукциона
        duration
      )

      const cAuction = await auct.auctions(0) // Promise 
      expect(cAuction.item).to.eq("fake item")//проверка на то что предмет аукциона равен "fake item"
      const ts = await getTimestamp(tx.blockNumber)
      expect(cAuction.endsAt).to.eq(ts + duration)
    })
  })

  function delay(ms) {//функция для задержки
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  describe("buy", function () {//тест для проверки покупки

    it("allows to buy", async function() {//тест для проверки покупки
      await auct.connect(seller).createAuction(
        ethers.utils.parseEther("0.0001"),
        3,
        "fake item",
        60
      )

      this.timeout(5000) // 5s
      await delay(1000)//ждем 1 секунду

      const buyTx = await auct.connect(buyer).
        buy(0, {value: ethers.utils.parseEther("0.0001")})

      const cAuction = await auct.auctions(0)
      const finalPrice = cAuction.finalPrice
      await expect(() => buyTx).
        to.changeEtherBalance(
          seller, finalPrice - Math.floor((finalPrice * 10) / 100)
        )
      
      await expect(buyTx)//проверка на то что аукцион закончился
        .to.emit(auct, 'AuctionEnded')
        .withArgs(0, finalPrice, buyer.address)
      
      await expect(//проверка на то что нельзя купить аукцион который уже закончился
        auct.connect(buyer).
          buy(0, {value: ethers.utils.parseEther("0.0001")})
      ).to.be.revertedWith('stopped!')//проверка на то что аукцион закончился
    })
  })
})