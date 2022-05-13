// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract HelloWorldUpgrade {
    uint256 public value;

    function initialize() external {

    }

    function setValue(uint256 v) external {
        value = v;
    } 
}