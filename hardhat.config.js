require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("solidity-coverage");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

module.exports = {
	contractSizer: {
		alphaSort: true,
		runOnCompile: true,
		disambiguatePaths: false,
	},
	solidity: {
		version: "0.8.11",
		settings: {
			optimizer: {
				enabled: true,
				runs: 999999,
			},
		},
	},
	networks: {
		hardhat: {
			initialBaseFeePerGas: 0,
			allowUnlimitedContractSize: true,
		},
		ftm: {
			url: "https://rpc.ftm.tools",
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
		ftmtest: {
			url: "https://rpc.testnet.fantom.network/",
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
	},
	gasReporter: {
		enabled: true,
		currency: "USD",
		token: "FTM",
		coinmarketcap: process.env.CMC_API_KEY,
		excludeContracts: ["testing/"],
		gasPriceApi: "https://api.ftmscan.com/api?module=proxy&action=eth_gasPrice",
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
};
