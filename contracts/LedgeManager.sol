// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract LedgeManager {
    struct TxEvent {
        string txHash;
        string eventType;
        int256 delta;
        uint256 timestamp;
    }

    mapping(address => int256) public ledgeScore;
    mapping(address => TxEvent[]) public ledgerEvents;

    event LedgeUpdated(address indexed account, int256 delta, string eventType, string txHash);

    function recordEvent(address account, string calldata txHash, string calldata eventType, int256 delta) external {
        ledgeScore[account] += delta;
        ledgerEvents[account].push(TxEvent(txHash, eventType, delta, block.timestamp));
        emit LedgeUpdated(account, delta, eventType, txHash);
    }

    function getLedge(address account) external view returns (int256 score, uint256 eventsCount) {
        return (ledgeScore[account], ledgerEvents[account].length);
    }
}