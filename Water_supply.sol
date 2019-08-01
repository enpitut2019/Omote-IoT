pragma solidity 0.5.10;

contract Water_supply{

    address public owner;
    uint public collected_money;//集金の総額
    mapping (address => MemberStatus) public member;
    
    struct MemberStatus {
        uint amount_of_water;//当月の使用量
        uint diameter;//口径 
        uint wallet;//個人の財布
    }
}
