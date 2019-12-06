//送金ボタンを押したとき
function chargeButton() {
	var charge = $('#charge').val();
	if (charge == "") {
		$('#error').text("金額を入力してください");
	} else if (charge <= 0) {
		$('#error').text("正しい金額を入力してください");
	} else {
		$('#error').text("");
		Deposit();
	}
}

$(function(){
	init().then(result => {
		getUserwallet();
	});
});
