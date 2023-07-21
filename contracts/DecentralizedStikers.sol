// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DecentralizedStickers is ERC721URIStorage, AccessControl, Ownable, Pausable {
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER");
    bytes32 public constant URL_CONTROLLER_ROLE = keccak256("URLCONTROLLER");

    constructor() ERC721("Decentralized Stickers", "STKR") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address to) public returns (uint256) {
        require(hasRole(MINTER_ROLE, msg.sender), "Minter Only");
        _tokenIdCounter.increment();

        _safeMint(to, _tokenIdCounter.current());

        return _tokenIdCounter.current();
    }

    function mint_url(address to, string memory _tokenUrl) public returns (uint256) {
        require(hasRole(MINTER_ROLE, msg.sender), "Minter Only");
        _tokenIdCounter.increment();
        
        _safeMint(to, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), _tokenUrl);

        return _tokenIdCounter.current();
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(hasRole(URL_CONTROLLER_ROLE, msg.sender), "Only URL Conroller");

        _setTokenURI(tokenId, _tokenURI);
    }
}
