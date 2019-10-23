
#include <WiFi.h> //Wifi library
#include "esp_wpa2.h" //wpa2 library for connections to Enterprise networks
#define EAP_IDENTITY "K8802r0Q@tsukuba.f.eduroam.jp" //if connecting from another corporation, use identity@organisation.domain in Eduroam 
#define EAP_PASSWORD "gw7duKQx8]1r" //your Eduroam password
const char* ssid = "eduroam"; // Eduroam SSID
const char* host = "arduino.php5.sk"; //external server domain for HTTP connection after authentification
int counter = 0;

void ConnectWiFi();
void set_used_water();

void setup() {
  Serial.begin(115200);
  delay(10);
  
  ConnectWiFi();
}
void loop(){

}

void ConnectWiFi(){
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

void set_used_water(){
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

  string p = contract.SetupContractData("set_used_water(uint256)",60);

  string result = contract.SendTransaction(nonceVal, gasPriceVal, gasLimitVal, &toStr, &valueStr, &p);

  Serial.println(result.c_str());

  string transactionHash = web3.getString(&result);
  Serial.println("TX on Etherscan:");
  Serial.print(ETHERSCAN_TX);
  Serial.println(transactionHash.c_str());
  digitalWrite(2,LOW);
  delay(1000);
  digitalWrite(2,HIGH);
  delay(100);
}
