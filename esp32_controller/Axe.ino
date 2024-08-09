// ======================= Acknowledgments =================================
// - The shake detection functionality seen in the ShakeDetection() helper
//   function is adapted from the example code in the MPU6050 library
//   (shake.ino) by maarten-pennings
//    * https://github.com/maarten-pennings/MPU6050
//
// - TODO -- more

#include <Wire.h>
#include <mpu6050.h>
#include <PushButton.h>
#include <BleCombo.h>
#include <nvs_flash.h>

#define LED_BUILTIN 2

const int SW_pin = 16;
const int X_pin = 34;
const int Y_pin = 36;
const int vib_pin = 25;

PushButton SW_button(SW_pin);
MPU6050 mpu6050;

// ======================= Function Declarations =================================

// Monitors the MPU6050 sensor for shakes.
// If a shake is detected, it triggers visual feedback by blinking the internal LED
// and sends a short vibration to simulate impact, as if the axe controller is hitting something.
//
// Parameters:
//   mpu6050: An instance of the MPU6050 class representing the sensor.
void ShakeDetection(MPU6050 mpu6050);

// Detects joystick movements and button presses.
// Prints the direction and whether the button was pressed or not to the serial monitor.
void JoystickDetection();

// Erases all connected devices from the controller
void resetBLE();

void setup() {
  Serial.begin(9600);
  Wire.begin();

  resetBLE();

  Keyboard.begin();

  int error = mpu6050.begin();

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(vib_pin, OUTPUT);
  pinMode(SW_pin, INPUT_PULLUP);

  SW_button.setActiveLogic(LOW);
  digitalWrite(LED_BUILTIN, LOW);
}

void loop() {
  SW_button.update();
  if (Keyboard.isConnected()) {
    ShakeDetection(mpu6050);
    JoystickDetection();
  }

}

void ShakeDetection(MPU6050 mpu6050) {
  MPU6050_t data = mpu6050.get();
  if (data.accel.error == 0) {
    float magnitude = sqrt(data.accel.x * data.accel.x + data.accel.y * data.accel.y + data.accel.z * data.accel.z);

    if (magnitude > 2.45 * MPU6050_GRAVITY_EARTH) {
      digitalWrite(LED_BUILTIN, HIGH);
      Serial.println("Shaken");
      digitalWrite(vib_pin, HIGH);
      delay(300);
      digitalWrite(vib_pin, LOW);
    } else {
      digitalWrite(vib_pin, LOW);
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
}

void JoystickDetection() {
  if (SW_button.isClicked()) {
    //Serial.println("Pressed!");
    Keyboard.write('P');
    delay(400);
  }

  if (analogRead(X_pin) > 3800) {
    //Serial.println("up!");
    Keyboard.write('W');
    delay(400);
  }
  if (analogRead(X_pin) < 300) {
    //Serial.println("down!");
    Keyboard.write('S');
    delay(400);
  }

  if (analogRead(Y_pin) > 3800) {
    //Serial.println("right!");
    Keyboard.write('D');
    delay(400);
  }
  if (analogRead(Y_pin) < 300) {
    //Serial.println("left!");
    Keyboard.write('A');
    delay(400);
  }

  // B as build
}

void resetBLE() {
  esp_err_t ret = nvs_flash_init();
  if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
    nvs_flash_erase();
    ret = nvs_flash_init();
  }
  if (ret != ESP_OK) {
    Serial.println("Failed to initialize NVS");
    return;
  }

  // Erase pairing information
  ret = nvs_flash_erase();
  if (ret != ESP_OK) {
    Serial.println("Failed to erase NVS");
  } else {
    Serial.println("NVS erased, all bonding information cleared");
  }
}