import Web3 from 'web3';

const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "query",
				"type": "string"
			}
		],
		"name": "addQuery",
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
const ADDRESS = '0xB5dE4D6d6e4E31c5302cd982C78B6Fe44408C869'; // put your contract's address here

const web3 = new Web3(Web3.givenProvider);

const contract = new web3.eth.Contract(ABI, ADDRESS);

export default contract;
