require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');

require("dotenv").config({
    path: require("path").join(__dirname, ".env"),
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.7.3",
    networks: {
        mandala: {
            url: "http://127.0.0.1:8545",
            accounts: {
                mnemonic:
                    "fox sight canyon orphan hotel grow hedgehog build bless august weather swarm",
                path: "m/44'/60'/0'/0",
            },
            chainId: 595,
        },
        mandalaPubDev: {
            url: "https://tc7-eth.aca-dev.network",
            accounts: {
                mnemonic:
                    "fox sight canyon orphan hotel grow hedgehog build bless august weather swarm",
                path: "m/44'/60'/0'/0",
            },
            chainId: 595,
        },
    },
    solidity: {
        version: "0.8.10",
        settings: {
            optimizer: {
                enabled: false,
                runs: 200,
            },
        },
    },
};
