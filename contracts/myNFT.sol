//SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 < 0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract myNFT is ERC721URIStorage, Ownable {

    // address public _contractOwner;
    uint256 public tokenCounter;
    
   
    mapping(uint => string) public tokenURIMap;
    mapping(uint => address) public tokenOwner;
    event Minted(address indexed minter, uint price, uint nftID, string tokenURI);

    constructor() ERC721("wbmNFTs", "WBM") {
        // _contractOwner = msg.sender;
    }

    modifier onlyNFTOwner(uint _tokenId) {
        require(tokenOwner[_tokenId] == msg.sender, "Only owner can accesss");
        _;
    }

    function mint(string memory _uri, uint _price, uint _mintAmount) public returns (uint){
        uint _tokenId = tokenCounter;
        for(uint i = 0 ; i <= _mintAmount; i++) {
            _safeMint(msg.sender, (_tokenId + i));
            tokenOwner[_tokenId + i] = msg.sender;
            _setTokenURI((_tokenId + i), _uri);

        tokenCounter++;

        emit Minted(msg.sender, _price, _tokenId, _uri);
        }
       return _tokenId;
    }

        function updateTokenURI(uint256 _tokenId, string memory _tokenURI) public onlyNFTOwner(_tokenId) virtual {
        require(_exists(_tokenId),"ERC721Metadata: URI set of nonexistent token"); 
        _setTokenURI(_tokenId, _tokenURI);
    }
}
