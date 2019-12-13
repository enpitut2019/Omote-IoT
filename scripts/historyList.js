var waterHistory;
var chargeHistory;
var chargeHistoryJpy;
var state;

//全期間リスト表示
function dispList(amount) {
	var now   = new Date();
	var year  = now.getFullYear();
	var month = now.getMonth();
	waterHistory = amount[0];
	chargeHistory = amount[1];
	var len = waterHistory.length;
	chargeHistoryJpy = [];
	var label = [];
	var inc = 0;
	for (var i = 0; i < len; i++) {
		label.push(year - Math.floor(len / 12) + inc + "年" + ((month + 12 - (len - i) % 12) % 12 + 1) + "月");
		if ((len - i) % 12 == 0) {
			inc++;
		}
	}
	var tbody = document.getElementById('tbodyID');
	$.ajax({
		  type: 'GET',
		  url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&ids=ethereum',
		  dataType: 'json',
		  success: function(json){
			  Ethereum = json[0];
			  current_price = Ethereum["current_price"];
			  console.log(current_price)
			  console.log(len)
			  for (var i = 0; i < len; i++) {
				 // chargeHistoryJpy.push(chargeHistory[i] * current_price * Math.pow(10, -18));
				  chargeHistoryJpy.push(Math.floor(chargeHistory[i] * current_price * Math.pow(10, -4))/10);
			  }
				for (var i = 0; i < len; i++) {
			        var tr = document.createElement('tr');
			        tr.innerHTML = '<tr><td>'+label[i]+'</td><td>'+waterHistory[i]+'</td><td>'+chargeHistoryJpy[i]+'</td></tr>';
			        tbody.appendChild(tr);
				}
				state = true;
		  }
	});
}

//ethereumと円の変換
function convertEthToJpy() {
	len = waterHistory.length;
	var tbody = document.getElementById('tbodyID');
	if(state) {
		$('#unit').text("料金(wei)");
		for (var i = 0; i < len; i++) {
			tbody.rows[i].cells[2].innerText = chargeHistory[i];
		}
		state = false;
	} else {
		$('#unit').text("料金(JPY)");
		for (var i = 0; i < len; i++) {
			tbody.rows[i].cells[2].innerText = chargeHistoryJpy[i];
		}
		state = true;
	}
}


$(function(){
	init().then(result => {
		getHistoryofWater().then(result => {
			dispList(result);
		});
	});
});