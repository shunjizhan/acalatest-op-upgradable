// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract HelloWorld{
    string public helloWorld = 'Hello World!';

    constructor() {

	}

    function setValue(string memory str) external {
        helloWorld = str;
    } 
}