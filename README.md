# Blockchainを用いた水道管理アプリ   
チーム：Omote-IoT

# エレベーターピッチ
水道局は利用者の水道料金滞納に悩まされています。その事例の一つに料金滞納の最高額が3000万円を超えてしまったという事例もあります。それは、引き落とし口座の残高が不足している場合や口座が凍結されている場合には、水道局がお金を回収することができなくなってしまうことにあります。

そこで、スマートコントラクトのプログラムの信頼性によって、確実に料金を支払わせることを可能にし、滞納があった場合にはすぐに水道を停止させます。また仮想通貨を利用することで銀行を介さずに支払いができることによって、それらの問題を解決しようとしています。

# メンバー
- 木村 圭吾
- 畑 彰吾
- 芳賀 慎也 

# デプロイ先URL
https://nameless-oasis-61053.herokuapp.com/?

#アプリケーションの使い方
まずこのアプリケーションはMETAMASKと連携しているため、ユーザ側でMETAMASKのインストールをする必要があります。
インストールされていない場合は本アプリケーションのトップページからインストールしてください。

アプリケーションユーザはまずは水道料金引き落としのため、自身のETHERをデポジットします。金額入力欄に入力し、送金ボタンでデポジットしてください。
水道の使用量を決定するため、使用開始ボタン(start)をクリックし任意のタイミングで(stop)を押してください。使用量が確定します。
確定した使用量から料金が計算され、デポジットから引き落とされます。残高が不足している場合は水道が止まることになるので、水道の開始ボタンは押せなくなります。
未払いの金額はデポジットをチャージしたのち支払いが可能になります。
使用量をグラフで見ることが出来ます。
