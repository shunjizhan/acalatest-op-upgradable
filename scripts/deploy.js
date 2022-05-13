const {
    calcEthereumTransactionParams,
} = require("@acala-network/eth-providers");

const txFeePerGas = "199999946752";
const storageByteDeposit = "100000000000000";

async function main() {
    const blockNumber = await ethers.provider.getBlockNumber();
	console.log("blockNumber: ", blockNumber);

    const ethParams = calcEthereumTransactionParams({
        gasLimit: "2100001",
        validUntil: (blockNumber + 100).toString(),
        storageLimit: "64001",
        txFeePerGas,
        storageByteDeposit,
    });

    const [deployer] = await ethers.getSigners();
    const HelloWorld = await ethers.getContractFactory("HelloWorld");

    const instance = await HelloWorld.deploy({
        gasPrice: ethParams.txGasPrice,
        gasLimit: ethParams.txGasLimit,
    });

    console.log(ethParams);

	// console.log("instance: ", await instance.deployed());

    await instance.deployed();
    const value1 = await instance.helloWorld();
    console.log("Stored value:", value1);

    const pending = await instance.setValue("Test String");
    await pending.wait();

    const value2 = await instance.helloWorld();
    console.log("Stored value:", value2);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
