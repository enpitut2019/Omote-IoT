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

const char* ssid = "eduroam"; // Eduroam SSID
const char* host = "arduino.php5.sk"; //external server domain for HTTP connection after authentification
int counter = 0;

//芳賀シンヤの秘密鍵
const char *PRIVATE_KEY = "2D3E4CC5AC1A653FF47A97922B6ED91BC8E42428CF5FE5637506FB20F8635DEA";

Web3 web3(INFURA_HOST, INFURA_PATH);

void ConnectWiFi();
void set_used_water();
bool timer();

volatile double waterFlow;

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
     Serial.print("waterFlow:");
     Serial.print(waterFlow);
     Serial.println("   L");
     set_used_water(waterFlow);
     delay(500);
 }
}

void ConnectWiFi(int amountof_water){
    Serial.println();
    Serial.print("Connecting to network: ");
    Serial.println(ssid);
    WiFi.disconnect(true);  //disconnect form wifi to set new wifi connection
    WiFi.mode(WIFI_STA); //init wifi mode
    esp_wifi_sta_wpa2_ent_set_identity((uint8_t *)EAP_IDENTITY, strlen(EAP_IDENTITY)); //provide identity
    esp_wifi_sta_wpa2_ent_set_username((uint8_t *)EAP_IDENTITY, strlen(EAP_IDENTITY)); //provide username --> identity and username is same
    esp_wifi_sta_wpa2_ent_set_password((uint8_t *)EAP_PASSWORD, strlen(EAP_PASSWORD)); //provide password
    esp_wpa2_config_t config = WPA2_CONFIG_INIT_DEFAULT(); //set config settings to default
    esp_wifi_sta_wpa2_ent_enable(&config); //set config settings to enable function
    WiFi.begin(ssid); //connect to wifi
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
}

void set_used_water(double _waterFlow){
  Contract contract(&web3,CONTRACT_ADDRESS);
  contract.SetPrivateKey(PRIVATE_KEY);
  string addr = MY_ADDRESS;

  uint32_t nonceVal = (uint32_t)web3.EthGetTransactionCount(&addr);
  uint32_t gasPriceVal = 141006540;
  uint32_t gasLimitVal = 3000000;
  uint8_t dataStr[100];
  memset(dataStr, 0, 100);
  string toStr = CONTRACT_ADDRESS;
  string valueStr = "0x00";
  string p = contract.SetupContractData("set_used_water(uint256)", _waterFlow);

  string result = contract.SendTransaction(nonceVal, gasPriceVal, gasLimitVal, &toStr, &valueStr, &p);

  Serial.println(result.c_str());

  string transactionHash = web3.getString(&result);
  Serial.println("TX on Etherscan:");
  Serial.print(ETHERSCAN_TX);
  Serial.println(transactionHash.c_str());
}


//10秒前が同じ月かどうか判断する=>月が変わった時に
bool timer(){
  // 曜日文字列配列
  static const char *pszWDay[] = {"Sun","Mon","Tue","Wed","Thu","Fri","Sat"};

  // 現在時刻の取得
  time_t timeNow = time(NULL);
  struct tm* tmNow = localtime(&timeNow);

  
  char past_Date[32];
  char present_Date[32];
  sprintf(present_Date, "%04d/%02d",
          tmNow->tm_year+1900,
          tmNow->tm_mon+1);


  // 時刻
  char szTime1[32];
  char szTime2[32];
  sprintf( szTime1, "%02d:%02d",
          tmNow->tm_hour,
          tmNow->tm_min
          );


  Serial.print(szTime1);

  char *s1 = szTime1;
  char *s2 = szTime2;

  if(strcmp(s1,s2) == 0){
      return true;
    }else{
      return false;
    }
    
  szTime2[32] = szTime1[32];
  //past_Date[32] = present_Date[32];
  delay(10000);
}

void pulse()   //measure the quantity of square wave
{
  waterFlow += 1.0 / 450.0;
}
