const { web3} = require("@openzeppelin/test-environment");
const { expect } = require("chai");
const { BigNumber } = require("bignumber.js");

const accounts = "0x19Dbea22d8A3F854F2F80c478b730F5122922782";
// let result = accounts.toLowerCase();
   let result = accounts;
// console.log(result);


// const [deployer, userMinter] = result;
const userMinter = result;
const deployer = result;
console.log(userMinter)

const MyNFTContract = artifacts.require("myNFT");

describe("myNFT", function () {
    beforeEach(async function () {
        this.contract = await MyNFTContract.new({ from: deployer });
    });

    it("should mint NFT successfully", async function () {
        const tokenURI = "ape_nft_one";

        const mintResult = await this.contract.mint(
            tokenURI,
            userMinter,
            web3.utils.toWei("12", "ether"),
            { from: userMinter }
        );
        console.log(mintResult)
        // console.log(mintResult.logs[1].args.minter)
        // console.log(mintResult.userMinter)
        // console.log(mintResult.logs[1].args.nftID.toNumber())
        expect(mintResult.logs[1].args.nftID.toNumber()).to.equal(0);
        expect(mintResult.logs[1].args.minter).to.equal(userMinter);
    });
});