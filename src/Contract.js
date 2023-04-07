import Web3 from 'web3';

const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "query",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "approval",
				"type": "bool"
			}
		],
		"name": "addQuery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "query",
				"type": "string"
			}
		],
		"name": "approveQuery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "query",
				"type": "string"
			}
		],
		"name": "checkQuery",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllQueries",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // put your contract's ABI here
const ADDRESS = '0x32dCE5CBbd0e7739cE3EE459943AFd7a74FB6404'; // put your contract's address here

const web3 = new Web3(Web3.givenProvider);

const contract = new web3.eth.Contract(ABI, ADDRESS);

export default contract;
