var contractAddress;

$(function(){
	init().then(result => {
	});
});

function init() {
	return new Promise(resolve => {
		if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
			ethereum.enable()
			abi = [{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"pay_unpaid_charge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"set_history","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newSender","type":"address"}],"name":"set_sender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount_of_water","type":"uint256"}],"name":"set_used_water","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_user","type":"address"},{"name":"_diameter","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"basic_rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"calc_charge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_amount_of_water","type":"uint256"}],"name":"calc_commodity_charge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_amount_of_water","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_history_charge","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_history_water","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_not_pay_counter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_on_working","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_unpaid_charge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_user_info","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_wallet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"history_charge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"history_water","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"not_pay_counter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"on_working","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unpaid_charge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"user","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
			web3.eth.getAccounts((error, result) => {
				account = result[0]
				resolve();
			})
		} else {
			document.write('Install <a href="https://metamask.io">METAMASK</a>')
		}
	});
}

//スマートコントラクトをデプロイ(セキュリティ上問題があるのでNode.jsでサーバーで動かした方が良い)
function deploy() {
	web3 = new Web3();
	if (!web3.currentProvider) {
		web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/672082360bbc4bb0a584be860d9e1f85"));
	}
	const sender = '0x61666605cE04f4D5e845165692D8a71C026d9a34';
	const privateKey = new ethereumjs.Buffer.Buffer('2D3E4CC5AC1A653FF47A97922B6ED91BC8E42428CF5FE5637506FB20F8635DEA', 'hex');
	web3.eth.getTransactionCount(sender, (err, txCount) => {
	    //Smart contract data
	    const bytecode = '0x6080604052731cd248fd0cab42123758e5141ba143894df7f7f3600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604051806101400160405280662e0b0d244a000067ffffffffffffffff16815260200166398dd06d5c800067ffffffffffffffff168152602001665fec5b60ef800067ffffffffffffffff168152602001667cb343979dc00067ffffffffffffffff16815260200167010c95cca905000067ffffffffffffffff16815260200167023f8a24459d000067ffffffffffffffff1681526020016705d8672b1b65000067ffffffffffffffff168152602001670d0a2138c6f5000067ffffffffffffffff168152602001672099530df164800067ffffffffffffffff168152602001673de6862af427000067ffffffffffffffff16815250600690600a61015f92919061025e565b506000600a556001600b60006101000a81548160ff0219169083151502179055506000600c5534801561019157600080fd5b506040516112f63803806112f6833981810160405260408110156101b457600080fd5b810190808051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060048190555050506102dc565b8280548282559060005260206000209081019282156102a6579160200282015b828111156102a5578251829067ffffffffffffffff1690559160200191906001019061027e565b5b5090506102b391906102b7565b5090565b6102d991905b808211156102d55760008160009055506001016102bd565b5090565b90565b61100b806102eb6000396000f3fe6080604052600436106101665760003560e01c806368b2c1a8116100d1578063d0e30db01161008a578063dd1c3dfe11610064578063dd1c3dfe146106e4578063e1335a861461070f578063e8c1a0b61461075e578063f851a4401461078957610166565b8063d0e30db01461065c578063d22a1f2214610666578063d836355e1461069557610166565b806368b2c1a8146105205780637cfe9ef81461054b578063bee5d86014610576578063c08e2cec146105a5578063c2306a57146105bc578063d039d5381461060b57610166565b80633befd261116101235780633befd261146103a65780633c9ecb70146103d157806345c27ce41461040c57806346a6d0f5146104235780634f8632ba1461047257806367e404ce146104c957610166565b80630d65c9e31461016b578063147488301461024d5780631a0bce9f1461027857806329ca5b5b146102a35780632f3b05501461030f57806337e99eaf1461033a575b600080fd5b34801561017757600080fd5b506101806107e0565b60405180898152602001888152602001878152602001806020018060200186815260200185815260200184151515158152602001838103835288818151815260200191508051906020019060200280838360005b838110156101ef5780820151818401526020810190506101d4565b50505050905001838103825287818151815260200191508051906020019060200280838360005b83811015610231578082015181840152602081019050610216565b505050509050019a505050505050505050505060405180910390f35b34801561025957600080fd5b5061026261088f565b6040518082815260200191505060405180910390f35b34801561028457600080fd5b5061028d610899565b6040518082815260200191505060405180910390f35b3480156102af57600080fd5b506102b86108ca565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156102fb5780820151818401526020810190506102e0565b505050509050019250505060405180910390f35b34801561031b57600080fd5b50610324610965565b6040518082815260200191505060405180910390f35b34801561034657600080fd5b5061034f61096f565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610392578082015181840152602081019050610377565b505050509050019250505060405180910390f35b3480156103b257600080fd5b506103bb610a0a565b6040518082815260200191505060405180910390f35b3480156103dd57600080fd5b5061040a600480360360208110156103f457600080fd5b8101908080359060200190929190505050610a14565b005b34801561041857600080fd5b50610421610a2e565b005b34801561042f57600080fd5b5061045c6004803603602081101561044657600080fd5b8101908080359060200190929190505050610b69565b6040518082815260200191505060405180910390f35b34801561047e57600080fd5b50610487610b8a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104d557600080fd5b506104de610bb0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561052c57600080fd5b50610535610bd6565b6040518082815260200191505060405180910390f35b34801561055757600080fd5b50610560610bdc565b6040518082815260200191505060405180910390f35b34801561058257600080fd5b5061058b610be2565b604051808215151515815260200191505060405180910390f35b3480156105b157600080fd5b506105ba610bf9565b005b3480156105c857600080fd5b506105f5600480360360208110156105df57600080fd5b8101908080359060200190929190505050610c61565b6040518082815260200191505060405180910390f35b34801561061757600080fd5b5061065a6004803603602081101561062e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c82565b005b610664610d1f565b005b34801561067257600080fd5b5061067b610d52565b604051808215151515815260200191505060405180910390f35b3480156106a157600080fd5b506106ce600480360360208110156106b857600080fd5b8101908080359060200190929190505050610d65565b6040518082815260200191505060405180910390f35b3480156106f057600080fd5b506106f9610d86565b6040518082815260200191505060405180910390f35b34801561071b57600080fd5b506107486004803603602081101561073257600080fd5b8101908080359060200190929190505050610d8c565b6040518082815260200191505060405180910390f35b34801561076a57600080fd5b50610773610e25565b6040518082815260200191505060405180910390f35b34801561079557600080fd5b5061079e610e2f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600080600060608060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461084657600080fd5b6003546004546005546108576108ca565b61085f61096f565b600954600a54600b60009054906101000a900460ff16975097509750975097509750975097509091929394959697565b6000600554905090565b60006003546108a9600354610d8c565b026006600454815481106108b957fe5b906000526020600020015401905090565b6060600060078054905090506060816040519080825280602002602001820160405280156109075781602001602082028038833980820191505090505b509050600780548060200260200160405190810160405280929190818152602001828054801561095657602002820191906000526020600020905b815481526020019060010190808311610942575b50505050509050809250505090565b6000600a54905090565b6060600060088054905090506060816040519080825280602002602001820160405280156109ac5781602001602082028038833980820191505090505b50905060088054806020026020016040519081016040528092919081815260200182805480156109fb57602002820191906000526020600020905b8154815260200190600101908083116109e7575b50505050509050809250505090565b6000600954905090565b80600381905550610a23610bf9565b610a2b610e54565b50565b6009546005541015610abc57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6005549081150290604051600060405180830381858888f19350505050158015610aa4573d6000803e3d6000fd5b50600554600960008282540392505081905550610b67565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6009549081150290604051600060405180830381858888f19350505050158015610b26573d6000803e3d6000fd5b5060095460056000828254039250508190555060006009819055506000600a81905550600b60009054906101000a900460ff16610b6657610b65610f9c565b5b5b565b60088181548110610b7657fe5b906000526020600020016000915090505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b600a5481565b6000600b60009054906101000a900460ff16905090565b6007610c03610e25565b90806001815401808255809150509060018203906000526020600020016000909192909190915055506008610c36610899565b9080600181540180825580915050906001820390600052602060002001600090919290919091505550565b60078181548110610c6e57fe5b906000526020600020016000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610cdb57600080fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60003411610d2c57600080fd5b346005600082825401925050819055506000600a541115610d5057610d4f610a2e565b5b565b600b60009054906101000a900460ff1681565b60068181548110610d7257fe5b906000526020600020016000915090505481565b600c5481565b6000600260045411610db857600a8211610da95760009050610e20565b66055d56459c60009050610e20565b60148211610dcf5766055d56459c60009050610e20565b60288211610de6576606e46b72dd40009050610e20565b60648211610dfd5766086b80a01e20009050610e20565b6101f48211610e15576609f295cd5f00009050610e20565b660b82c34912800090505b919050565b6000600354905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600954610e61610899565b019050806005541015610f1757600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6005549081150290604051600060405180830381858888f19350505050158015610ed8573d6000803e3d6000fd5b50600554810360098190555060006005819055506001600a60008282540192505081905550600c54600a541115610f1257610f11610fb9565b5b610f99565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610f7f573d6000803e3d6000fd5b508060056000828254039250508190555060006009819055505b50565b6001600b60006101000a81548160ff021916908315150217905550565b6000600b60006101000a81548160ff02191690831515021790555056fea265627a7a72305820039cdd88642988230a2e0b3772fc6d068c375a13561000b51d056605e5c4cca264736f6c634300050a0032';
	    //arguments
		address = account;	//アドレス
		diameter = 1;		//口径
		const addressValue = address.slice(2);
		const addressResult = '0'.repeat(64 - addressValue.length) + addressValue;
		const diameterHex = web3.utils.toHex(diameter);
		const diameterValue = diameterHex.slice(2);
		const diameterResult =  '0'.repeat(64 - diameterValue.length) + diameterValue;

		// Build the transaction
		const data = bytecode + addressResult + diameterResult;
	    const txObject = {
	        nonce: web3.utils.toHex(txCount),
	        gasLimit: web3.utils.toHex(2000000),
	        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
	        data: data
	    }

	    // Sign the transaction
	    const tx = new ethereumjs.Tx(txObject)
	    tx.sign(privateKey)
	    const serializedTransaction = tx.serialize()
	    const row = '0x' + serializedTransaction.toString('hex')

	    // Broadcast the transaction
	    dispLoadning();
	    web3.eth.sendSignedTransaction(row, (error, transactionHash) => {
	    	console.log('error:', err, 'txHash', transactionHash)
			if(!error){
				var timerId = setInterval(function(){
					web3.eth.getTransactionReceipt(transactionHash,(error,resultReceipt) => {
						if(resultReceipt !== null) {
							web3.eth.getTransactionReceipt(transactionHash,(error,resultReceipt) => {
								if(!resultReceipt.status){
									clearInterval(timerId);
									removeLoading();
									dispFailed();
								} else {
									contractAddress = resultReceipt.contractAddress;
									clearInterval(timerId);
									removeLoading();
									dispSuccess();
								}
							});
						}
					});
				},500);
			}else{
				console.log(error);
				removeLoading();
				dispFailed();
			}
	    });
	})
}

function send(){
	$.ajax({
		  type: 'POST',
		  url: '../phps/regist.php',
		  data: {
		    'name' : $('#name').val(),
		    'tel' : $('#tel').val(),
		    'address' : $('#address').val(),
		    'mail' : $('#mail').val(),
		    'eth' : $('#eth').val(),
		    'password' : $('#password').val(),
		    'contractAddress' : contractAddress
		  },
		  success: function(data) {
			  location.href = '../'
		  }
		});
}

//pending中に表示する
function dispLoadning(){
	var msg = "登録処理中・・・"
	var dispMsg = "<div class='loadingMsg loadGif'><h3>" + msg + "</h3></div>";
	if($("#loading").length == 0){
		$("body").append("<div id='loading'>" + dispMsg + "</div>");
	}
}

//入金成功時に表示する
function dispSuccess(){
	var msg = "登録が完了しました";
	var dispMsg = "<div class='loadingMsg successIcon'><h3>" + msg + "</h3></div>";
	if($("#loading").length == 0){
		$("body").append("<div id='loading'>" + dispMsg + "</div>");
	}
	setTimeout(function(){send()},2500);
}

//入金失敗時に表示する
function dispFailed(){
	var msg = "登録できませんでした";
	var dispMsg = "<div class='loadingMsg failIcon'><h3>" + msg + "</h3><a href='../'>閉じる</a></div>";
	if($("#loading").length == 0){
		$("body").append("<div id='loading'>" + dispMsg + "</div>");
	}
}

//アニメーションを削除
function removeLoading(){
	$("#loading").remove();
}
