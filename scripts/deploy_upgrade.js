const {
    calcEthereumTransactionParams,
    EvmRpcProvider
} = require("@acala-network/eth-providers");

//npx hardhat run scripts/deploy_upgrade.js --network mandala

async function main() {
    const blockNumber = await ethers.provider.getBlockNumber();
	console.log("blockNumber: ", blockNumber);

    const provider = EvmRpcProvider.from("ws://localhost:9944");
    await provider.isReady();

    const gasPriceOverrides = (await provider._getEthGas()).gasPrice;
    provider.getFeeData = async () => ({
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
        gasPrice: gasPriceOverrides,
    });

    // const signer = new ethers.Wallet("YOUR PRIVATE KEY", provider);
    const signer = ethers.Wallet.fromMnemonic('fox sight canyon orphan hotel grow hedgehog build bless august weather swarm').connect(provider);

    const HelloWorldUpgrade = await ethers.getContractFactory("HelloWorldUpgrade", signer);
    var instance = await upgrades.deployProxy(HelloWorldUpgrade);
    await instance.deployed();
    console.log("deploy instance at: ", instance.address);

    const value1 = await instance.value();
    console.log("Stored value:", value1);

    const pending = await instance.setValue(12345);
    await pending.wait();

    const value2 = await instance.value();
    console.log("Stored value:", value2);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
