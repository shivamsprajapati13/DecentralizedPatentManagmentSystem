// SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract PatentManagementSystem {
    struct Patent {
        address owner;
        string title;
        string description;
        bool approved;
    }
    
    mapping(uint => Patent) public patents;
    mapping(address => mapping(uint => uint)) public patentIndices;
    uint public nextId;
    address public admin;
    
    event PatentCreated(uint indexed id, address indexed owner, string title, string description);
    event PatentApproved(uint indexed id);
    event PatentRejected(uint indexed id);
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function createPatent(string memory title, string memory description) external {
        patents[nextId] = Patent(msg.sender, title, description, false);
        patentIndices[msg.sender][nextId] = nextId;
        emit PatentCreated(nextId, msg.sender, title, description);
        nextId++;
    }

  function updatePatentStatus(uint patentId, bool newStatus) external onlyAdmin {
    require(patentId < nextId, "Invalid patent id");
    Patent storage patent = patents[patentId];
    patent.approved = newStatus;
    if (newStatus) {
        emit PatentApproved(patentId);
    } else {
        emit PatentRejected(patentId);
    }
}

    

    function getPatentCount() public view returns (uint256) {
        return nextId;
    }
    
    function getPatent(uint patentId) public view returns (address, string memory, string memory, bool) {
        require(patentId < nextId, "Invalid patent id");
        Patent storage patent = patents[patentId];
        return (patent.owner, patent.title, patent.description, patent.approved);
    }

     function getPatentApprovalStatus(uint patentId) public view returns (bool) {
        require(patentId < nextId, "Invalid patent id");
        Patent storage patent = patents[patentId];
        return patent.approved;
    }

    
}
