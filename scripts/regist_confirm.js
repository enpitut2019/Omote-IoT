var txHash;

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

//スマートコントラクトをデプロイ
function deploy() {
	web3 = new Web3();
	if (!web3.currentProvider) {
		web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/672082360bbc4bb0a584be860d9e1f85"));
	}
	const sender = '0x61666605cE04f4D5e845165692D8a71C026d9a34';
	const privateKey = new ethereumjs.Buffer.Buffer('2D3E4CC5AC1A653FF47A97922B6ED91BC8E42428CF5FE5637506FB20F8635DEA', 'hex');

	web3.eth.getTransactionCount(sender, (err, txCount) => {
	    //Smart contract data
	    const bytecode = '0x6080604052731cd248fd0cab42123758e5141ba143894df7f7f3600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604051806101400160405280662e0b0d244a000067ffffffffffffffff16815260200166398dd06d5c800067ffffffffffffffff168152602001665fec5b60ef800067ffffffffffffffff168152602001667cb343979dc00067ffffffffffffffff16815260200167010c95cca905000067ffffffffffffffff16815260200167023f8a24459d000067ffffffffffffffff1681526020016705d8672b1b65000067ffffffffffffffff168152602001670d0a2138c6f5000067ffffffffffffffff168152602001672099530df164800067ffffffffffffffff168152602001673de6862af427000067ffffffffffffffff16815250600690600a61015f929190610259565b506000600a556001600b60006101000a81548160ff02191690831515021790555034801561018c57600080fd5b506040516111ef3803806111ef833981810160405260408110156101af57600080fd5b810190808051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060048190555050506102d7565b8280548282559060005260206000209081019282156102a1579160200282015b828111156102a0578251829067ffffffffffffffff16905591602001919060010190610279565b5b5090506102ae91906102b2565b5090565b6102d491905b808211156102d05760008160009055506001016102b8565b5090565b90565b610f09806102e66000396000f3fe60806040526004361061014b5760003560e01c806368b2c1a8116100b6578063d0e30db01161006f578063d0e30db014610641578063d22a1f221461064b578063d836355e1461067a578063e1335a86146106c9578063e8c1a0b614610718578063f851a440146107435761014b565b806368b2c1a8146105055780637cfe9ef814610530578063bee5d8601461055b578063c08e2cec1461058a578063c2306a57146105a1578063d039d538146105f05761014b565b80633befd261116101085780633befd2611461038b5780633c9ecb70146103b657806345c27ce4146103f157806346a6d0f5146104085780634f8632ba1461045757806367e404ce146104ae5761014b565b80630d65c9e31461015057806314748830146102325780631a0bce9f1461025d57806329ca5b5b146102885780632f3b0550146102f457806337e99eaf1461031f575b600080fd5b34801561015c57600080fd5b5061016561079a565b60405180898152602001888152602001878152602001806020018060200186815260200185815260200184151515158152602001838103835288818151815260200191508051906020019060200280838360005b838110156101d45780820151818401526020810190506101b9565b50505050905001838103825287818151815260200191508051906020019060200280838360005b838110156102165780820151818401526020810190506101fb565b505050509050019a505050505050505050505060405180910390f35b34801561023e57600080fd5b50610247610849565b6040518082815260200191505060405180910390f35b34801561026957600080fd5b50610272610853565b6040518082815260200191505060405180910390f35b34801561029457600080fd5b5061029d610884565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156102e05780820151818401526020810190506102c5565b505050509050019250505060405180910390f35b34801561030057600080fd5b5061030961091f565b6040518082815260200191505060405180910390f35b34801561032b57600080fd5b50610334610929565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561037757808201518184015260208101905061035c565b505050509050019250505060405180910390f35b34801561039757600080fd5b506103a06109c4565b6040518082815260200191505060405180910390f35b3480156103c257600080fd5b506103ef600480360360208110156103d957600080fd5b81019080803590602001909291905050506109ce565b005b3480156103fd57600080fd5b50610406610a09565b005b34801561041457600080fd5b506104416004803603602081101561042b57600080fd5b8101908080359060200190929190505050610ac6565b6040518082815260200191505060405180910390f35b34801561046357600080fd5b5061046c610ae7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104ba57600080fd5b506104c3610b0d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561051157600080fd5b5061051a610b33565b6040518082815260200191505060405180910390f35b34801561053c57600080fd5b50610545610b39565b6040518082815260200191505060405180910390f35b34801561056757600080fd5b50610570610b3f565b604051808215151515815260200191505060405180910390f35b34801561059657600080fd5b5061059f610b56565b005b3480156105ad57600080fd5b506105da600480360360208110156105c457600080fd5b8101908080359060200190929190505050610bbe565b6040518082815260200191505060405180910390f35b3480156105fc57600080fd5b5061063f6004803603602081101561061357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bdf565b005b610649610c7c565b005b34801561065757600080fd5b50610660610c9b565b604051808215151515815260200191505060405180910390f35b34801561068657600080fd5b506106b36004803603602081101561069d57600080fd5b8101908080359060200190929190505050610cae565b6040518082815260200191505060405180910390f35b3480156106d557600080fd5b50610702600480360360208110156106ec57600080fd5b8101908080359060200190929190505050610ccf565b6040518082815260200191505060405180910390f35b34801561072457600080fd5b5061072d610d68565b6040518082815260200191505060405180910390f35b34801561074f57600080fd5b50610758610d72565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600080600060608060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461080057600080fd5b600354600454600554610811610884565b610819610929565b600954600a54600b60009054906101000a900460ff16975097509750975097509750975097509091929394959697565b6000600554905090565b6000600354610863600354610ccf565b0260066004548154811061087357fe5b906000526020600020015401905090565b6060600060078054905090506060816040519080825280602002602001820160405280156108c15781602001602082028038833980820191505090505b509050600780548060200260200160405190810160405280929190818152602001828054801561091057602002820191906000526020600020905b8154815260200190600101908083116108fc575b50505050509050809250505090565b6000600a54905090565b6060600060088054905090506060816040519080825280602002602001820160405280156109665781602001602082028038833980820191505090505b50905060088054806020026020016040519081016040528092919081815260200182805480156109b557602002820191906000526020600020905b8154815260200190600101908083116109a1575b50505050509050809250505090565b6000600954905090565b600b60009054906101000a900460ff166109e757600080fd5b806003819055506109f6610b56565b6001600481905550610a06610d97565b50565b6009546005541015610a1a57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6009549081150290604051600060405180830381858888f19350505050158015610a84573d6000803e3d6000fd5b5060095460056000828254039250508190555060006009819055506000600a81905550600b60009054906101000a900460ff16610ac457610ac3610e67565b5b565b60088181548110610ad357fe5b906000526020600020016000915090505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b600a5481565b6000600b60009054906101000a900460ff16905090565b6007610b60610d68565b90806001815401808255809150509060018203906000526020600020016000909192909190915055506008610b93610853565b9080600181540180825580915050906001820390600052602060002001600090919290919091505550565b60078181548110610bcb57fe5b906000526020600020016000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c3857600080fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60003411610c8957600080fd5b34600560008282540192505081905550565b600b60009054906101000a900460ff1681565b60068181548110610cbb57fe5b906000526020600020016000915090505481565b6000600260045411610cfb57600a8211610cec5760009050610d63565b66055d56459c60009050610d63565b60148211610d125766055d56459c60009050610d63565b60288211610d29576606e46b72dd40009050610d63565b60648211610d405766086b80a01e20009050610d63565b6101f48211610d58576609f295cd5f00009050610d63565b660b82c34912800090505b919050565b6000600354905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600954610da4610853565b019050806005541015610de257806009819055506001600a600082825401925050819055506000600a541115610ddd57610ddc610e9e565b5b610e64565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610e4a573d6000803e3d6000fd5b508060056000828254039250508190555060006009819055505b50565b600b60009054906101000a900460ff1615610e8157600080fd5b6001600b60006101000a81548160ff021916908315150217905550565b600b60009054906101000a900460ff16610eb757600080fd5b6000600b60006101000a81548160ff02191690831515021790555056fea265627a7a72305820779f1bc58744133567ca79c49b2311c281ac1eb6f6a7e215f11b98d80d09235a64736f6c634300050a0032';

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
	    	txHash = transactionHash;
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
	console.log(txHash)
	$.ajax({
		  type: 'POST',
		  url: '../htmls/regist.php',
		  data: {
		    'name' : $('#name').val(),
		    'tel' : $('#tel').val(),
		    'address' : $('#address').val(),
		    'mail' : $('#mail').val(),
		    'eth' : $('#eth').val(),
		    'password' : $('#password').val(),
		    'contractAddress' : txHash
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
