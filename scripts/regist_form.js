$(function(){
	init().then(result => {
		$('#EtheAddress').val(account);
	});
});

//パスワード同値確認
function CheckPassword(confirm){
	// 入力値取得
	var input1 = $("#password").val();
	var input2 = $("#confirm").val();
	// パスワード比較
	if(input1 != input2){
		confirm.setCustomValidity("入力値が一致しません。");
	}else{
		confirm.setCustomValidity('');
	}
}
