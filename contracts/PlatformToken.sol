// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title PlatformToken
 * @dev Ye hamare DFM platform ka ERC20 token hai.
 * Iska naam hoga "DFM Token" aur symbol hoga "DFMT".
 */
contract PlatformToken is ERC20 {
    /**
     * @dev Contract ke deploy hote hi ye constructor chalega.
     * Ye token ka naam aur symbol set karega.
     * Aur shuruaat me 1 million tokens banakar contract deploy karne wale ko de dega.
     */
    constructor() ERC20("DFM Token", "DFMT") {
        _mint(msg.sender, 1000000 * (10**18));
    }
}