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
				"name": "approved",
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
const ADDRESS = '0x87c858e9dc050041977eC59866B164474F7738CE'; // put your contract's address here

const web3 = new Web3(Web3.givenProvider);

const contract = new web3.eth.Contract(ABI, ADDRESS);

export default contract;
