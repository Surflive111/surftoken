const { expect } = require("chai");
const { ethers } = require("hardhat");
const { toBigNum, fromBigNum } = require("./utils.js");

var owner;
var network;
var exchangeRouter;
var exchangeFactory;
var wBNB;
var surf;
var userWallet;



describe("Create Account", () => {

  it("Create Account", async () => {
    [owner] = await ethers.getSigners();
    network = await owner.provider._networkPromise;
    userWallet = ethers.Wallet.createRandom();
    userWallet = userWallet.connect(ethers.provider);
    var tx = await owner.sendTransaction({
      to: userWallet.address,
      value: ethers.utils.parseUnits("10", 8)
    });
    await tx.wait();
  });

});

describe("Exchage deploys", () => {

  it("Factory deploy", async () => {
    const Factory = await ethers.getContractFactory("PancakeFactory");
    exchangeFactory = await Factory.deploy(owner.address);
    await exchangeFactory.deployed();
    console.log(await exchangeFactory.INIT_CODE_PAIR_HASH());
  });

  it("wBNB deploy", async () => {
    const WBNB = await ethers.getContractFactory("WBNB");
    wBNB = await WBNB.deploy();
    await wBNB.deployed();
  });

  it("Router deploy", async () => {
    const Router = await ethers.getContractFactory("PancakeRouter");
    exchangeRouter = await Router.deploy(
      exchangeFactory.address,
      wBNB.address
    );
    await exchangeRouter.deployed();
  });

  it("Surf deploy", async () => {
    const Surf = await ethers.getContractFactory("Surf");
    surf = await Surf.deploy(exchangeRouter.address);
    await surf.deployed();
  });

})

describe("contract prepare", () => {

  it("approve", async () => {
    var tx = await surf.approve(
      exchangeRouter.address,
      ethers.utils.parseUnits("100000", 5)
    );
    await tx.wait();
  });

  it("add liquidity eth", async () => {
    var tx = await exchangeRouter.addLiquidityETH(
      surf.address,
      ethers.utils.parseUnits("10000", 5),
      0,
      0,
      owner.address,
      "1234325432314321",
      { value: ethers.utils.parseUnits("0.1", 18) }
    )
    await tx.wait();
  });

  it(" send some surf token to userWallet", async () => {
    var tx = await surf.transfer(userWallet.address, toBigNum("5000", 5));
    await tx.wait();
    await checkBalance();
  });


});

describe("Legercy exchange", () => {

  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });

  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
    await checkBalance();
  });


  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
    await checkBalance();
  });


  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
    await checkBalance();
  });


  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
    await checkBalance();
  });

  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });
  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });
  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });
  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });


  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
  });


  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });


  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });

  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
  });

  it("buy test", async () => {
    await checkBalance();
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });

  it("buy test", async () => {
    await checkBalance();
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
    await checkBalance();
  });

  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    // await ethers.provider.send("evm_increaseTime", [864000])
    // await ethers.provider.send('evm_mine');
    await checkBalance();

  });
  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');
    console.log(await surf.totalSupply());
    await checkBalance();

  });

  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    await checkBalance();

  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        surf.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
    await checkBalance();
  });



  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1000", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await ethers.provider.send("evm_increaseTime", [86400])
    await ethers.provider.send('evm_mine');
    await checkBalance();
  });
  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1000", 5),
      0,
      [surf.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    await checkBalance();
  });




  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    await checkBalance();
    await ethers.provider.send("evm_increaseTime", [864000])
    await ethers.provider.send('evm_mine');

  });

  it(" send some surf token to userWallet", async () => {

    var tx = await surf.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
    console.log(await surf.totalSupply());
    await checkBalance();

  });


  //  it(" withdraw", async () => {
  //    var tx =   await surf.withdrawAllToTreasury();
  //    await tx.wait();
  //    await checkBalance();
  //  })

});

const checkBalance = async () => {
  var provider = ethers.provider;
  //var userBnbBalance = await provider.getBalance(userWallet.address);
  var sifBnbBalance = await provider.getBalance("0x76896483228CDB1ba44EE4C359a7474808f89DE0");
  var sifDevBnbBalance = await provider.getBalance("0xBA7631c9F0A683FFa2f95A21ee9cd3295a7Ed87f");
  var liquidityBnbBalance = await provider.getBalance("0x0f44268D9E93203Bd23B2a193ad4F58A96e50F14");

  console.log("user wallet Surf balance", fromBigNum(await surf.balanceOf(userWallet.address), 5));
  console.log("firepit wallet surf balance", fromBigNum(await surf.balanceOf("0xB15Dff959F1A1791308E7CE81b4b6dB94673b1a8"), 5));
  console.log("surf contract own balance", fromBigNum(await surf.balanceOf(surf.address), 5));
  console.log("auto liquidity wallet surf balance", fromBigNum(await surf.balanceOf("0x0f44268D9E93203Bd23B2a193ad4F58A96e50F14"), 5));
  console.log("auto liquidity wallet bnb balance", fromBigNum(liquidityBnbBalance, 18));
  console.log("sif wBNB balance", fromBigNum(sifBnbBalance, 18));
  console.log("sifDev wBNB balance", fromBigNum(sifDevBnbBalance, 18));
  //console.log("user wallet wBNB balance", fromBigNum(userBnbBalance, 18));
}