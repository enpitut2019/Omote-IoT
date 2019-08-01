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
    
    //ユーザーのデポジットされた金額を表示
    function get_wallet() public view returns (uint) {
        return member[msg.sender].wallet;
    }
    
    //デポジット
    function deposit() public payable {
        if (msg.value <= 0) revert();
        member[msg.sender].wallet += msg.value;
    }
    
    //料金の支払い
    function payment(uint _charge) public {
        if (member[msg.sender].wallet < _charge) revert();
        member[msg.sender].wallet -= _charge;
        collected_money += _charge;
    }
}
