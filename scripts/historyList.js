$(function(){
	init().then(result => {
		getHistoryofWater().then(result => {
			setCurrentJpy().then(result2 => {
				setHistory(result);
				dispHistory();
			});
		});
	});
});

//全期間リスト表示
function dispHistory() {
	var now   = new Date();
	var year  = now.getFullYear();
	var month = now.getMonth();
	var len = waterHistory.length;
	var label = [];
	var inc = 0;
	for (var i = 0; i < len; i++) {
		label.push(year - Math.floor(len / 12) + inc + "年" + ((month + 12 - (len - i) % 12) % 12 + 1) + "月");
		if ((len - i) % 12 == 0) {
			inc++;
		}
	}
	var tbody = document.getElementById('tbodyID');
	for (var i = 0; i < len; i++) {
		var tr = document.createElement('tr');
		tr.innerHTML = '<tr><td>'+label[i]+'</td><td>'+waterHistory[i]+'</td><td>'+chargeHistoryJpy[i]+'</td></tr>';
		tbody.appendChild(tr);
	}
}

//ethereumと円の変換
function convertEthToJpy() {
	len = $("#histTable tbody").children().length;
	var tbody = document.getElementById('tbodyID');
	if(histState) {
		$('#unit').text("料金(ETH)");
		for (var i = 0; i < len; i++) {
			tbody.rows[i].cells[2].innerText = Math.floor(chargeHistory[i] * Math.pow(10, -15))/1000;
		}
		histState = false;
	} else {
		$('#unit').text("料金(JPY)");
		for (var i = 0; i < len; i++) {
			tbody.rows[i].cells[2].innerText = chargeHistoryJpy[i];
		}
		histState = true;
	}
}