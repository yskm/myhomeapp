int LED_OUT = 13;
int TEMP_IN = A0;
int TEMP_OUT = 8;

char input[10];
char temp[10];

void setup() {
  Serial.begin(9600);
  pinMode(LED_OUT, OUTPUT);
  pinMode(TEMP_OUT, OUTPUT);
  digitalWrite(TEMP_OUT, HIGH);
}

void loop() {
  delay(1000);

  char *_temp = getTemp();
  if (strcmp(_temp, temp) != 0) {
    strcpy(temp, _temp);
    sendJSON();
  }

  if (!Serial.available()) {
    return;
  }

  memset(input, 0, 10);
  int i = 0;
  char c;
  while (Serial.available()) {
    c = Serial.read();
    input[i] = c;
    i++;
  }
  input[i] = 0;

  if (strcmp(input, "on") == 0) {
    digitalWrite(LED_OUT, HIGH);
  } else if (strcmp(input, "off") == 0) {
    digitalWrite(LED_OUT, LOW);
  }
}

char *getTemp() {
  float float_temp = analogRead(TEMP_IN)*500.0/1024.0-60.0;
  char char_temp[10];
  char *char_temp_p = char_temp;
  sprintf(char_temp_p, "%d.%d", (int)float_temp, (int)(float_temp*10)%10);
  return char_temp_p;
}

void sendJSON() {
  char json[100];
  sprintf(json, "{\"temp\":\"%s\"}", temp);
  Serial.print(json);
}
