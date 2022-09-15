//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract myNFT is ERC721, Ownable {

    address public _contractOwner;
    uint256 public tokenCounter;
   

    mapping(uint => string) public tokenURIMap;
   
    event Minted(address indexed minter, uint price, uint nftID, string tokenURI);

    constructor() ERC721("wbmNFTs", "WBM") {
        _contractOwner = msg.sender;
    }

    function mint(string memory _uri, address _toAddress, uint _price) public returns (uint){
        uint _tokenId = tokenCounter;
        // priceMap[_tokenId] = _price;

        _safeMint(_toAddress, _tokenId);
        // _setTokenURI(_tokenId, _uri);
        tokenCounter++;

        emit Minted(_toAddress, _price, _tokenId, _uri);

        return _tokenId;
    }
}

