#include <Web3.h>
#include <WiFi.h> //Wifi library
#include <Contract.h>
#include <time.h>
#include "esp_wpa2.h" //wpa2 library for connections to Enterprise networks
#define EAP_IDENTITY "K8802r0Q@tsukuba.f.eduroam.jp" //if connecting from another corporation, use identity@organisation.domain in Eduroam 
#define EAP_PASSWORD "gw7duKQx8]1r" //your Eduroam password
//芳賀シンヤのINFURAの情報
#define INFURA_HOST "rinkeby.infura.io"
#define INFURA_PATH  "/v3/672082360bbc4bb0a584be860d9e1f85"
#define MY_ADDRESS "0x61666605cE04f4D5e845165692D8a71C026d9a34"
#define CONTRACT_ADDRESS "0x200Ed6bc284F778E6c4ad3A22dE0ddc5b2a8239a"
#define ETHERSCAN_TX "https://rinkeby.etherscan.io/tx/"
//________________
//const char* ssid = "eduroam"; // Eduroam SSID
//________________
const char ssid[] = "logitec2nd49";//_____追加
const char passwd[] = "1C3HCA519832B";//_____追加
const char* host = "arduino.php5.sk"; //external server domain for HTTP connection after authentification
int counter = 0;

//芳賀シンヤの秘密鍵
const char *PRIVATE_KEY = "2D3E4CC5AC1A653FF47A97922B6ED91BC8E42428CF5FE5637506FB20F8635DEA";

Web3 web3(INFURA_HOST, INFURA_PATH);

void ConnectWiFi();
void set_used_water();
bool timer();

volatile double waterFlow;
volatile double preWaterFlow;

void setup() {
  Serial.begin(9600);
  waterFlow = 0;
  attachInterrupt(2, pulse, RISING);  //DIGITAL Pin 2: Interrupt 0
  delay(1000);
  
  ConnectWiFi();

  configTime(9 * 3600L, 0, "ntp.nict.jp");
  
}


void loop(){
  
 if(timer()){
    Serial.print("waterFlow: ");
    Serial.print(waterFlow);
    Serial.println(" L");
    set_used_water(waterFlow);
 }
}

void ConnectWiFi(){
    Serial.println("");
    Serial.print("Connecting to network: ");
    Serial.println(ssid);
//_____________________
//    WiFi.disconnect(true);  //disconnect form wifi to set new wifi connection
//    WiFi.mode(WIFI_STA); //init wifi mode
//    esp_wifi_sta_wpa2_ent_set_identity((uint8_t *)EAP_IDENTITY, strlen(EAP_IDENTITY)); //provide identity
//    esp_wifi_sta_wpa2_ent_set_username((uint8_t *)EAP_IDENTITY, strlen(EAP_IDENTITY)); //provide username --> identity and username is same
//    esp_wifi_sta_wpa2_ent_set_password((uint8_t *)EAP_PASSWORD, strlen(EAP_PASSWORD)); //provide password
//    esp_wpa2_config_t config = WPA2_CONFIG_INIT_DEFAULT(); //set config settings to default
//    esp_wifi_sta_wpa2_ent_enable(&config); //set config settings to enable function
//    WiFi.begin(ssid); //connect to wifi
//______________________
    WiFi.begin(ssid, passwd); //____________追加
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
        counter++;
        if(counter>=60){ //after 30 seconds timeout - reset board
        ESP.restart();
        }
    }
    
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address set: "); 
    Serial.println(WiFi.localIP()); //print LAN IP
    Serial.println("");
}

void set_used_water(double _waterFlow){
//  Serial.println("Sending Transaction...");
//  Contract contract(&web3, "");
//  contract.SetPrivateKey(PRIVATE_KEY);
//  string addr = MY_ADDRESS;
//  uint32_t nonceVal = (uint32_t)web3.EthGetTransactionCount(&addr); //obtain the next nonce
//  uint256_t weiValue = 10; //send 0.25 eth
//  unsigned long long gasPriceVal = 1000000000ULL;
//  uint32_t  gasLimitVal = 90000;
//  string emptyString = "";
//  string toAddress = "0xcE192a3cA53853f49c003d7ddcc63fDfA4c8adC6";
//  string result = contract.SendTransaction(nonceVal, gasPriceVal, gasLimitVal, &toAddress, &weiValue, &emptyString);
//  Serial.println(result.c_str());
//
//  string transactionHash = web3.getString(&result);
//  Serial.println("TX on Etherscan:");
//  Serial.print(ETHERSCAN_TX);
//  Serial.println(transactionHash.c_str());
//  Serial.println("---トランザクションの送信に成功---");
//  Serial.println("");


  Serial.println("Sending Transaction...");
//  int nowWaterFlow = (int)_waterFlow - (int)preWaterFlow;//今月の使用量を整数で計算
  int nowWaterFlow = (int)_waterFlow * 100 - (int)preWaterFlow * 100;//デモ用

  Contract contract(&web3,CONTRACT_ADDRESS);
  contract.SetPrivateKey(PRIVATE_KEY);
  string addr = MY_ADDRESS;
  uint32_t nonceVal = (uint32_t)web3.EthGetTransactionCount(&addr);
  unsigned long long gasPriceVal = 1000000000ULL;
  uint32_t gasLimitVal = 3000000;
  uint8_t dataStr[100];
  memset(dataStr, 0, 100);
  string toStr = CONTRACT_ADDRESS;
  string valueStr = "0x00";
//  string p = contract.SetupContractData("set_used_water(uint256)", nowWaterFlow);
string p = contract.SetupContractData("set_used_water(uint256)", (int)_waterFlow);
  string result = contract.SendTransaction(nonceVal, gasPriceVal, gasLimitVal, &toStr, &valueStr, &p);

  Serial.println(result.c_str());
  string transactionHash = web3.getString(&result);
  if(transactionHash == "") {
    Serial.println("error");//エラー処理
  } else {
  preWaterFlow = _waterFlow;//水量を記録
  Serial.println("TX on Etherscan:");
  Serial.print(ETHERSCAN_TX);
  Serial.println(transactionHash.c_str());
  Serial.println("---トランザクションの送信に成功---");
  }
  Serial.println("");
//__________________________
}


//10秒前が同じ月かどうか判断する=>月が変わった時に
bool timer(){

//デモ用_______________
//____________________
}

void pulse()   //measure the quantity of square wave
{
  waterFlow += 1.0 / 450.0;
}
