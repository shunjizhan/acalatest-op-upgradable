const {
    calcEthereumTransactionParams,
    EvmRpcProvider
} = require("@acala-network/eth-providers");


//npx hardhat run scripts/deploy_upgrade.js --network mandala

const txFeePerGas = "199999946752000";
const storageByteDeposit = "100000000000000";

async function main() {
    const blockNumber = await ethers.provider.getBlockNumber();
	console.log("blockNumber: ", blockNumber);

    const ethParams = calcEthereumTransactionParams({
        gasLimit: "2100001000",
        validUntil: (blockNumber + 100).toString(),
        storageLimit: "64001000",
        txFeePerGas,
        storageByteDeposit,
    });

    var [deployer] = await ethers.getSigners();
    
    // let provider = ethers.provider;
    // console.log(await provider.getFeeData())

    const provider = EvmRpcProvider.from('wss://mandala-tc7-rpcnode.aca-dev.network/ws');
    await provider.isReady();

    provider.getFeeData = async () => ({
        gasPrice: ethParams.txGasPrice,
        gasLimit: ethParams.txGasLimit,
    });

    console.log("ethParams: ", ethParams);

    const signer = new ethers.Wallet("YOUR PRIVATE KEY", provider);
    // const signer = ethers.Wallet.fromMnemonic('fox sight canyon orphan hotel grow hedgehog build bless august weather swarm').connect(provider);

    const HelloWorldUpgrade = await ethers.getContractFactory("HelloWorldUpgrade", signer);
    var instance = await upgrades.deployProxy(HelloWorldUpgrade);
    await instance.deployed();
    console.log("deploy instance at: ", instance.address);

    await instance.deployed();
    const value1 = await instance.HelloWorldUpgrade();
    console.log("Stored value:", value1);

    const pending = await instance.setValue("Test String");
    await pending.wait();

    const value2 = await instance.HelloWorldUpgrade();
    console.log("Stored value:", value2);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
