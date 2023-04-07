// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract QueryContract {
    
    address private admin;
    mapping(string => bool) private queries;
    mapping(string => bool) private approvals;
 
    string[] private allQueries;
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    function getAdmin() public view returns (address) {
        return admin;
    }
    
    function addQuery(string memory query, bool approval) public {
    queries[query] = approval;

}

    
    function checkQuery(string memory query) public view returns ( bool) {
        return  approvals[query];
    }
    
    function getAllQueries() public view returns (string[] memory) {
        return allQueries;
    }
    
    function approveQuery(string memory query) public onlyAdmin {
         approvals[query] = true;
    }
}
