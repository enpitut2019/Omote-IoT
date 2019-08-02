pragma solidity ^0.5.10;

contract Water_supply {

    address payable public owner;
    uint amount_of_water;//当月の使用量
    uint diameter;//口径（０から９の数字で） 
    uint wallet;//財布
    uint[] public basic_rate = [1296,1620,2700,3510,7560,16200,42120,93960,234900,446040];//基本料金
    uint[] public history_water;//水の量の履歴
    uint[] public history_charge;//支払の履歴
    uint public unpaid_charge;//未払いの料金
    uint public not_pay_counter = 0;//未払いの回数
    bool public on_working = true;//水道が動いているかどうか

    
    constructor() public {
        owner = 0x1cd248fd0CAB42123758e5141ba143894df7f7F3;
    }

    //未払いの回数が３回より多いかを判断する修飾詞
    modifier can_pay(uint num){
        require(num <= 2);
        _;
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
    function payment() public can_pay(not_pay_counter){
        uint charge = calc_charge() + unpaid_charge;
        if(wallet < charge) {
                unpaid_charge = charge;
                not_pay_counter += 1;
        }else{
            owner.transfer(charge);
            wallet -= charge;
            unpaid_charge = 0;
        }
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

    //履歴の更新
    function set_history() public {
        history_water.push(get_amount_of_water());
        history_charge.push(calc_charge());
    }
    
    //使った水の量の履歴を返す関数
    function get_history_water() public view returns(uint[] memory){
        uint array_length = history_water.length;
        uint[] memory arrayMemory = new uint[](array_length);
        arrayMemory = history_water;
        return arrayMemory;
    }

    //料金の履歴を返す関数
    function get_history_charge() public view returns(uint[] memory){
        uint array_length = history_charge.length;
        uint[] memory arrayMemory = new uint[](array_length);
        arrayMemory = history_charge;
        return arrayMemory;
    }

    //未払金を返す関数
    function get_unpaid_charge() public view returns(uint){
        return unpaid_charge;
    }

    //水道のon/off
    function change_working() public {
        if(on_working == true){
            on_working = false;
        }else{
            on_working = true;
        }
    }
}
