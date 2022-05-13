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
            url: process.env.MANDALA_PROVIDER,
            accounts: [process.env.MANDALA_DEPLOYER],
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
