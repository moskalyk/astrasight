//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AstraSight {
    // owner
    // options {time: []}

    struct Option {
        price: uint
        time: uint
        maker: address
        taker: address
        taken: bool
    }
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }
    /*
        make
    */
    function spur() public {
        // construct option
        // save to kv
    }
    /*
        take
    */
    function dfine() public {
        // 
    }
    /*
        redeem
    */
    function iota() public {

    }
    /*
        inspect option
    */
    function see() public {

    }
    /*
        preload available conjuction dates
    */
    function sonic() public {

    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
