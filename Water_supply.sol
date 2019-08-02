pragma solidity 0.5.10;

contract Water_supply {

    address payable public owner;
    uint amount_of_water;//当月の使用量
    uint diameter;//口径（０から９の数字で） 
    uint wallet;//財布
    uint[] public basic_rate = [1296,1620,2700,3510,7560,16200,42120,93960,234900,446040];//基本料金
    
    constructor() public {
        owner = 0x1cd248fd0CAB42123758e5141ba143894df7f7F3;
    }
    
    // modifier onlyOwner(){
    //     if(msg.sender != owner) revert();
    //     _;
    // }

    //デポジットされた金額を表示
    function get_wallet() public view returns (uint) {
        return wallet;
    }
    
    //当月の水量を表示
    function get_amount_of_water() public view returns (uint) {
        return amount_of_water;
    }
    
    //デポジット
    function deposit() public payable {
        if(msg.value <= 0) revert();
        wallet += msg.value;
    }
    
    //料金の支払い
    function payment() public {
        uint charge = calc_charge();
        if(wallet < charge) revert();
        owner.transfer(charge);
        wallet -= charge;
    }

    //従量料金の計算（つくば市）
    function calc_commodity_charge(uint _amount_of_water) public view returns (uint){
        if(diameter <= 2){
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
        return basic_rate[diameter] + calc_commodity_charge(amount_of_water) * amount_of_water;
    }
    
    function set(uint _amount_of_water) public {
        amount_of_water = _amount_of_water;
        diameter = 1;
    }
}
