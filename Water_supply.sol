pragma solidity 0.5.10;

contract Water_supply {

    address public owner;
    uint public collected_money;//集金の総額
    mapping (address => MemberStatus) public member;
    uint[] public basic_rate = [1296,1620,2700,3510,7560,16200,42120,93960,234900,446040];
    
    struct MemberStatus {
        uint amount_of_water;//当月の使用量
        uint diameter;//口径（０から９の数字で） 
        uint wallet;//個人の財布
    }

    //デポジットされた金額を表示
    function get_wallet() public view returns (uint) {
        return member[msg.sender].wallet;
    }
    
    function get_amount_of_water() public view returns (uint) {
        return member[msg.sender].amount_of_water;
    }
    
    //デポジット
    function deposit() public payable {
        if(msg.value <= 0) revert();
        member[msg.sender].wallet += msg.value;
    }
    
    //料金の支払い
    function payment() public {
        uint charge = calc_charge();
        if(member[msg.sender].wallet < charge) revert();
        member[msg.sender].wallet -= charge;
        collected_money += charge;
    }

    //従量料金の計算（つくば市）
    function calc_commodity_charge(uint _amount_of_water) public view returns (uint){
        if(member[msg.sender].diameter <= 2){

            if(_amount_of_water <= 10){
                return 0;
            }else{
                return 151;
            }

        }else{

            if(_amount_of_water <= 20){
                return 151;
            } else if(_amount_of_water <=40) {
                return 194;
            } else if(_amount_of_water <=100) {
                return 237;
            } else if(_amount_of_water <=500) {
                return 280;
            } else {
                return 324;
            }
        }
    }

    //支払い料金の計算（つくば市）
    function calc_charge() public view returns(uint) {
        return basic_rate[member[msg.sender].diameter] + calc_commodity_charge(member[msg.sender].amount_of_water) * member[msg.sender].amount_of_water;
    }
    
    function set(uint _amount_of_water) public {
        member[msg.sender].amount_of_water = _amount_of_water;
        member[msg.sender].diameter = 1;
    }
}
