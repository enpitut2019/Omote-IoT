var account;
function init() {
        return new Promise(resolve => {
                if (typeof web3 !== 'undefined') {
                        web3 = new Web3(web3.currentProvider);
                        ethereum.enable()
                        web3.version.getNetwork((error, result) => {
                                $('#networkid').text('Network ID: '+result)
                        })
                        web3.eth.getAccounts((error, result) => {
                                $('#accounts').text('Your accounts: '+result)
                                account = result[0]
                        })
                } else {
                        document.write('Install <a href="https://metamask.io">METAMASK</a>')
                }
                abi = [{"constant":false,"inputs":[],"name":"change_working","outputs":[],"payable":false,"stateMutability":"nonpayable","type$                contractAddress = "0x5848a250718c22885d5316b6a7893532cf96bb2f";
                contract = web3.eth.contract(abi).at(contractAddress);
                resolve();
        });
}

$(function(){
        $('.head').css({backgroundColor:'#a56469'});
        $('.footer').css({button:'0px'});

        init().then(result => {
                getUserwallet();
                getUsedWater();
                getHistoryofWater().then(result => {
                        display_graph(result);
                });
        });
});

//水の量セット
function setAmountofWater(){
        var input = $('#amountofWater').val();
        contract.set_used_water.sendTransaction(myEscape(input),{from:account},(error, result) => {
        });
}

//使用した水の量を受け取る
function getUsedWater(){
        contract.get_amount_of_water.call({from:account},(error,result) => {
                if(!error) {
                        $("#usedWater").text('あなたの使用量は'+result+'です')
                }
        });
}

//depositする
function Deposit(){
        var input = $('#deposit').val();
        contract.deposit.sendTransaction({from:account,to:contractAddress,value:web3.toWei(myEscape(input), "ether")},(error,result) => {
        });
}

//デポジットされたethを受け取る
function getUserwallet(){
        contract.get_wallet.call({from:account},(error, result) => {
                if(!error) {
                        console.log(account);
                        $('#balance').text('あなたのデポジットは'+result+'weiです')
                        console.log(result)
                }
        });
}

//使用した水の量と料金の履歴を受け取る
function getHistoryofWater() {
        return new Promise(resolve => {
                contract.get_history_water.call({from:account},(error,result1) => {
                        if(!error) {
                                console.log(result1)
                                contract.get_history_charge.call({from:account},(error,result2) => {
                                        if(!error) {
                                                console.log(result2)
                                                resolve([result1, result2]);
                                        }
                                });
                        }
                });
        });
}
//グラフを表示
function display_graph(amount) {
        var now   = new Date();
        var year  = now.getFullYear();
        var month = now.getMonth();
        //amount_of_water = [20, 30, 50, 40, 39, 40, 10, 10, 34, 50, 11, 20, 49, 12, 21, 60, 19]
        var amount_of_water = amount[0];
        var amount_of_charge = amount[1];
        console.log(amount_of_water, amount_of_charge);
        label = []
        var len = amount_of_water.length;
        for (var i = 0; i < len; i++) {
                label.push(((month + 12 - (len - i) % 12) % 12 + 1) + "月");
        }
        var ctx = document.getElementById('ex_chart');
        var data = {
                        labels: label,
                        datasets: [{
                                label: '水使用量',
                                data: amount_of_water,
                                borderColor: 'rgba(70, 210, 255, 1)',
                                backgroundColor: 'rgba(70, 210, 255, 0.5)'
                        }]
                      };
      var options = {
                      scales: {
                              yAxes: [{
                                      ticks: {
                                              min: 0
                                      }
                              }]
                      },
                  tooltips: {
                      titleFontSize: 15,
                      bodyFontSize: 12,
                      callbacks: {
                          title: function (tooltipItem, data){
                              return ("料金:" + amount_of_charge[tooltipItem[0].index] + "wei");
                          }
                      }
                  }
      };
      var ex_chart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
        });
}

var myEscape = function (str) {
    return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};
