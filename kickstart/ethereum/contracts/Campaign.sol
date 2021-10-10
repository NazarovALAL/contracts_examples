// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory {
  Campaign[] public deployedCampaings;
  
  function createCampaign(uint minimum) public {
    Campaign newCampaign = new Campaign(minimum, msg.sender);
    deployedCampaings.push(newCampaign);
  }
  
  function getDeployedCampaings() public view returns (Campaign[] memory) {
    return deployedCampaings;
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvals;
  }    
  
  uint public numRequests;
  mapping (uint => Request) public requests;  
  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount;
   
  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  constructor(uint minimum, address creator) {
    manager = creator;
    minimumContribution = minimum;
  }
  
  function contribute() public payable {
    require(msg.value > minimumContribution);

    approvers[msg.sender] = true;
    approversCount++;
  }
  
  function createRequest(string memory description, uint value, address recipient) 
    public restricted 
  {
    Request storage r = requests[numRequests++];
    r.description = description;
    r.value = value;
    r.recipient = recipient;
    r.complete = false;
    r.approvalCount = 0;
  }
  
  function approveRequest(uint index) public {
    Request storage request = requests[index];
    
    require(approvers[msg.sender]);
    require(!request.approvals[msg.sender]);
    
    request.approvals[msg.sender] = true;
    request.approvalCount++;
  }
  
  function finalizeRequest(uint index) public restricted {
    Request storage request = requests[index];
    
    require(request.approvalCount > (approversCount / 2));
    require(!request.complete);
    
    payable(request.recipient).transfer(request.value);
    request.complete = true;
  }
  
  function getContractBalance() public view returns(uint) {
    return address(this).balance;
  }
}