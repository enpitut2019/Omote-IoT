var account;
var currentPrice;
var waterHistory;
var chargeHistory, chargeHistoryJpy;
var histState, walletState;

function init() {
	return new Promise(resolve => {
		if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
			ethereum.enable()
			abi = [{"constant": true,"inputs": [],"name": "get_user_info","outputs": [{"name": "","type": "uint256"},{"name": "","type": "uint256"},{"name": "","type": "uint256"},{"name": "","type": "uint256[]"},{"name": "","type": "uint256[]"},{"name": "","type": "uint256"},{"name": "","type": "uint256"},{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "get_wallet","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "calc_charge","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "get_history_water","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "get_not_pay_counter","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "get_history_charge","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "get_unpaid_charge","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_amount_of_water","type": "uint256"}],"name": "set_used_water","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "pay_unpaid_charge","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "history_charge","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "user","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "sender","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "unpaid_charge","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "not_pay_counter","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "get_on_working","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "set_history","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "history_water","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "newSender","type": "address"}],"name": "set_sender","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "deposit","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "on_working","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "basic_rate","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "stop_counter","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_amount_of_water","type": "uint256"}],"name": "calc_commodity_charge","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "get_amount_of_water","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "admin","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [{"name": "_user","type": "address"},{"name": "_diameter","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"}];
			web3.eth.getAccounts((error, result) => {
				$('#accounts').text('アカウントアドレス: '+result)
				account = result[0]
				$.ajax({
					  type: 'POST',
					  url: '../phps/common.php',
					  data: {
						  'eth' : account
					  },
					  success: function(result) {
						  contractAddress = result;
						  if (contractAddress == ""){
							  $("#noAccount").append("<h4>利用するには初回登録が必要です</h4><a href='htmls/regist_form.html'>登録ページはこちら</a><br>");
						  } else {
							  contract = web3.eth.contract(abi).at(contractAddress);
							  resolve();
						  }
					  }
					});
			})
		} else {
			document.write('Install <a href="https://metamask.io">METAMASK</a>')
		}
	});
}

//デポジットされたethを受け取る
function dispUserwallet() {
	contract.get_wallet.call({from:account},(error, result) => {
		if(!error) {
			if(walletState) {
				$('#balance').text((Math.floor(currentPrice * result * Math.pow(10, -18))/1).toLocaleString() + '(JPY)')
			} else {
				$('#balance').text((Math.floor(result * Math.pow(10, -15))/1000).toLocaleString() + '(ETH)')
			}
		}
	});
}

//使用した水の量と料金の履歴を受け取る
function getHistoryofWater() {
	return new Promise(resolve => {
		contract.get_history_water.call({from:account},(error,result1) => {
			if(!error) {
				contract.get_history_charge.call({from:account},(error,result2) => {
					if(!error) {
						resolve([result1, result2]);
					}
				});
			}
		});
	});
}

//履歴を配列に代入
function setHistory(result) {
	waterHistory = result[0];
	chargeHistory = result[1];
	chargeHistoryJpy = [];
	var len = chargeHistory.length;
	for (var i = 0; i < len; i++) {
		chargeHistoryJpy.push(Math.floor(chargeHistory[i] * current_price * Math.pow(10, -18))/1);
	}
}

//日本円との変換
function setCurrentJpy() {
	return new Promise(resolve => {
		$.ajax({
			type: 'GET',
			url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&ids=ethereum',
			dataType: 'json',
			success: function(json){
				Ethereum = json[0];
				current_price = Ethereum["current_price"];
				currentPrice = current_price;
				histState = true;
				walletState = true;
				resolve();
			}
		});

	});
}

//未払金の回数を受け取る
function getNotPayCount() {
	contract.get_not_pay_counter.call({from:account},(error,result) => {
		if(!error) {
			if (result > 0) {
				getUnpaidCharge();
			}
		}
	});
}

//未払金を受け取る
function getUnpaidCharge() {
	contract.get_unpaid_charge.call({from:account},(error,result) => {
		if(!error) {
			$("#onWorking").text("未払金があります");
			$("#unpaid").text("未払金: " + Math.floor(result * Math.pow(10, -15))/1000).toLocaleString() + '(ETH)');
		}
	});
}

//水道が停止されているかどうかを受け取る
function getOnWorking() {
	contract.get_on_working.call({from:account},(error,result) => {
		if(!error) {
			if(!result) {
				$("#onWorking").text("停止中");
			}
		}
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
