int LED = 13;

char input[10];

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {

  if (!Serial.available()) {
    return delay(1000);
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
  Serial.print(input);

  if (strcmp(input, "on") == 0) {
    Serial.print("on");
    digitalWrite(LED, HIGH);
  } else if (strcmp(input, "off") == 0) {
    Serial.print("off");
    digitalWrite(LED, LOW);
  }
}

