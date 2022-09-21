const { web3, account, contract} = require("@openzeppelin/test-environment");
const { expect } = require("chai");
const { BigNumber } = require("bignumber.js");

const accounts = "0xAAf83b4c9b97CA0f52c38253C2C2197FE7e685b2";

let result = (accounts);


// const [deployer, userMinter] = result;
const userMinter = result;
const deployer = result;
// const deployer  = accounts[1];
// const userMinter = accounts[1];
console.log(userMinter)

const MyNFTContract = artifacts.require("myNFT");

describe("myNFT", function () {
    // this.timeout(20000);
    beforeEach(async function () {
        this.contract = await MyNFTContract.new({ from: deployer });
    });
  
    it("Should batch mint NFT successfully", async function() {
        // console.log("hello")
        const tokenURI = "coco_one";
        const mintAmount = 3;
        const myAmount = 2;
        // console.log(myAmount, typeof myAmount);
        const mintResult = await this.contract.mint(
            tokenURI,
            mintAmount,
            myAmount
        );
        console.log(mintResult)

        // const price = await web3.utils.fromWei(
        //     new BigNumber(mintResult.logs[1].args.price).toString(),
        //     "ether"
        // );
        console.log(mintResult.logs[0].args, "1......")
        console.log(mintResult.logs[1].args, "2......")
        console.log(mintResult.logs[3].args, "3......")
        console.log(mintResult.logs[4].args, "4......")
        expect(mintResult.logs[1].args.nftID.toNumber()).to.equal(0);
        expect(mintResult.logs[1].args.tokenURI).to.eq(tokenURI);
        // expect(mintResult.logs[1].args.mintAmount).to.eq(mintAmount);
    }) 
});