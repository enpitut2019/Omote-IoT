$(function(){
	init().then(result => {
		setCurrentJpy().then(result => {
			dispUserwallet();
		});
		getNotPayCount(true);
//		getOnWorking();
		getHistoryofWater().then(result => {
			setCurrentJpy().then(result2 => {
				setHistory(result);
				displayHistoryTable();
				displayGraph();
			});
		});
	});
});

//未払い料金を支払う
function payUnpaidCharge() {
	dispLoadning(msg);
	contract.pay_unpaid_charge.sendTransaction({from:account},(error, result) => {
		if(!error){
			web3.eth.filter('latest', function(error, result){
				if (!error) {
					removeLoading();
				} else {
					console.error(error)
					removeLoading();
				}
			  })
			}else{
				console.error(error);
				removeLoading();
			}
	});
}

//使用した水の量と料金の履歴を表示
function displayHistoryTable() {
	var len = waterHistory.length;
	if(len > 0) {
		$('#amount1').text(waterHistory[len-1]);
		$('#charge1').text(Number(chargeHistoryJpy[len-1]).toLocaleString());
	} else {
		$('#amount1').text(0);
		$('#charge1').text(0);
	}
	if(len > 1) {
		$('#amount2').text(waterHistory[len-2]);
		$('#charge2').text(Number(chargeHistoryJpy[len-2]).toLocaleString());
	} else {
		$('#amount2').text(0);
		$('#charge2').text(0);
	}
	if(len > 2) {
		$('#amount3').text(waterHistory[len-3]);
		$('#charge3').text(Number(chargeHistoryJpy[len-3]).toLocaleString());
	} else {
		$('#amount3').text(0);
		$('#charge3').text(0);
	}
	state = true;
}

//グラフを表示
function displayGraph() {
	var now   = new Date();
	var year  = now.getFullYear();
	var month = now.getMonth();
	label = []
	var len = waterHistory.length;
	for (var i = len-12; i < len; i++) {
		label.push(((month + 12 - (len - i) % 12) % 12 + 1) + "月");
	}
	chargeHistoryJpy1 = chargeHistoryJpy.slice(0, chargeHistoryJpy.length);
	if (len < 12) {
		for (var i = 0; i < 12-len; i++) {
			waterHistory.unshift(0);
			chargeHistoryJpy1.unshift(0);
		}
		len = 12;
	}
	var ctx = document.getElementById('ex_chart');
	var data = {
			labels: label,
			datasets: [{
				label: '水使用量',
				data: waterHistory.slice(len-12,len),
				borderColor: 'rgba(70, 210, 255, 1)',
				backgroundColor: 'rgba(70, 210, 255, 0.8)'
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
						return ("料金:" + chargeHistoryJpy1.slice(len-12,len)[tooltipItem[0].index] + "(JPY)");
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

//ethereumと円の変換(wallet)
function convertEthToJpyWal() {
	if(walletState) {
		walletState = false;
	} else {
		walletState = true;
	}
	dispUserwallet();
	getNotPayCount(walletState)
}

//ethereumと円の変換
function convertEthToJpy() {
	len = chargeHistory.length;
	iter = 0;
	if(len < 3) {
		iter = len;
	} else {
		iter = 3;
	}
	var tbody = document.getElementById('tbodyID');
	if(histState) {
		$('#unit').text("料金(ETH)");
		for (var i = 0; i < iter; i++) {
			tbody.rows[i].cells[2].innerText = Math.floor(chargeHistory[len - i - 1] * Math.pow(10, -15))/1000;
		}
		histState = false;
	} else {
		$('#unit').text("料金(JPY)");
		for (var i = 0; i < iter; i++) {
			tbody.rows[i].cells[2].innerText = chargeHistoryJpy[len - i - 1];
		}
		histState = true;
	}
	getNotPayCount(histState);
}
