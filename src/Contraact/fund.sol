// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Crowdfunding is ReentrancyGuard {
    struct Campaign {
        address payable creator;
        uint256 targetAmount;
        uint256 deadline;
        uint256 amountCollected;
        bool isCompleted;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    uint256 public campaignCount;

    event CampaignCreated(uint256 campaignId, address creator, uint256 targetAmount, uint256 deadline);
    event ContributionMade(uint256 campaignId, address contributor, uint256 amount);
    event FundsWithdrawn(uint256 campaignId, uint256 amount);
    event RefundClaimed(uint256 campaignId, address contributor, uint256 amount);
    event DeadlineExtended(uint256 campaignId, uint256 newDeadline);
    event CampaignArchived(uint256 campaignId);

    modifier validCampaign(uint256 _campaignId) {
        require(_campaignId < campaignCount, "Invalid campaign ID");
        _;
    }

    modifier beforeDeadline(uint256 _campaignId) {
        require(block.timestamp < campaigns[_campaignId].deadline, "Deadline has passed");
        _;
    }

    modifier afterDeadline(uint256 _campaignId) {
        require(block.timestamp >= campaigns[_campaignId].deadline, "Deadline has not passed");
        _;
    }

    function createCampaign(uint256 _targetAmount, uint256 _durationInDays) external {
        require(_targetAmount > 0, "Target amount must be greater than zero");
        require(_durationInDays > 0, "Duration must be greater than zero");

        uint256 campaignId = campaignCount++;
        campaigns[campaignId] = Campaign({
            creator: payable(msg.sender),
            targetAmount: _targetAmount,
            deadline: block.timestamp + (_durationInDays * 1 days),
            amountCollected: 0,
            isCompleted: false
        });

        emit CampaignCreated(campaignId, msg.sender, _targetAmount, campaigns[campaignId].deadline);
    }

    function contribute(uint256 _campaignId) external payable validCampaign(_campaignId) beforeDeadline(_campaignId) nonReentrant {
        require(msg.value > 0, "Contribution must be greater than zero");

        campaigns[_campaignId].amountCollected += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _campaignId) external validCampaign(_campaignId) afterDeadline(_campaignId) nonReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only creator can withdraw funds");
        require(campaign.amountCollected >= campaign.targetAmount, "Target amount not reached");
        require(!campaign.isCompleted, "Funds already withdrawn");

        campaign.isCompleted = true;
        uint256 amount = campaign.amountCollected;
        campaign.amountCollected = 0;

        campaign.creator.transfer(amount);
        emit FundsWithdrawn(_campaignId, amount);
    }

    function claimRefund(uint256 _campaignId) external validCampaign(_campaignId) afterDeadline(_campaignId) nonReentrant {
        require(campaigns[_campaignId].amountCollected < campaigns[_campaignId].targetAmount, "Target amount met");

        uint256 contributedAmount = contributions[_campaignId][msg.sender];
        require(contributedAmount > 0, "No contributions to refund");

        contributions[_campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(contributedAmount);

        emit RefundClaimed(_campaignId, msg.sender, contributedAmount);
    }

    function getCampaignDetails(uint256 _campaignId)
        external
        view
        validCampaign(_campaignId)
        returns (
            address creator,
            uint256 targetAmount,
            uint256 deadline,
            uint256 amountCollected,
            bool isCompleted
        )
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.creator,
            campaign.targetAmount,
            campaign.deadline,
            campaign.amountCollected,
            campaign.isCompleted
        );
    }

    function extendDeadline(uint256 _campaignId, uint256 _extraDays)
        external
        validCampaign(_campaignId)
        beforeDeadline(_campaignId)
    {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only creator can extend deadline");
        require(_extraDays > 0, "Invalid extension period");

        campaign.deadline += _extraDays * 1 days;

        emit DeadlineExtended(_campaignId, campaign.deadline);
    }

    function archiveCampaign(uint256 _campaignId) external validCampaign(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only creator can archive");
        require(!campaign.isCompleted, "Campaign already completed");

        campaign.isCompleted = true;
        emit CampaignArchived(_campaignId);
    }

    function getCampaignCount() external view returns (uint256) {
        return campaignCount;
    }
}
