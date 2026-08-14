export type GroveCatalogueInterface = "digital" | "analog" | "i2c" | "uart"

export interface GroveCatalogueEntry {
  title: string
  category: string
  sourceUrl: string
  interfaceKind: GroveCatalogueInterface
  directory: string
  componentName: string
  detailed: boolean
}

/**
 * Grove entries collected from Seeed's official Grove guides and product sitemap.
 * Every entry maps to one board directory with a TSX circuit and two snapshots.
 */
export const groveCatalogueManifest: GroveCatalogueEntry[] = [
  {
    "title": "Grove - Button v1.0",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Button/",
    "interfaceKind": "digital",
    "directory": "Grove-Button",
    "componentName": "GroveButton",
    "detailed": true
  },
  {
    "title": "Grove - Buzzer v1.1b",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Buzzer/",
    "interfaceKind": "digital",
    "directory": "Grove-Buzzer",
    "componentName": "GroveBuzzer",
    "detailed": true
  },
  {
    "title": "Grove - Capacitive Moisture Sensor (Corrosion Resistant)",
    "category": "Moisture",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Capacitive_Moisture_Sensor-Corrosion-Resistant/",
    "interfaceKind": "analog",
    "directory": "Grove-Capacitive-Moisture",
    "componentName": "GroveCapacitiveMoisture",
    "detailed": true
  },
  {
    "title": "Grove - Temperature & Humidity Sensor DHT20 v2.1",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DH20/",
    "interfaceKind": "i2c",
    "directory": "Grove-DHT20",
    "componentName": "GroveDht20",
    "detailed": true
  },
  {
    "title": "Grove - Digital PIR Motion Sensor v1.0",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Digital-PIR-Sensor/",
    "interfaceKind": "digital",
    "directory": "Grove-Digital-PIR",
    "componentName": "GroveDigitalPir",
    "detailed": true
  },
  {
    "title": "Grove - LCD RGB Backlight v5.0",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/",
    "interfaceKind": "i2c",
    "directory": "Grove-LCD-RGB-Backlight",
    "componentName": "GroveLcdRgbBacklight",
    "detailed": true
  },
  {
    "title": "Grove - Light Sensor v1.2",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Light_Sensor/",
    "interfaceKind": "analog",
    "directory": "Grove-Light-Sensor",
    "componentName": "GroveLightSensor",
    "detailed": true
  },
  {
    "title": "Grove - OLED Display 0.96 inch (SSD1315) v1.0",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-OLED-Display-0.96-SSD1315/",
    "interfaceKind": "i2c",
    "directory": "Grove-OLED-SSD1315",
    "componentName": "GroveOledSsd1315",
    "detailed": true
  },
  {
    "title": "Grove - Relay v1.2",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Relay/",
    "interfaceKind": "digital",
    "directory": "Grove-Relay",
    "componentName": "GroveRelay",
    "detailed": true
  },
  {
    "title": "Grove - RGB LED Stick (10 WS2813 Mini)",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/",
    "interfaceKind": "digital",
    "directory": "Grove-RGB-LED-Stick",
    "componentName": "GroveRgbLedStick",
    "detailed": true
  },
  {
    "title": "Grove - Rotary Angle Sensor v1.2",
    "category": "Touch",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/",
    "interfaceKind": "analog",
    "directory": "Grove-Rotary-Angle-Sensor",
    "componentName": "GroveRotaryAngleSensor",
    "detailed": true
  },
  {
    "title": "Grove - Ultrasonic Ranger v2.0",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/",
    "interfaceKind": "digital",
    "directory": "Grove-Ultrasonic-Ranger",
    "componentName": "GroveUltrasonicRanger",
    "detailed": true
  },
  {
    "title": "Grove - AHT20 I2C Industrial Grade Temperature&Humidity Sensor",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor",
    "componentName": "GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor",
    "detailed": false
  },
  {
    "title": "Grove - Temp and Humi Sensor(SHT31)",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveTempAndHumiSensorSHT31",
    "componentName": "GroveTempAndHumiSensorSHT31",
    "detailed": false
  },
  {
    "title": "Grove - I2C High Accuracy Temp&Humi Sensor(SHT35)",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CHighAccuracyTempHumiSensorSHT35",
    "componentName": "GroveI2CHighAccuracyTempHumiSensorSHT35",
    "detailed": false
  },
  {
    "title": "Grove - Temperature&Humidity Sensor Pro(DHT22)",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorProDHT22",
    "componentName": "GroveTemperatureHumiditySensorProDHT22",
    "detailed": false
  },
  {
    "title": "Grove - Temperature&Humidity Sensor (DHT11)",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorDHT11",
    "componentName": "GroveTemperatureHumiditySensorDHT11",
    "detailed": false
  },
  {
    "title": "Grove - Temperature&Humidity Sensor(DHT20)",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorDHT20",
    "componentName": "GroveTemperatureHumiditySensorDHT20",
    "detailed": false
  },
  {
    "title": "Grove - Temperature&Humidity Sensor (High-Accuracy &Mini) v1.0",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorHighAccuracyMiniV10",
    "componentName": "GroveTemperatureHumiditySensorHighAccuracyMiniV10",
    "detailed": false
  },
  {
    "title": "Grove - Temperature & Humidity Sensor",
    "category": "Temp & Humi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensor",
    "componentName": "GroveTemperatureHumiditySensor",
    "detailed": false
  },
  {
    "title": "Grove - 1-Wire Thermocouple Amplifier(MAX31850K)",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "Grove1WireThermocoupleAmplifierMAX31850K",
    "componentName": "Grove1WireThermocoupleAmplifierMAX31850K",
    "detailed": false
  },
  {
    "title": "Grove - I2C Thermocouple Amplifier (MCP9600)",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CThermocoupleAmplifierMCP9600",
    "componentName": "GroveI2CThermocoupleAmplifierMCP9600",
    "detailed": false
  },
  {
    "title": "One Wire Temperature Sensor DS18B20",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveOneWireTemperatureSensorDS18B20",
    "componentName": "GroveOneWireTemperatureSensorDS18B20",
    "detailed": false
  },
  {
    "title": "Grove - High Temperature Sensor",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveHighTemperatureSensor",
    "componentName": "GroveHighTemperatureSensor",
    "detailed": false
  },
  {
    "title": "Grove - Thermal Imaging Camera IR-Array MLX90641",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraIRArrayMLX90641",
    "componentName": "GroveThermalImagingCameraIRArrayMLX90641",
    "detailed": false
  },
  {
    "title": "Grove - Digital Infrared Temperature Sensor",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveDigitalInfraredTemperatureSensor",
    "componentName": "GroveDigitalInfraredTemperatureSensor",
    "detailed": false
  },
  {
    "title": "Grove - Infrared Temperature Sensor",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveInfraredTemperatureSensor",
    "componentName": "GroveInfraredTemperatureSensor",
    "detailed": false
  },
  {
    "title": "Grove - Infrared Temperature Sensor Array(AMG8833)",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveInfraredTemperatureSensorArrayAMG8833",
    "componentName": "GroveInfraredTemperatureSensorArrayAMG8833",
    "detailed": false
  },
  {
    "title": "Grove-Temperature_Sensor",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveTemperatureSensor",
    "componentName": "GroveTemperatureSensor",
    "detailed": false
  },
  {
    "title": "Grove - Temperature Sensor V1.2",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureSensorV12",
    "componentName": "GroveTemperatureSensorV12",
    "detailed": false
  },
  {
    "title": "Grove - I2C High Accuracy Temperature Sensor(MCP9808)",
    "category": "Temperature",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CHighAccuracyTemperatureSensorMCP9808",
    "componentName": "GroveI2CHighAccuracyTemperatureSensorMCP9808",
    "detailed": false
  },
  {
    "title": "Grove SEN5X All in One",
    "category": "Multiple in one",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveSEN5XAllInOne",
    "componentName": "GroveSEN5XAllInOne",
    "detailed": false
  },
  {
    "title": "Grove - Temperature Humidity Pressure Gas Sensor(BME680)",
    "category": "Multiple in one",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveTemperatureHumidityPressureGasSensorBME680",
    "componentName": "GroveTemperatureHumidityPressureGasSensorBME680",
    "detailed": false
  },
  {
    "title": "Grove - CO2 & Temperature & Humidity Sensor (SCD41)",
    "category": "Multiple in one",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveCO2TemperatureHumiditySensorSCD41",
    "componentName": "GroveCO2TemperatureHumiditySensorSCD41",
    "detailed": false
  },
  {
    "title": "Grove - CO2 & Temperature & Humidity Sensor (SCD30)",
    "category": "Multiple in one",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveCO2TemperatureHumiditySensorSCD30",
    "componentName": "GroveCO2TemperatureHumiditySensorSCD30",
    "detailed": false
  },
  {
    "title": "Grove - Light Gesture Color Proximity Sensor (TMG39931)",
    "category": "Multiple in one",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveLightGestureColorProximitySensorTMG39931",
    "componentName": "GroveLightGestureColorProximitySensorTMG39931",
    "detailed": false
  },
  {
    "title": "Grove Vision AI Module",
    "category": "AI-powered",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "uart",
    "directory": "GroveVisionAIModule",
    "componentName": "GroveVisionAIModule",
    "detailed": false
  },
  {
    "title": "Grove Vision AI Module V2",
    "category": "AI-powered",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "uart",
    "directory": "GroveVisionAIModuleV2",
    "componentName": "GroveVisionAIModuleV2",
    "detailed": false
  },
  {
    "title": "Grove Smart IR Gesture Sensor (PAJ7660)",
    "category": "AI-powered",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSmartIRGestureSensorPAJ7660",
    "componentName": "GroveSmartIRGestureSensorPAJ7660",
    "detailed": false
  },
  {
    "title": "Grove - Moisture Sensor",
    "category": "Soli Humidity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveMoistureSensor",
    "componentName": "GroveMoistureSensor",
    "detailed": false
  },
  {
    "title": "Grove - Ultrasonic Ranger",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveUltrasonicRanger2",
    "componentName": "GroveUltrasonicRanger2",
    "detailed": false
  },
  {
    "title": "Grove - IR Distance Interrupter v1.2",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveIRDistanceInterrupterV12",
    "componentName": "GroveIRDistanceInterrupterV12",
    "detailed": false
  },
  {
    "title": "Grove - TF Mini LiDAR",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveTFMiniLiDAR",
    "componentName": "GroveTFMiniLiDAR",
    "detailed": false
  },
  {
    "title": "Grove-Doppler-Radar",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveDopplerRadar",
    "componentName": "GroveDopplerRadar",
    "detailed": false
  },
  {
    "title": "Grove - Time of Flight Distance Sensor VL53L0X",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveTimeOfFlightDistanceSensorVL53L0X",
    "componentName": "GroveTimeOfFlightDistanceSensorVL53L0X",
    "detailed": false
  },
  {
    "title": "Grove - 80cm Infrared Proximity Sensor",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove80cmInfraredProximitySensor",
    "componentName": "Grove80cmInfraredProximitySensor",
    "detailed": false
  },
  {
    "title": "Grove - Gesture V1.0",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveGestureV10",
    "componentName": "GroveGestureV10",
    "detailed": false
  },
  {
    "title": "Grove - Adjustable PIR Motion Sensor",
    "category": "Proximity",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "uart",
    "directory": "GroveAdjustablePIRMotionSensor",
    "componentName": "GroveAdjustablePIRMotionSensor",
    "detailed": false
  },
  {
    "title": "Grove - Laser PM2.5 Sensor (HM3301)",
    "category": "Air Quality",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveLaserPM25SensorHM3301",
    "componentName": "GroveLaserPM25SensorHM3301",
    "detailed": false
  },
  {
    "title": "Grove - Dust Sensor",
    "category": "Air Quality",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveDustSensor",
    "componentName": "GroveDustSensor",
    "detailed": false
  },
  {
    "title": "Grove - Air Quality Sensor v1.3",
    "category": "Air Quality",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveAirQualitySensorV13",
    "componentName": "GroveAirQualitySensorV13",
    "detailed": false
  },
  {
    "title": "Grove - Formaldehyde sensor",
    "category": "Air Quality",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveFormaldehydeSensor",
    "componentName": "GroveFormaldehydeSensor",
    "detailed": false
  },
  {
    "title": "Grove - Gas Sensor V2(Multichannel)",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveGasSensorV2Multichannel",
    "componentName": "GroveGasSensorV2Multichannel",
    "detailed": false
  },
  {
    "title": "Grove - Gas Sensor module",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveGasSensorModule",
    "componentName": "GroveGasSensorModule",
    "detailed": false
  },
  {
    "title": "Grove - Gas Sensor(O₂)",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveGasSensorO",
    "componentName": "GroveGasSensorO",
    "detailed": false
  },
  {
    "title": "Grove - Gas O₂ Sensor(MIX8410)",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveGasOSensorMIX8410",
    "componentName": "GroveGasOSensorMIX8410",
    "detailed": false
  },
  {
    "title": "Grove - Oxygen Sensor Pro(GGC2330-O2)",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveOxygenSensorProGGC2330O2",
    "componentName": "GroveOxygenSensorProGGC2330O2",
    "detailed": false
  },
  {
    "title": "Grove - Alcohol Sensor",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveAlcoholSensor",
    "componentName": "GroveAlcoholSensor",
    "detailed": false
  },
  {
    "title": "Grove - CO2 Sensor",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveCO2Sensor",
    "componentName": "GroveCO2Sensor",
    "detailed": false
  },
  {
    "title": "Grove -Smart Air Quality Sensor (SGP41)",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveSmartAirQualitySensorSGP41",
    "componentName": "GroveSmartAirQualitySensorSGP41",
    "detailed": false
  },
  {
    "title": "Grove-VOC and eCO2 Gas Sensor(SGP30)",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveVOCAndECO2GasSensorSGP30",
    "componentName": "GroveVOCAndECO2GasSensorSGP30",
    "detailed": false
  },
  {
    "title": "Grove - VOC Gas Sensor (SGP40)",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveVOCGasSensorSGP40",
    "componentName": "GroveVOCGasSensorSGP40",
    "detailed": false
  },
  {
    "title": "Grove - HCHO Sensor",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveHCHOSensor",
    "componentName": "GroveHCHOSensor",
    "detailed": false
  },
  {
    "title": "Grove - Multichannel Gas Sensor",
    "category": "Gas",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveMultichannelGasSensor",
    "componentName": "GroveMultichannelGasSensor",
    "detailed": false
  },
  {
    "title": "Grove - Barometer (High-Accuracy)",
    "category": "Barometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveBarometerHighAccuracy",
    "componentName": "GroveBarometerHighAccuracy",
    "detailed": false
  },
  {
    "title": "Grove - Barometer Sensor(BME280)",
    "category": "Barometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveBarometerSensorBME280",
    "componentName": "GroveBarometerSensorBME280",
    "detailed": false
  },
  {
    "title": "Grove - Barometer Sensor (BMP280)",
    "category": "Barometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveBarometerSensorBMP280",
    "componentName": "GroveBarometerSensorBMP280",
    "detailed": false
  },
  {
    "title": "Grove - High Precision Barometric Pressure Sensor DPS310",
    "category": "Barometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveHighPrecisionBarometricPressureSensorDPS310",
    "componentName": "GroveHighPrecisionBarometricPressureSensorDPS310",
    "detailed": false
  },
  {
    "title": "Grove - Integrated Pressure Sensor Kit",
    "category": "Barometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveIntegratedPressureSensorKit",
    "componentName": "GroveIntegratedPressureSensorKit",
    "detailed": false
  },
  {
    "title": "Grove - D7S Vibration Sensor",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveD7SVibrationSensor",
    "componentName": "GroveD7SVibrationSensor",
    "detailed": false
  },
  {
    "title": "Grove - 3-Axis Digital Accelerometer",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove3AxisDigitalAccelerometer",
    "componentName": "Grove3AxisDigitalAccelerometer",
    "detailed": false
  },
  {
    "title": "Grove - 3-Axis Digital Accelerometer (LIS3DHTR)",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove3AxisDigitalAccelerometerLIS3DHTR",
    "componentName": "Grove3AxisDigitalAccelerometerLIS3DHTR",
    "detailed": false
  },
  {
    "title": "Grove - 3-Axis Analog Accelerometer",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove3AxisAnalogAccelerometer",
    "componentName": "Grove3AxisAnalogAccelerometer",
    "detailed": false
  },
  {
    "title": "Grove - 3-Axis Digitial Compass v2.0",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "Grove3AxisDigitialCompassV20",
    "componentName": "Grove3AxisDigitialCompassV20",
    "detailed": false
  },
  {
    "title": "Grove - 3 Axis Digital Accelerometer±16g Ultra-low Power (BMA400)",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400",
    "componentName": "Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400",
    "detailed": false
  },
  {
    "title": "Grove - 6-Axis Accelerometer&Gyroscope",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove6AxisAccelerometerGyroscope",
    "componentName": "Grove6AxisAccelerometerGyroscope",
    "detailed": false
  },
  {
    "title": "Grove - 6-Axis Accelerometer&Gyroscope(BMI088)",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove6AxisAccelerometerGyroscopeBMI088",
    "componentName": "Grove6AxisAccelerometerGyroscopeBMI088",
    "detailed": false
  },
  {
    "title": "Grove - IMU 9DOF(lcm20600+AK09918)",
    "category": "Accelerometer",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveIMU9DOFLcm20600AK09918",
    "componentName": "GroveIMU9DOFLcm20600AK09918",
    "detailed": false
  },
  {
    "title": "Grove Lightning Sensor AS3935",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveLightningSensorAS3935",
    "componentName": "GroveLightningSensorAS3935",
    "detailed": false
  },
  {
    "title": "Grove - Digital Light Sensor",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveDigitalLightSensor",
    "componentName": "GroveDigitalLightSensor",
    "detailed": false
  },
  {
    "title": "Grove - Light Sensor",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveLightSensor2",
    "componentName": "GroveLightSensor2",
    "detailed": false
  },
  {
    "title": "Grove - Sunlight Sensor",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSunlightSensor",
    "componentName": "GroveSunlightSensor",
    "detailed": false
  },
  {
    "title": "Grove - UV Sensor",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveUVSensor",
    "componentName": "GroveUVSensor",
    "detailed": false
  },
  {
    "title": "Grove - Infrared Receiver",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveInfraredReceiver",
    "componentName": "GroveInfraredReceiver",
    "detailed": false
  },
  {
    "title": "Grove - Line Finder V1.1",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveLineFinderV11",
    "componentName": "GroveLineFinderV11",
    "detailed": false
  },
  {
    "title": "Grove - Flame Sensor",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveFlameSensor",
    "componentName": "GroveFlameSensor",
    "detailed": false
  },
  {
    "title": "Grove - Infrared Reflective Sensor",
    "category": "Light",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveInfraredReflectiveSensor",
    "componentName": "GroveInfraredReflectiveSensor",
    "detailed": false
  },
  {
    "title": "Grove - Finger-clip Heart Rate Sensor",
    "category": "Biometric",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveFingerClipHeartRateSensor",
    "componentName": "GroveFingerClipHeartRateSensor",
    "detailed": false
  },
  {
    "title": "Grove - EMG Detector",
    "category": "Biometric",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveEMGDetector",
    "componentName": "GroveEMGDetector",
    "detailed": false
  },
  {
    "title": "Grove - Ear-clip Heart Rate Sensor",
    "category": "Biometric",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveEarClipHeartRateSensor",
    "componentName": "GroveEarClipHeartRateSensor",
    "detailed": false
  },
  {
    "title": "Grove - GSR Sensor",
    "category": "Biometric",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveGSRSensor",
    "componentName": "GroveGSRSensor",
    "detailed": false
  },
  {
    "title": "Grove - Sound Sensor",
    "category": "Sound",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSoundSensor",
    "componentName": "GroveSoundSensor",
    "detailed": false
  },
  {
    "title": "Grove - Loudness Sensor",
    "category": "Sound",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveLoudnessSensor",
    "componentName": "GroveLoudnessSensor",
    "detailed": false
  },
  {
    "title": "Grove - Analog Microphone",
    "category": "Sound",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveAnalogMicrophone",
    "componentName": "GroveAnalogMicrophone",
    "detailed": false
  },
  {
    "title": "Grove - Recorder v2.0",
    "category": "Sound",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveRecorderV20",
    "componentName": "GroveRecorderV20",
    "detailed": false
  },
  {
    "title": "Grove Offline Voice Recognition",
    "category": "Sound",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "uart",
    "directory": "GroveOfflineVoiceRecognition",
    "componentName": "GroveOfflineVoiceRecognition",
    "detailed": false
  },
  {
    "title": "Grove - Touch Sensor",
    "category": "Touch",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTouchSensor",
    "componentName": "GroveTouchSensor",
    "detailed": false
  },
  {
    "title": "Grove - Rotary Angle Sensor",
    "category": "Touch",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveRotaryAngleSensor2",
    "componentName": "GroveRotaryAngleSensor2",
    "detailed": false
  },
  {
    "title": "Grove - Grove - Round Force Sensor FSR402",
    "category": "Touch",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveGroveRoundForceSensorFSR402",
    "componentName": "GroveGroveRoundForceSensorFSR402",
    "detailed": false
  },
  {
    "title": "Grove - 2-Channel Inductive Sensor(LDC1612)",
    "category": "Touch",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "Grove2ChannelInductiveSensorLDC1612",
    "componentName": "Grove2ChannelInductiveSensorLDC1612",
    "detailed": false
  },
  {
    "title": "Grove - 12 Key Capacitive I2C Touch Sensor V3 (MPR121)",
    "category": "Touch",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove12KeyCapacitiveI2CTouchSensorV3MPR121",
    "componentName": "Grove12KeyCapacitiveI2CTouchSensorV3MPR121",
    "detailed": false
  },
  {
    "title": "Grove 12 Channel Capacitive Touch Keypad (ATtiny1616)",
    "category": "Touch",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove12ChannelCapacitiveTouchKeypadATtiny1616",
    "componentName": "Grove12ChannelCapacitiveTouchKeypadATtiny1616",
    "detailed": false
  },
  {
    "title": "Grove - ORP Sensor Kit Pro",
    "category": "Liquid",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveORPSensorKitPro",
    "componentName": "GroveORPSensorKitPro",
    "detailed": false
  },
  {
    "title": "Grove - Water Sensor",
    "category": "Liquid",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveWaterSensor",
    "componentName": "GroveWaterSensor",
    "detailed": false
  },
  {
    "title": "Grove - Water Level Sensor",
    "category": "Liquid",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveWaterLevelSensor",
    "componentName": "GroveWaterLevelSensor",
    "detailed": false
  },
  {
    "title": "Grove - TDS Sensor",
    "category": "Liquid",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTDSSensor",
    "componentName": "GroveTDSSensor",
    "detailed": false
  },
  {
    "title": "Grove - Turbidity Sensor Meter for Arduino V1.0",
    "category": "Liquid",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTurbiditySensorMeterForArduinoV10",
    "componentName": "GroveTurbiditySensorMeterForArduinoV10",
    "detailed": false
  },
  {
    "title": "Grove - PIR Motion Sensor",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GrovePIRMotionSensor",
    "componentName": "GrovePIRMotionSensor",
    "detailed": false
  },
  {
    "title": "Grove - Digital PIR Sensor",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveDigitalPIRSensor",
    "componentName": "GroveDigitalPIRSensor",
    "detailed": false
  },
  {
    "title": "Grove - Tilt Switch",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveTiltSwitch",
    "componentName": "GroveTiltSwitch",
    "detailed": false
  },
  {
    "title": "Grove - Piezo Vibration Sensor",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GrovePiezoVibrationSensor",
    "componentName": "GrovePiezoVibrationSensor",
    "detailed": false
  },
  {
    "title": "Grove - Slide Potentiometer",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSlidePotentiometer",
    "componentName": "GroveSlidePotentiometer",
    "detailed": false
  },
  {
    "title": "Grove - Optical Rotary Encoder(TCUT1600X01)",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveOpticalRotaryEncoderTCUT1600X01",
    "componentName": "GroveOpticalRotaryEncoderTCUT1600X01",
    "detailed": false
  },
  {
    "title": "Grove - 12-bit Magnetic Rotary Position Sensor / Encoder (AS5600)",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove12BitMagneticRotaryPositionSensorEncoderAS5600",
    "componentName": "Grove12BitMagneticRotaryPositionSensorEncoderAS5600",
    "detailed": false
  },
  {
    "title": "Grove-Encoder",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveEncoder",
    "componentName": "GroveEncoder",
    "detailed": false
  },
  {
    "title": "Grove - Step Counter(BMA456)",
    "category": "Motion",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveStepCounterBMA456",
    "componentName": "GroveStepCounterBMA456",
    "detailed": false
  },
  {
    "title": "Grove - ADC for Load Cell (HX711)",
    "category": "Weight",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveADCForLoadCellHX711",
    "componentName": "GroveADCForLoadCellHX711",
    "detailed": false
  },
  {
    "title": "Grove Wio-E5",
    "category": "LoRa®",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "digital",
    "directory": "GroveWioE5",
    "componentName": "GroveWioE5",
    "detailed": false
  },
  {
    "title": "Grove - BLE (dual model) v1.0",
    "category": "Bluetooth",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveBLEDualModelV10",
    "componentName": "GroveBLEDualModelV10",
    "detailed": false
  },
  {
    "title": "Grove - Serial Bluetooth v3.0",
    "category": "Bluetooth",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveSerialBluetoothV30",
    "componentName": "GroveSerialBluetoothV30",
    "detailed": false
  },
  {
    "title": "Grove - BLE v1",
    "category": "Bluetooth",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveBLEV1",
    "componentName": "GroveBLEV1",
    "detailed": false
  },
  {
    "title": "Grove - UART Wifi V2",
    "category": "Wi-Fi",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveUARTWifiV2",
    "componentName": "GroveUARTWifiV2",
    "detailed": false
  },
  {
    "title": "Grove - NFC (ST25DV64)",
    "category": "NFC",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "i2c",
    "directory": "GroveNFCST25DV64",
    "componentName": "GroveNFCST25DV64",
    "detailed": false
  },
  {
    "title": "Grove - NFC(PN532)",
    "category": "NFC",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "i2c",
    "directory": "GroveNFCPN532",
    "componentName": "GroveNFCPN532",
    "detailed": false
  },
  {
    "title": "Grove - NFC_tag",
    "category": "NFC",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "i2c",
    "directory": "GroveNFCTag",
    "componentName": "GroveNFCTag",
    "detailed": false
  },
  {
    "title": "Grove - GPS (SIM28)",
    "category": "GPS",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveGPSSIM28",
    "componentName": "GroveGPSSIM28",
    "detailed": false
  },
  {
    "title": "Grove - GPS (Air530)",
    "category": "GPS",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveGPSAir530",
    "componentName": "GroveGPSAir530",
    "detailed": false
  },
  {
    "title": "Grove - 125KHz RFID Reader",
    "category": "RF",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "Grove125KHzRFIDReader",
    "componentName": "Grove125KHzRFIDReader",
    "detailed": false
  },
  {
    "title": "Grove - 315MHz RF Kit",
    "category": "RF",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "Grove315MHzRFKit",
    "componentName": "Grove315MHzRFKit",
    "detailed": false
  },
  {
    "title": "Grove - 433MHz Simple RF Link Kit",
    "category": "RF",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "Grove433MHzSimpleRFLinkKit",
    "componentName": "Grove433MHzSimpleRFLinkKit",
    "detailed": false
  },
  {
    "title": "Grove - Long Range",
    "category": "RF",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "digital",
    "directory": "GroveLongRange",
    "componentName": "GroveLongRange",
    "detailed": false
  },
  {
    "title": "Grove - Serial RF Pro",
    "category": "RF",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveSerialRFPro",
    "componentName": "GroveSerialRFPro",
    "detailed": false
  },
  {
    "title": "Grove - DMX512",
    "category": "Other Standard Protocol",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "uart",
    "directory": "GroveDMX512",
    "componentName": "GroveDMX512",
    "detailed": false
  },
  {
    "title": "Grove- I2C ADC",
    "category": "Other Standard Protocol",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CADC",
    "componentName": "GroveI2CADC",
    "detailed": false
  },
  {
    "title": "Grove - I2C FM Receiver",
    "category": "Other Standard Protocol",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CFMReceiver",
    "componentName": "GroveI2CFMReceiver",
    "detailed": false
  },
  {
    "title": "Grove - Protoshield",
    "category": "Other Standard Protocol",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "digital",
    "directory": "GroveProtoshield",
    "componentName": "GroveProtoshield",
    "detailed": false
  },
  {
    "title": "Grove - RJ45 Adapter",
    "category": "Other Standard Protocol",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    "interfaceKind": "digital",
    "directory": "GroveRJ45Adapter",
    "componentName": "GroveRJ45Adapter",
    "detailed": false
  },
  {
    "title": "Grove 1.2-inch IPS Display",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove12InchIPSDisplay",
    "componentName": "Grove12InchIPSDisplay",
    "detailed": false
  },
  {
    "title": "Grove - 4-Digit Display",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove4DigitDisplay",
    "componentName": "Grove4DigitDisplay",
    "detailed": false
  },
  {
    "title": "Grove - 0.54 inch Red Alphanumeric Display",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove054InchRedAlphanumericDisplay",
    "componentName": "Grove054InchRedAlphanumericDisplay",
    "detailed": false
  },
  {
    "title": "Grove - 16x2 LCD",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove16x2LCD",
    "componentName": "Grove16x2LCD",
    "detailed": false
  },
  {
    "title": "Grove - LCD RGB Backlight",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveLCDRGBBacklight",
    "componentName": "GroveLCDRGBBacklight",
    "detailed": false
  },
  {
    "title": "Grove - OLED Display 0.66\" (SSD1306)",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay066SSD1306",
    "componentName": "GroveOLEDDisplay066SSD1306",
    "detailed": false
  },
  {
    "title": "Grove - OLED Display 0.96\" (SSD1315)",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay096SSD1315",
    "componentName": "GroveOLEDDisplay096SSD1315",
    "detailed": false
  },
  {
    "title": "Grove - OLED Yellow&Blue Display 0.96(SSD1315) - SPI/IIC -3.3V/5V",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V",
    "componentName": "GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V",
    "detailed": false
  },
  {
    "title": "Grove - OLED Display 1.12&#34",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay11234",
    "componentName": "GroveOLEDDisplay11234",
    "detailed": false
  },
  {
    "title": "Grove - OLED Display 1.12 (SH1107) V3.0 - SPI/IIC -3.3V/5V",
    "category": "Display",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay112SH1107V30SPIIIC33V5V",
    "componentName": "GroveOLEDDisplay112SH1107V30SPIIIC33V5V",
    "detailed": false
  },
  {
    "title": "Grove - 2-Coil Latching Relay",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove2CoilLatchingRelay",
    "componentName": "Grove2CoilLatchingRelay",
    "detailed": false
  },
  {
    "title": "Grove - Buzzer",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveBuzzer2",
    "componentName": "GroveBuzzer2",
    "detailed": false
  },
  {
    "title": "Grove - Passive Buzzer",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GrovePassiveBuzzer",
    "componentName": "GrovePassiveBuzzer",
    "detailed": false
  },
  {
    "title": "Grove – Chainable RGB LED V2.0",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "uart",
    "directory": "GroveChainableRGBLEDV20",
    "componentName": "GroveChainableRGBLEDV20",
    "detailed": false
  },
  {
    "title": "Grove - I2C Motor Driver V1.3",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CMotorDriverV13",
    "componentName": "GroveI2CMotorDriverV13",
    "detailed": false
  },
  {
    "title": "Grove - I2C Motor Driver (L298P)",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CMotorDriverL298P",
    "componentName": "GroveI2CMotorDriverL298P",
    "detailed": false
  },
  {
    "title": "Grove - Infrared Emitter",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveInfraredEmitter",
    "componentName": "GroveInfraredEmitter",
    "detailed": false
  },
  {
    "title": "Grove - MP3 v4.0",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "uart",
    "directory": "GroveMP3V40",
    "componentName": "GroveMP3V40",
    "detailed": false
  },
  {
    "title": "Grove - Mini Fan",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveMiniFan",
    "componentName": "GroveMiniFan",
    "detailed": false
  },
  {
    "title": "Grove - Recorder V3",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveRecorderV3",
    "componentName": "GroveRecorderV3",
    "detailed": false
  },
  {
    "title": "Grove - Relay",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveRelay2",
    "componentName": "GroveRelay2",
    "detailed": false
  },
  {
    "title": "Grove - 2-Channel SPDT Relay",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove2ChannelSPDTRelay",
    "componentName": "Grove2ChannelSPDTRelay",
    "detailed": false
  },
  {
    "title": "Grove - 4-Channel SPDT Relay",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove4ChannelSPDTRelay",
    "componentName": "Grove4ChannelSPDTRelay",
    "detailed": false
  },
  {
    "title": "Grove - 8-Channel Solid State Relay",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove8ChannelSolidStateRelay",
    "componentName": "Grove8ChannelSolidStateRelay",
    "detailed": false
  },
  {
    "title": "Grove - Optocoupler Relay (M281)",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveOptocouplerRelayM281",
    "componentName": "GroveOptocouplerRelayM281",
    "detailed": false
  },
  {
    "title": "Grove - Servo",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveServo",
    "componentName": "GroveServo",
    "detailed": false
  },
  {
    "title": "Grove - Speaker",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSpeaker",
    "componentName": "GroveSpeaker",
    "detailed": false
  },
  {
    "title": "Grove - Speaker Plus",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSpeakerPlus",
    "componentName": "GroveSpeakerPlus",
    "detailed": false
  },
  {
    "title": "Grove - Vibration Motor",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveVibrationMotor",
    "componentName": "GroveVibrationMotor",
    "detailed": false
  },
  {
    "title": "Grove - Water Atomization",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveWaterAtomization",
    "componentName": "GroveWaterAtomization",
    "detailed": false
  },
  {
    "title": "Grove - 16 Channel PWM Driver (PCA9685)",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove16ChannelPWMDriverPCA9685",
    "componentName": "Grove16ChannelPWMDriverPCA9685",
    "detailed": false
  },
  {
    "title": "Grove - I2C Motor Driver (TB6612FNG)",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CMotorDriverTB6612FNG",
    "componentName": "GroveI2CMotorDriverTB6612FNG",
    "detailed": false
  },
  {
    "title": "Grove - Hall Sensor",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveHallSensor",
    "componentName": "GroveHallSensor",
    "detailed": false
  },
  {
    "title": "Grove - Voltage Divider",
    "category": "Actuator",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveVoltageDivider",
    "componentName": "GroveVoltageDivider",
    "detailed": false
  },
  {
    "title": "Grove - DS1307 RTC (Real Time Clock) for Arduino",
    "category": "Time",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveDS1307RTCRealTimeClockForArduino",
    "componentName": "GroveDS1307RTCRealTimeClockForArduino",
    "detailed": false
  },
  {
    "title": "Grove - High Precision RTC (Real Time Clock)",
    "category": "Time",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveHighPrecisionRTCRealTimeClock",
    "componentName": "GroveHighPrecisionRTCRealTimeClock",
    "detailed": false
  },
  {
    "title": "Grove - 10A DC Current Sensor (ACS725)",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove10ADCCurrentSensorACS725",
    "componentName": "Grove10ADCCurrentSensorACS725",
    "detailed": false
  },
  {
    "title": "Grove - ±5A DC/AC Current Sensor (ACS70331)",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove5ADCACCurrentSensorACS70331",
    "componentName": "Grove5ADCACCurrentSensorACS70331",
    "detailed": false
  },
  {
    "title": "Grove - 2.5A DC Current Sensor(ACS70331)",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "Grove25ADCCurrentSensorACS70331",
    "componentName": "Grove25ADCCurrentSensorACS70331",
    "detailed": false
  },
  {
    "title": "Grove - Electricity Sensor",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveElectricitySensor",
    "componentName": "GroveElectricitySensor",
    "detailed": false
  },
  {
    "title": "Grove - Coulomb Counter 3.3V to 5V (LTC2941)",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveCoulombCounter33VTo5VLTC2941",
    "componentName": "GroveCoulombCounter33VTo5VLTC2941",
    "detailed": false
  },
  {
    "title": "Grove - MOSFET",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveMOSFET",
    "componentName": "GroveMOSFET",
    "detailed": false
  },
  {
    "title": "Grove - SPDT Relay(30A)",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSPDTRelay30A",
    "componentName": "GroveSPDTRelay30A",
    "detailed": false
  },
  {
    "title": "Grove - Screw Terminal",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveScrewTerminal",
    "componentName": "GroveScrewTerminal",
    "detailed": false
  },
  {
    "title": "Grove - Electromagnet",
    "category": "Current",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveElectromagnet",
    "componentName": "GroveElectromagnet",
    "detailed": false
  },
  {
    "title": "Grove - Red LED",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveRedLED",
    "componentName": "GroveRedLED",
    "detailed": false
  },
  {
    "title": "Grove - Circular LED",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveCircularLED",
    "componentName": "GroveCircularLED",
    "detailed": false
  },
  {
    "title": "Grove - RGB LED Ring (20 - WS2813 Mini)",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveRGBLEDRing20WS2813Mini",
    "componentName": "GroveRGBLEDRing20WS2813Mini",
    "detailed": false
  },
  {
    "title": "Grove - LED String Light",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveLEDStringLight",
    "componentName": "GroveLEDStringLight",
    "detailed": false
  },
  {
    "title": "Grove - LED Strip Driver",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveLEDStripDriver",
    "componentName": "GroveLEDStripDriver",
    "detailed": false
  },
  {
    "title": "Grove - RGB LED Matrix w/Driver",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveRGBLEDMatrixWDriver",
    "componentName": "GroveRGBLEDMatrixWDriver",
    "detailed": false
  },
  {
    "title": "Grove - LED Matrix Driver (HT16K33)",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveLEDMatrixDriverHT16K33",
    "componentName": "GroveLEDMatrixDriverHT16K33",
    "detailed": false
  },
  {
    "title": "Grove - Red LED Matrix w/Driver",
    "category": "LED",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveRedLEDMatrixWDriver",
    "componentName": "GroveRedLEDMatrixWDriver",
    "detailed": false
  },
  {
    "title": "Grove - Button",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveButton2",
    "componentName": "GroveButton2",
    "detailed": false
  },
  {
    "title": "Grove - Switch(P)",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveSwitchP",
    "componentName": "GroveSwitchP",
    "detailed": false
  },
  {
    "title": "Grove-LED Button",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveLEDButton",
    "componentName": "GroveLEDButton",
    "detailed": false
  },
  {
    "title": "Grove Dual Button",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveDualButton",
    "componentName": "GroveDualButton",
    "detailed": false
  },
  {
    "title": "Grove-Mech keycap",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveMechKeycap",
    "componentName": "GroveMechKeycap",
    "detailed": false
  },
  {
    "title": "Grove - Thumb Joystick",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveThumbJoystick",
    "componentName": "GroveThumbJoystick",
    "detailed": false
  },
  {
    "title": "Grove - Magnetic Switch",
    "category": "Switch & Button",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "analog",
    "directory": "GroveMagneticSwitch",
    "componentName": "GroveMagneticSwitch",
    "detailed": false
  },
  {
    "title": "Grove - I2C Hub",
    "category": "Input Output",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CHub",
    "componentName": "GroveI2CHub",
    "detailed": false
  },
  {
    "title": "Grove - I2C Hub(6 Port)",
    "category": "Input Output",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "GroveI2CHub6Port",
    "componentName": "GroveI2CHub6Port",
    "detailed": false
  },
  {
    "title": "Grove - 8 Channel I2C Multiplexer/I2C Hub (TCA9548A)",
    "category": "Input Output",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove8ChannelI2CMultiplexerI2CHubTCA9548A",
    "componentName": "Grove8ChannelI2CMultiplexerI2CHubTCA9548A",
    "detailed": false
  },
  {
    "title": "Grove - 4-Channel 16-bit ADC(ADS1115)",
    "category": "Input Output",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "i2c",
    "directory": "Grove4Channel16BitADCADS1115",
    "componentName": "Grove4Channel16BitADCADS1115",
    "detailed": false
  },
  {
    "title": "Grove - Wrapper",
    "category": "Case",
    "sourceUrl": "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    "interfaceKind": "digital",
    "directory": "GroveWrapper",
    "componentName": "GroveWrapper",
    "detailed": false
  },
  {
    "title": "Grove 16 x 2 LCD Black on Yellow",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-16-x-2-LCD-Black-on-Yellow.html",
    "interfaceKind": "i2c",
    "directory": "Grove16X2LCDBlackOnYellow",
    "componentName": "Grove16X2LCDBlackOnYellow",
    "detailed": false
  },
  {
    "title": "Grove 16 x 2 LCD Black on Red",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-16-x-2-LCD-Black-on-Red.html",
    "interfaceKind": "i2c",
    "directory": "Grove16X2LCDBlackOnRed",
    "componentName": "Grove16X2LCDBlackOnRed",
    "detailed": false
  },
  {
    "title": "Grove 16x2 LCD White on Blue",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-16x2-LCD-White-on-Blue.html",
    "interfaceKind": "i2c",
    "directory": "Grove16x2LCDWhiteOnBlue",
    "componentName": "Grove16x2LCDWhiteOnBlue",
    "detailed": false
  },
  {
    "title": "Grove I2C UV Sensor VEML6070",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-I2C-UV-Sensor-VEML6070.html",
    "interfaceKind": "i2c",
    "directory": "GroveI2CUVSensorVEML6070",
    "componentName": "GroveI2CUVSensorVEML6070",
    "detailed": false
  },
  {
    "title": "Grove Capacitive Touch Slider Sensor CY8C4014LQI",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Capacitive-Touch-Slider-Sensor-CY8C4014LQI.html",
    "interfaceKind": "analog",
    "directory": "GroveCapacitiveTouchSliderSensorCY8C4014LQI",
    "componentName": "GroveCapacitiveTouchSliderSensorCY8C4014LQI",
    "detailed": false
  },
  {
    "title": "Grove Vibration Sensor SW 420",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Vibration-Sensor-SW-420.html",
    "interfaceKind": "analog",
    "directory": "GroveVibrationSensorSW420",
    "componentName": "GroveVibrationSensorSW420",
    "detailed": false
  },
  {
    "title": "Grove IMU 9DOF ICM20600 AK09918",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-IMU-9DOF-ICM20600-AK09918.html",
    "interfaceKind": "i2c",
    "directory": "GroveIMU9DOFICM20600AK09918",
    "componentName": "GroveIMU9DOFICM20600AK09918",
    "detailed": false
  },
  {
    "title": "Grove 12 Key Capacitive I2C Touch Sensor V2 MPR121",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-12-Key-Capacitive-I2C-Touch-Sensor-V2-MPR121.html",
    "interfaceKind": "i2c",
    "directory": "Grove12KeyCapacitiveI2CTouchSensorV2MPR121",
    "componentName": "Grove12KeyCapacitiveI2CTouchSensorV2MPR121",
    "detailed": false
  },
  {
    "title": "Grove 6 Position DIP Switch",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-6-Position-DIP-Switch.html",
    "interfaceKind": "analog",
    "directory": "Grove6PositionDIPSwitch",
    "componentName": "Grove6PositionDIPSwitch",
    "detailed": false
  },
  {
    "title": "Grove 5 Way Switch",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-5-Way-Switch.html",
    "interfaceKind": "analog",
    "directory": "Grove5WaySwitch",
    "componentName": "Grove5WaySwitch",
    "detailed": false
  },
  {
    "title": "Grove 4 Channel Solid State Relay",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-4-Channel-Solid-State-Relay.html",
    "interfaceKind": "analog",
    "directory": "Grove4ChannelSolidStateRelay",
    "componentName": "Grove4ChannelSolidStateRelay",
    "detailed": false
  },
  {
    "title": "Grove 2 Channel Solid State Relay",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-2-Channel-Solid-State-Relay.html",
    "interfaceKind": "analog",
    "directory": "Grove2ChannelSolidStateRelay",
    "componentName": "Grove2ChannelSolidStateRelay",
    "detailed": false
  },
  {
    "title": "Grove Solid State Relay V2",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Solid-State-Relay-V2-p-3128.html",
    "interfaceKind": "analog",
    "directory": "GroveSolidStateRelayV2",
    "componentName": "GroveSolidStateRelayV2",
    "detailed": false
  },
  {
    "title": "Grove WS2813 RGB LED Strip Waterproof 60 LED m 1m",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-WS2813-RGB-LED-Strip-Waterproof-60-LED-m-1m.html",
    "interfaceKind": "analog",
    "directory": "GroveWS2813RGBLEDStripWaterproof60LEDM1m",
    "componentName": "GroveWS2813RGBLEDStripWaterproof60LEDM1m",
    "detailed": false
  },
  {
    "title": "Grove WS2813 RGB LED Strip Waterproof 30 LED m 1m",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-WS2813-RGB-LED-Strip-Waterproof-30-LED-m-1m.html",
    "interfaceKind": "analog",
    "directory": "GroveWS2813RGBLEDStripWaterproof30LEDM1m",
    "componentName": "GroveWS2813RGBLEDStripWaterproof30LEDM1m",
    "detailed": false
  },
  {
    "title": "Grove Blue LED Button",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Blue-LED-Button.html",
    "interfaceKind": "analog",
    "directory": "GroveBlueLEDButton",
    "componentName": "GroveBlueLEDButton",
    "detailed": false
  },
  {
    "title": "Grove Yellow LED Button",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Yellow-LED-Button.html",
    "interfaceKind": "analog",
    "directory": "GroveYellowLEDButton",
    "componentName": "GroveYellowLEDButton",
    "detailed": false
  },
  {
    "title": "Grove Red LED Button",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Red-LED-Button.html",
    "interfaceKind": "analog",
    "directory": "GroveRedLEDButton",
    "componentName": "GroveRedLEDButton",
    "detailed": false
  },
  {
    "title": "Grove Digital Distance Interrupter 0 5 to 5cm GP2Y0D805Z0F P",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Digital-Distance-Interrupter-0-5-to-5cm-GP2Y0D805Z0F-P.html",
    "interfaceKind": "digital",
    "directory": "GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP",
    "componentName": "GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP",
    "detailed": false
  },
  {
    "title": "Grove Digital Distance Interrupter 0 5 to 5cm GP2Y0D805Z0F",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Digital-Distance-Interrupter-0-5-to-5cm-GP2Y0D805Z0F.html",
    "interfaceKind": "digital",
    "directory": "GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F",
    "componentName": "GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F",
    "detailed": false
  },
  {
    "title": "Grove I2C FM Receiver v1 1",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-I2C-FM-Receiver-v1-1.html",
    "interfaceKind": "i2c",
    "directory": "GroveI2CFMReceiverV11",
    "componentName": "GroveI2CFMReceiverV11",
    "detailed": false
  },
  {
    "title": "Grove UART WiFi V2 ESP8285",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-UART-WiFi-V2-ESP8285.html",
    "interfaceKind": "uart",
    "directory": "GroveUARTWiFiV2ESP8285",
    "componentName": "GroveUARTWiFiV2ESP8285",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Compass V2",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Compass-V2.html",
    "interfaceKind": "digital",
    "directory": "Grove3AxisDigitalCompassV2",
    "componentName": "Grove3AxisDigitalCompassV2",
    "detailed": false
  },
  {
    "title": "Grove Micro Switch",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Micro-Switch.html",
    "interfaceKind": "analog",
    "directory": "GroveMicroSwitch",
    "componentName": "GroveMicroSwitch",
    "detailed": false
  },
  {
    "title": "Grove OLED Display 1 12 V2",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-OLED-Display-1-12-V2.html",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay112V2",
    "componentName": "GroveOLEDDisplay112V2",
    "detailed": false
  },
  {
    "title": "Grove Variable Color LED V1 1",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Variable-Color-LED-V1-1.html",
    "interfaceKind": "uart",
    "directory": "GroveVariableColorLEDV11",
    "componentName": "GroveVariableColorLEDV11",
    "detailed": false
  },
  {
    "title": "Grove mini PIR motion sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-mini-PIR-motion-sensor-p-2930.html",
    "interfaceKind": "analog",
    "directory": "GroveMiniPIRMotionSensor",
    "componentName": "GroveMiniPIRMotionSensor",
    "detailed": false
  },
  {
    "title": "Grove I2C Color Sensor V2",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-I2C-Color-Sensor-V2.html",
    "interfaceKind": "i2c",
    "directory": "GroveI2CColorSensorV2",
    "componentName": "GroveI2CColorSensorV2",
    "detailed": false
  },
  {
    "title": "Grove Heelight Sensor",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Heelight-Sensor.html",
    "interfaceKind": "analog",
    "directory": "GroveHeelightSensor",
    "componentName": "GroveHeelightSensor",
    "detailed": false
  },
  {
    "title": "Grove Infrared Reflective Sensor v1 2",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Infrared-Reflective-Sensor-v1-2.html",
    "interfaceKind": "digital",
    "directory": "GroveInfraredReflectiveSensorV12",
    "componentName": "GroveInfraredReflectiveSensorV12",
    "detailed": false
  },
  {
    "title": "Grove LoRa Radio 433MHz",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-LoRa-Radio-433MHz-p-2777.html",
    "interfaceKind": "uart",
    "directory": "GroveLoRaRadio433MHz",
    "componentName": "GroveLoRaRadio433MHz",
    "detailed": false
  },
  {
    "title": "Grove LoRa Radio 868MHz",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-LoRa-Radio-868MHz.html",
    "interfaceKind": "uart",
    "directory": "GroveLoRaRadio868MHz",
    "componentName": "GroveLoRaRadio868MHz",
    "detailed": false
  },
  {
    "title": "Grove High Precision RTC",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-High-Precision-RTC.html",
    "interfaceKind": "i2c",
    "directory": "GroveHighPrecisionRTC",
    "componentName": "GroveHighPrecisionRTC",
    "detailed": false
  },
  {
    "title": "Grove Light Sensor v1 2 LS06 S phototransistor",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Light-Sensor-v1-2-LS06-S-phototransistor.html",
    "interfaceKind": "analog",
    "directory": "GroveLightSensorV12LS06SPhototransistor",
    "componentName": "GroveLightSensorV12LS06SPhototransistor",
    "detailed": false
  },
  {
    "title": "Grove Recorder v3 0",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Recorder-v3-0.html",
    "interfaceKind": "digital",
    "directory": "GroveRecorderV30",
    "componentName": "GroveRecorderV30",
    "detailed": false
  },
  {
    "title": "Grove Speech Recognizer",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Speech-Recognizer.html",
    "interfaceKind": "uart",
    "directory": "GroveSpeechRecognizer",
    "componentName": "GroveSpeechRecognizer",
    "detailed": false
  },
  {
    "title": "Grove Light Sensor P v1 1",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Light-Sensor-P-v1-1.html",
    "interfaceKind": "analog",
    "directory": "GroveLightSensorPV11",
    "componentName": "GroveLightSensorPV11",
    "detailed": false
  },
  {
    "title": "Grove IMU 10DOF v2 0",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-IMU-10DOF-v2-0.html",
    "interfaceKind": "digital",
    "directory": "GroveIMU10DOFV20",
    "componentName": "GroveIMU10DOFV20",
    "detailed": false
  },
  {
    "title": "Grove Mini Fan v1 1",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Mini-Fan-v1-1.html",
    "interfaceKind": "analog",
    "directory": "GroveMiniFanV11",
    "componentName": "GroveMiniFanV11",
    "detailed": false
  },
  {
    "title": "Grove Temperature Humidity Sensor SHT31",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-SHT31.html",
    "interfaceKind": "i2c",
    "directory": "GroveTemperatureHumiditySensorSHT31",
    "componentName": "GroveTemperatureHumiditySensorSHT31",
    "detailed": false
  },
  {
    "title": "Grove BME280 Environmental Sensor Temperature Humidity Barometer",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-BME280-Environmental-Sensor-Temperature-Humidity-Barometer.html",
    "interfaceKind": "i2c",
    "directory": "GroveBME280EnvironmentalSensorTemperatureHumidityBarometer",
    "componentName": "GroveBME280EnvironmentalSensorTemperatureHumidityBarometer",
    "detailed": false
  },
  {
    "title": "Grove LED Matrix Driver v1 0",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-LED-Matrix-Driver-v1-0.html",
    "interfaceKind": "analog",
    "directory": "GroveLEDMatrixDriverV10",
    "componentName": "GroveLEDMatrixDriverV10",
    "detailed": false
  },
  {
    "title": "Grove Mouse Encoder",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Mouse-Encoder.html",
    "interfaceKind": "analog",
    "directory": "GroveMouseEncoder",
    "componentName": "GroveMouseEncoder",
    "detailed": false
  },
  {
    "title": "Grove MP3 v2 0",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-MP3-v2-0-p-2597.html",
    "interfaceKind": "uart",
    "directory": "GroveMP3V20",
    "componentName": "GroveMP3V20",
    "detailed": false
  },
  {
    "title": "Grove Mini Track Ball",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Mini-Track-Ball.html",
    "interfaceKind": "digital",
    "directory": "GroveMiniTrackBall",
    "componentName": "GroveMiniTrackBall",
    "detailed": false
  },
  {
    "title": "Grove Haptic Motor",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Haptic-Motor-p-2546.html",
    "interfaceKind": "analog",
    "directory": "GroveHapticMotor",
    "componentName": "GroveHapticMotor",
    "detailed": false
  },
  {
    "title": "Grove Water Atomization v1 0",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Water-Atomization-v1-0.html",
    "interfaceKind": "analog",
    "directory": "GroveWaterAtomizationV10",
    "componentName": "GroveWaterAtomizationV10",
    "detailed": false
  },
  {
    "title": "Grove Temperature Humidity Sensor HDC100",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-HDC100-p-2535.html",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorHDC100",
    "componentName": "GroveTemperatureHumiditySensorHDC100",
    "detailed": false
  },
  {
    "title": "Grove I2C Mini Motor Driver",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-I2C-Mini-Motor-Driver.html",
    "interfaceKind": "i2c",
    "directory": "GroveI2CMiniMotorDriver",
    "componentName": "GroveI2CMiniMotorDriver",
    "detailed": false
  },
  {
    "title": "Grove Uart Wifi",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Uart-Wifi-p-2495.html",
    "interfaceKind": "uart",
    "directory": "GroveUartWifi",
    "componentName": "GroveUartWifi",
    "detailed": false
  },
  {
    "title": "Grove 6 Axis Accelerometer Compass v2 0",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-6-Axis-Accelerometer-Compass-v2-0.html",
    "interfaceKind": "analog",
    "directory": "Grove6AxisAccelerometerCompassV20",
    "componentName": "Grove6AxisAccelerometerCompassV20",
    "detailed": false
  },
  {
    "title": "Grove Serial Blueseeed CSR BC417",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Serial-Blueseeed-CSR-BC417.html",
    "interfaceKind": "uart",
    "directory": "GroveSerialBlueseeedCSRBC417",
    "componentName": "GroveSerialBlueseeedCSRBC417",
    "detailed": false
  },
  {
    "title": "Grove LED Bar v2 0",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-LED-Bar-v2-0.html",
    "interfaceKind": "analog",
    "directory": "GroveLEDBarV20",
    "componentName": "GroveLEDBarV20",
    "detailed": false
  },
  {
    "title": "Grove Gesture PAJ7620U2",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Gesture-PAJ7620U2.html",
    "interfaceKind": "analog",
    "directory": "GroveGesturePAJ7620U2",
    "componentName": "GroveGesturePAJ7620U2",
    "detailed": false
  },
  {
    "title": "Grove Finger clip Heart Rate Sensor with shell",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Finger-clip-Heart-Rate-Sensor-with-shell.html",
    "interfaceKind": "analog",
    "directory": "GroveFingerClipHeartRateSensorWithShell",
    "componentName": "GroveFingerClipHeartRateSensorWithShell",
    "detailed": false
  },
  {
    "title": "Grove Blueseeed Dual model HM13",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Blueseeed-Dual-model-HM13.html",
    "interfaceKind": "digital",
    "directory": "GroveBlueseeedDualModelHM13",
    "componentName": "GroveBlueseeedDualModelHM13",
    "detailed": false
  },
  {
    "title": "Grove IMU 9DOF v2 0",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-IMU-9DOF-v2-0.html",
    "interfaceKind": "digital",
    "directory": "GroveIMU9DOFV20",
    "componentName": "GroveIMU9DOFV20",
    "detailed": false
  },
  {
    "title": "Grove IMU 10DOF",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-IMU-10DOF-p-2386.html",
    "interfaceKind": "digital",
    "directory": "GroveIMU10DOF",
    "componentName": "GroveIMU10DOF",
    "detailed": false
  },
  {
    "title": "Grove EL Driver",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-EL-Driver.html",
    "interfaceKind": "digital",
    "directory": "GroveELDriver",
    "componentName": "GroveELDriver",
    "detailed": false
  },
  {
    "title": "Grove Carbon Dioxide Sensor MH Z16",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Carbon-Dioxide-Sensor-MH-Z16.html",
    "interfaceKind": "digital",
    "directory": "GroveCarbonDioxideSensorMHZ16",
    "componentName": "GroveCarbonDioxideSensorMHZ16",
    "detailed": false
  },
  {
    "title": "Grove Q Touch Sensor",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Q-Touch-Sensor.html",
    "interfaceKind": "analog",
    "directory": "GroveQTouchSensor",
    "componentName": "GroveQTouchSensor",
    "detailed": false
  },
  {
    "title": "Grove FM Receiver",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-FM-Receiver.html",
    "interfaceKind": "i2c",
    "directory": "GroveFMReceiver",
    "componentName": "GroveFMReceiver",
    "detailed": false
  },
  {
    "title": "Grove Barometer Sensor BMP18",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Barometer-Sensor-BMP18-p-1840.html",
    "interfaceKind": "i2c",
    "directory": "GroveBarometerSensorBMP18",
    "componentName": "GroveBarometerSensorBMP18",
    "detailed": false
  },
  {
    "title": "Grove Recorder",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Recorder-p-1825.html",
    "interfaceKind": "digital",
    "directory": "GroveRecorder",
    "componentName": "GroveRecorder",
    "detailed": false
  },
  {
    "title": "Grove NFC",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-NFC.html",
    "interfaceKind": "i2c",
    "directory": "GroveNFC",
    "componentName": "GroveNFC",
    "detailed": false
  },
  {
    "title": "Grove IMU 9DOF",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-IMU-9DOF-p-1728.html",
    "interfaceKind": "digital",
    "directory": "GroveIMU9DOF",
    "componentName": "GroveIMU9DOF",
    "detailed": false
  },
  {
    "title": "Grove Mini Camera",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Mini-Camera-p-1578.html",
    "interfaceKind": "uart",
    "directory": "GroveMiniCamera",
    "componentName": "GroveMiniCamera",
    "detailed": false
  },
  {
    "title": "Grove PH Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-PH-Sensor.html",
    "interfaceKind": "digital",
    "directory": "GrovePHSensor",
    "componentName": "GrovePHSensor",
    "detailed": false
  },
  {
    "title": "Grove Serial MP3 Player",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Serial-MP3-Player-p-1542.html",
    "interfaceKind": "uart",
    "directory": "GroveSerialMP3Player",
    "componentName": "GroveSerialMP3Player",
    "detailed": false
  },
  {
    "title": "Grove Single Axis Analog Gyro",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Single-Axis-Analog-Gyro-p-1451.html",
    "interfaceKind": "analog",
    "directory": "GroveSingleAxisAnalogGyro",
    "componentName": "GroveSingleAxisAnalogGyro",
    "detailed": false
  },
  {
    "title": "Grove 6 Axis Accelerometer Compass",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-6-Axis-Accelerometer-Compass-p-1448.html",
    "interfaceKind": "analog",
    "directory": "Grove6AxisAccelerometerCompass",
    "componentName": "Grove6AxisAccelerometerCompass",
    "detailed": false
  },
  {
    "title": "Grove Fingerprint Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Fingerprint-Sensor.html",
    "interfaceKind": "digital",
    "directory": "GroveFingerprintSensor",
    "componentName": "GroveFingerprintSensor",
    "detailed": false
  },
  {
    "title": "Grove Gas Sensor MQ9",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Gas-Sensor-MQ9.html",
    "interfaceKind": "analog",
    "directory": "GroveGasSensorMQ9",
    "componentName": "GroveGasSensorMQ9",
    "detailed": false
  },
  {
    "title": "Grove MQ3 Grove Gas Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-MQ3-Grove-Gas-Sensor.html",
    "interfaceKind": "analog",
    "directory": "GroveMQ3GroveGasSensor",
    "componentName": "GroveMQ3GroveGasSensor",
    "detailed": false
  },
  {
    "title": "Grove Dry Reed Relay",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Dry-Reed-Relay.html",
    "interfaceKind": "analog",
    "directory": "GroveDryReedRelay",
    "componentName": "GroveDryReedRelay",
    "detailed": false
  },
  {
    "title": "Grove Solid State Relay",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Solid-State-Relay.html",
    "interfaceKind": "analog",
    "directory": "GroveSolidStateRelay",
    "componentName": "GroveSolidStateRelay",
    "detailed": false
  },
  {
    "title": "Grove LED Bar",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-LED-Bar.html",
    "interfaceKind": "analog",
    "directory": "GroveLEDBar",
    "componentName": "GroveLEDBar",
    "detailed": false
  },
  {
    "title": "Grove Differential Amplifier",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Differential-Amplifier.html",
    "interfaceKind": "digital",
    "directory": "GroveDifferentialAmplifier",
    "componentName": "GroveDifferentialAmplifier",
    "detailed": false
  },
  {
    "title": "Grove Digital Light Sensor TSL2561",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Digital-Light-Sensor-TSL2561.html",
    "interfaceKind": "analog",
    "directory": "GroveDigitalLightSensorTSL2561",
    "componentName": "GroveDigitalLightSensorTSL2561",
    "detailed": false
  },
  {
    "title": "Grove IR Distance Interrupter",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-IR-Distance-Interrupter-p-1278.html",
    "interfaceKind": "digital",
    "directory": "GroveIRDistanceInterrupter",
    "componentName": "GroveIRDistanceInterrupter",
    "detailed": false
  },
  {
    "title": "Grove Button P",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Button-P.html",
    "interfaceKind": "analog",
    "directory": "GroveButtonP",
    "componentName": "GroveButtonP",
    "detailed": false
  },
  {
    "title": "Grove Rotary Angle Sensor P",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Rotary-Angle-Sensor-P.html",
    "interfaceKind": "analog",
    "directory": "GroveRotaryAngleSensorP",
    "componentName": "GroveRotaryAngleSensorP",
    "detailed": false
  },
  {
    "title": "Grove Barometer Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Barometer-Sensor.html",
    "interfaceKind": "analog",
    "directory": "GroveBarometerSensor",
    "componentName": "GroveBarometerSensor",
    "detailed": false
  },
  {
    "title": "Grove Serial Camera",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Serial-Camera-p-945.html",
    "interfaceKind": "uart",
    "directory": "GroveSerialCamera",
    "componentName": "GroveSerialCamera",
    "detailed": false
  },
  {
    "title": "Grove Gas Sensor MQ5",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Gas-Sensor-MQ5.html",
    "interfaceKind": "analog",
    "directory": "GroveGasSensorMQ5",
    "componentName": "GroveGasSensorMQ5",
    "detailed": false
  },
  {
    "title": "Grove Gas Sensor MQ2",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Gas-Sensor-MQ2.html",
    "interfaceKind": "analog",
    "directory": "GroveGasSensorMQ2",
    "componentName": "GroveGasSensorMQ2",
    "detailed": false
  },
  {
    "title": "Grove I2C Motor Driver with L298",
    "category": "Actuator",
    "sourceUrl": "https://www.seeedstudio.com/Grove-I2C-Motor-Driver-with-L298.html",
    "interfaceKind": "i2c",
    "directory": "GroveI2CMotorDriverWithL298",
    "componentName": "GroveI2CMotorDriverWithL298",
    "detailed": false
  },
  {
    "title": "Grove Sound Recorder",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Sound-Recorder-p-904.html",
    "interfaceKind": "analog",
    "directory": "GroveSoundRecorder",
    "componentName": "GroveSoundRecorder",
    "detailed": false
  },
  {
    "title": "Grove Geiger Counter",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Geiger-Counter-p-867.html",
    "interfaceKind": "digital",
    "directory": "GroveGeigerCounter",
    "componentName": "GroveGeigerCounter",
    "detailed": false
  },
  {
    "title": "Grove I2C Color Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-I2C-Color-Sensor-p-854.html",
    "interfaceKind": "i2c",
    "directory": "GroveI2CColorSensor",
    "componentName": "GroveI2CColorSensor",
    "detailed": false
  },
  {
    "title": "Grove Variable Color LED",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Variable-Color-LED-p-852.html",
    "interfaceKind": "uart",
    "directory": "GroveVariableColorLED",
    "componentName": "GroveVariableColorLED",
    "detailed": false
  },
  {
    "title": "Grove Chainable RGB LED",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Chainable-RGB-LED.html",
    "interfaceKind": "uart",
    "directory": "GroveChainableRGBLED",
    "componentName": "GroveChainableRGBLED",
    "detailed": false
  },
  {
    "title": "Grove I2C Touch Sensor",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-I2C-Touch-Sensor-p-840.html",
    "interfaceKind": "i2c",
    "directory": "GroveI2CTouchSensor",
    "componentName": "GroveI2CTouchSensor",
    "detailed": false
  },
  {
    "title": "Grove Temperature Humidity Sensor Pro AM2302 DHT22",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-Pro-AM2302-DHT22.html",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorProAM2302DHT22",
    "componentName": "GroveTemperatureHumiditySensorProAM2302DHT22",
    "detailed": false
  },
  {
    "title": "Grove BlinkM",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-BlinkM-p-826.html",
    "interfaceKind": "digital",
    "directory": "GroveBlinkM",
    "componentName": "GroveBlinkM",
    "detailed": false
  },
  {
    "title": "Grove Line Finder",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Line-Finder-p-825.html",
    "interfaceKind": "digital",
    "directory": "GroveLineFinder",
    "componentName": "GroveLineFinder",
    "detailed": false
  },
  {
    "title": "Grove OLED Display 1 12",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-OLED-Display-1-12.html",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay112",
    "componentName": "GroveOLEDDisplay112",
    "detailed": false
  },
  {
    "title": "Grove OLED Display 0 96",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-OLED-Display-0-96.html",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay096",
    "componentName": "GroveOLEDDisplay096",
    "detailed": false
  },
  {
    "title": "Grove Serial LCD",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Serial-LCD-p-773.html",
    "interfaceKind": "i2c",
    "directory": "GroveSerialLCD",
    "componentName": "GroveSerialLCD",
    "detailed": false
  },
  {
    "title": "Grove LED",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-LED-p-767.html",
    "interfaceKind": "analog",
    "directory": "GroveLED",
    "componentName": "GroveLED",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Accelerometer 1 5g",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-1-5g.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisDigitalAccelerometer15g",
    "componentName": "Grove3AxisDigitalAccelerometer15g",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Compass",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Compass.html",
    "interfaceKind": "digital",
    "directory": "Grove3AxisDigitalCompass",
    "componentName": "Grove3AxisDigitalCompass",
    "detailed": false
  },
  {
    "title": "Grove RTC DS1307",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RTC-DS1307.html",
    "interfaceKind": "i2c",
    "directory": "GroveRTCDS1307",
    "componentName": "GroveRTCDS1307",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Gyro",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Gyro.html",
    "interfaceKind": "digital",
    "directory": "Grove3AxisDigitalGyro",
    "componentName": "Grove3AxisDigitalGyro",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Accelerometer 16g",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-16g.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisDigitalAccelerometer16g",
    "componentName": "Grove3AxisDigitalAccelerometer16g",
    "detailed": false
  },
  {
    "title": "Grove Green LED",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Green-LED.html",
    "interfaceKind": "analog",
    "directory": "GroveGreenLED",
    "componentName": "GroveGreenLED",
    "detailed": false
  },
  {
    "title": "Grove Purple LED 3mm",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Purple-LED-3mm.html",
    "interfaceKind": "analog",
    "directory": "GrovePurpleLED3mm",
    "componentName": "GrovePurpleLED3mm",
    "detailed": false
  },
  {
    "title": "Grove Multi Color Flash LED 5mm",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Multi-Color-Flash-LED-5mm.html",
    "interfaceKind": "analog",
    "directory": "GroveMultiColorFlashLED5mm",
    "componentName": "GroveMultiColorFlashLED5mm",
    "detailed": false
  },
  {
    "title": "Grove White LED",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-White-LED.html",
    "interfaceKind": "analog",
    "directory": "GroveWhiteLED",
    "componentName": "GroveWhiteLED",
    "detailed": false
  },
  {
    "title": "Grove Blue LED",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Blue-LED.html",
    "interfaceKind": "analog",
    "directory": "GroveBlueLED",
    "componentName": "GroveBlueLED",
    "detailed": false
  },
  {
    "title": "Grove Collision Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Collision-Sensor.html",
    "interfaceKind": "digital",
    "directory": "GroveCollisionSensor",
    "componentName": "GroveCollisionSensor",
    "detailed": false
  },
  {
    "title": "Dragrove Generic gateway for internet of things",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Dragrove-Generic-gateway-for-internet-of-things-p-1118.html",
    "interfaceKind": "digital",
    "directory": "GroveDragroveGenericGatewayForInternetOfThings",
    "componentName": "GroveDragroveGenericGatewayForInternetOfThings",
    "detailed": false
  },
  {
    "title": "Grove Chest Strap Heart Rate Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Chest-Strap-Heart-Rate-Sensor-p-1115.html",
    "interfaceKind": "analog",
    "directory": "GroveChestStrapHeartRateSensor",
    "componentName": "GroveChestStrapHeartRateSensor",
    "detailed": false
  },
  {
    "title": "MilCandy the Easiest Grove Controller",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/MilCandy-the-Easiest-Grove-Controller-p-1104.html",
    "interfaceKind": "digital",
    "directory": "GroveMilCandyTheEasiestGroveController",
    "componentName": "GroveMilCandyTheEasiestGroveController",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Analog Accelerometer ADXL335",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-ADXL335.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisAnalogAccelerometerADXL335",
    "componentName": "Grove3AxisAnalogAccelerometerADXL335",
    "detailed": false
  },
  {
    "title": "Grove Expansion NET Gadgeteer Compatible",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Expansion-NET-Gadgeteer-Compatible-p-1084.html",
    "interfaceKind": "uart",
    "directory": "GroveExpansionNETGadgeteerCompatible",
    "componentName": "GroveExpansionNETGadgeteerCompatible",
    "detailed": false
  },
  {
    "title": "Grove Air quality sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Air-quality-sensor-p-1065.html",
    "interfaceKind": "analog",
    "directory": "GroveAirQualitySensor",
    "componentName": "GroveAirQualitySensor",
    "detailed": false
  },
  {
    "title": "Grove Dust Sensor PPD42NS",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Dust-Sensor-PPD42NS.html",
    "interfaceKind": "analog",
    "directory": "GroveDustSensorPPD42NS",
    "componentName": "GroveDustSensorPPD42NS",
    "detailed": false
  },
  {
    "title": "Grove Ultrasonic Distance Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Ultrasonic-Distance-Sensor.html",
    "interfaceKind": "analog",
    "directory": "GroveUltrasonicDistanceSensor",
    "componentName": "GroveUltrasonicDistanceSensor",
    "detailed": false
  },
  {
    "title": "Grove Luminance Sensor",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Luminance-Sensor.html",
    "interfaceKind": "analog",
    "directory": "GroveLuminanceSensor",
    "componentName": "GroveLuminanceSensor",
    "detailed": false
  },
  {
    "title": "Grove Blueseeed HM11",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Blueseeed-HM11.html",
    "interfaceKind": "digital",
    "directory": "GroveBlueseeedHM11",
    "componentName": "GroveBlueseeedHM11",
    "detailed": false
  },
  {
    "title": "Grove Temperature Humidity Sensor High Accuracy Mini",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-High-Accuracy-Mini.html",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorHighAccuracyMini",
    "componentName": "GroveTemperatureHumiditySensorHighAccuracyMini",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Accelerometer 400g",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-400g.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisDigitalAccelerometer400g",
    "componentName": "Grove3AxisDigitalAccelerometer400g",
    "detailed": false
  },
  {
    "title": "Grove GPS Module",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-GPS-Module.html",
    "interfaceKind": "uart",
    "directory": "GroveGPSModule",
    "componentName": "GroveGPSModule",
    "detailed": false
  },
  {
    "title": "Grove Oxygen Sensor ME2 O2 f20",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Oxygen-Sensor-ME2-O2-f20.html",
    "interfaceKind": "analog",
    "directory": "GroveOxygenSensorME2O2F20",
    "componentName": "GroveOxygenSensorME2O2F20",
    "detailed": false
  },
  {
    "title": "Grove Human Presence Sensor AK9753",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Human-Presence-Sensor-AK9753.html",
    "interfaceKind": "digital",
    "directory": "GroveHumanPresenceSensorAK9753",
    "componentName": "GroveHumanPresenceSensorAK9753",
    "detailed": false
  },
  {
    "title": "Grove RS232",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RS232.html",
    "interfaceKind": "uart",
    "directory": "GroveRS232",
    "componentName": "GroveRS232",
    "detailed": false
  },
  {
    "title": "Grove Light Color Proximity Sensor TMG39931",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Light-Color-Proximity-Sensor-TMG39931-p-2879.html",
    "interfaceKind": "i2c",
    "directory": "GroveLightColorProximitySensorTMG39931",
    "componentName": "GroveLightColorProximitySensorTMG39931",
    "detailed": false
  },
  {
    "title": "Grove Triple Color E Ink Display 2 13",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Triple-Color-E-Ink-Display-2-13-p-2889.html",
    "interfaceKind": "i2c",
    "directory": "GroveTripleColorEInkDisplay213",
    "componentName": "GroveTripleColorEInkDisplay213",
    "detailed": false
  },
  {
    "title": "Grove Triple Color E Ink Display 1 54",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Triple-Color-E-Ink-Display-1-54-p-2890.html",
    "interfaceKind": "i2c",
    "directory": "GroveTripleColorEInkDisplay154",
    "componentName": "GroveTripleColorEInkDisplay154",
    "detailed": false
  },
  {
    "title": "Grove RS485",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RS485-p-2924.html",
    "interfaceKind": "uart",
    "directory": "GroveRS485",
    "componentName": "GroveRS485",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Accelerometer 200g ADXL372",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-200g-ADXL372-p-4003.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisDigitalAccelerometer200gADXL372",
    "componentName": "Grove3AxisDigitalAccelerometer200gADXL372",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Analog Accelerometer 20g ADXL356B",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-20g-ADXL356B-p-4004.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisAnalogAccelerometer20gADXL356B",
    "componentName": "Grove3AxisAnalogAccelerometer20gADXL356B",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Digital Accelerometer 40g ADXL357",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-40g-ADXL357-p-4005.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisDigitalAccelerometer40gADXL357",
    "componentName": "Grove3AxisDigitalAccelerometer40gADXL357",
    "detailed": false
  },
  {
    "title": "Grove 3 Axis Analog Accelerometer 40g ADXL356C",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-40g-ADXL356C-p-4006.html",
    "interfaceKind": "analog",
    "directory": "Grove3AxisAnalogAccelerometer40gADXL356C",
    "componentName": "Grove3AxisAnalogAccelerometer40gADXL356C",
    "detailed": false
  },
  {
    "title": "Grove W600",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-W600-p-4019.html",
    "interfaceKind": "digital",
    "directory": "GroveW600",
    "componentName": "GroveW600",
    "detailed": false
  },
  {
    "title": "Grove 0 54 Red Dual Alphanumeric Display",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-0-54-Red-Dual-Alphanumeric-Display-p-4031.html",
    "interfaceKind": "i2c",
    "directory": "Grove054RedDualAlphanumericDisplay",
    "componentName": "Grove054RedDualAlphanumericDisplay",
    "detailed": false
  },
  {
    "title": "Grove 0 54 Red Quad Alphanumeric Display",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-0-54-Red-Quad-Alphanumeric-Display-p-4032.html",
    "interfaceKind": "i2c",
    "directory": "Grove054RedQuadAlphanumericDisplay",
    "componentName": "Grove054RedQuadAlphanumericDisplay",
    "detailed": false
  },
  {
    "title": "Grove Breadboard",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Breadboard-p-4034.html",
    "interfaceKind": "digital",
    "directory": "GroveBreadboard",
    "componentName": "GroveBreadboard",
    "detailed": false
  },
  {
    "title": "Grove Single Axis Analog Accelerometer 100g ADXL1001",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Single-Axis-Analog-Accelerometer-100g-ADXL1001-p-4035.html",
    "interfaceKind": "analog",
    "directory": "GroveSingleAxisAnalogAccelerometer100gADXL1001",
    "componentName": "GroveSingleAxisAnalogAccelerometer100gADXL1001",
    "detailed": false
  },
  {
    "title": "Grove 6 Axis Digital Accelerometer Gyroscope 40g ADIS16470",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-6-Axis-Digital-Accelerometer-Gyroscope-40g-ADIS16470-p-4036.html",
    "interfaceKind": "analog",
    "directory": "Grove6AxisDigitalAccelerometerGyroscope40gADIS16470",
    "componentName": "Grove6AxisDigitalAccelerometerGyroscope40gADIS16470",
    "detailed": false
  },
  {
    "title": "MT3620 Grove Breakout",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/MT3620-Grove-Breakout-p-4043.html",
    "interfaceKind": "digital",
    "directory": "GroveMT3620GroveBreakout",
    "componentName": "GroveMT3620GroveBreakout",
    "detailed": false
  },
  {
    "title": "38mm 8 8 square matrix LED matched with Grove Green Common Anode",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Green-Common-Anode-p-4050.html",
    "interfaceKind": "analog",
    "directory": "Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode",
    "componentName": "Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode",
    "detailed": false
  },
  {
    "title": "38mm 8 8 square matrix LED matched with Grove Red Common Anode",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Red-Common-Anode-p-4051.html",
    "interfaceKind": "analog",
    "directory": "Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode",
    "componentName": "Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode",
    "detailed": false
  },
  {
    "title": "38mm 8 8 square matrix LED matched with Grove Blue Common Anode",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Blue-Common-Anode-p-4052.html",
    "interfaceKind": "analog",
    "directory": "Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode",
    "componentName": "Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode",
    "detailed": false
  },
  {
    "title": "Grove 12 bit Magnetic Rotary Position Sensor AS5600",
    "category": "Input",
    "sourceUrl": "https://www.seeedstudio.com/Grove-12-bit-Magnetic-Rotary-Position-Sensor-AS5600-p-4192.html",
    "interfaceKind": "i2c",
    "directory": "Grove12BitMagneticRotaryPositionSensorAS5600",
    "componentName": "Grove12BitMagneticRotaryPositionSensorAS5600",
    "detailed": false
  },
  {
    "title": "Grove RGB LED Ring 16 WS2813 Mini",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RGB-LED-Ring-16-WS2813-Mini-p-4201.html",
    "interfaceKind": "analog",
    "directory": "GroveRGBLEDRing16WS2813Mini",
    "componentName": "GroveRGBLEDRing16WS2813Mini",
    "detailed": false
  },
  {
    "title": "Grove RGB LED Ring 24 WS2813 Mini",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RGB-LED-Ring-24-WS2813-Mini-p-4202.html",
    "interfaceKind": "analog",
    "directory": "GroveRGBLEDRing24WS2813Mini",
    "componentName": "GroveRGBLEDRing24WS2813Mini",
    "detailed": false
  },
  {
    "title": "Grove Ultimate RGB LED Ring",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Ultimate-RGB-LED-Ring-p-4203.html",
    "interfaceKind": "analog",
    "directory": "GroveUltimateRGBLEDRing",
    "componentName": "GroveUltimateRGBLEDRing",
    "detailed": false
  },
  {
    "title": "Grove RGB LED WS2813 Mini",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RGB-LED-WS2813-Mini-p-4269.html",
    "interfaceKind": "analog",
    "directory": "GroveRGBLEDWS2813Mini",
    "componentName": "GroveRGBLEDWS2813Mini",
    "detailed": false
  },
  {
    "title": "Grove RGB LED Stick 15 WS2813 Mini",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RGB-LED-Stick-15-WS2813-Mini-p-4270.html",
    "interfaceKind": "analog",
    "directory": "GroveRGBLEDStick15WS2813Mini",
    "componentName": "GroveRGBLEDStick15WS2813Mini",
    "detailed": false
  },
  {
    "title": "Grove RGB LED Stick 20 WS2813 Mini",
    "category": "Light & LED",
    "sourceUrl": "https://www.seeedstudio.com/Grove-RGB-LED-Stick-20-WS2813-Mini-p-4271.html",
    "interfaceKind": "analog",
    "directory": "GroveRGBLEDStick20WS2813Mini",
    "componentName": "GroveRGBLEDStick20WS2813Mini",
    "detailed": false
  },
  {
    "title": "Grove MP3 V3",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-MP3-V3-p-4297.html",
    "interfaceKind": "uart",
    "directory": "GroveMP3V3",
    "componentName": "GroveMP3V3",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera IR Array MLX90640 110 degree",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90640-110-degree-p-4334.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraIRArrayMLX90640110Degree",
    "componentName": "GroveThermalImagingCameraIRArrayMLX90640110Degree",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera IR Array MLX90640 55 degree",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90640-55-degree-p-4335.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraIRArrayMLX9064055Degree",
    "componentName": "GroveThermalImagingCameraIRArrayMLX9064055Degree",
    "detailed": false
  },
  {
    "title": "Arch Mix Grove Breakout",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Arch-Mix-Grove-Breakout-p-4362.html",
    "interfaceKind": "digital",
    "directory": "GroveArchMixGroveBreakout",
    "componentName": "GroveArchMixGroveBreakout",
    "detailed": false
  },
  {
    "title": "Grove Capacitive Fingerprint Scanner",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Capacitive-Fingerprint-Scanner-p-4363.html",
    "interfaceKind": "digital",
    "directory": "GroveCapacitiveFingerprintScanner",
    "componentName": "GroveCapacitiveFingerprintScanner",
    "detailed": false
  },
  {
    "title": "Grove High Precision Barometer Sensor DPS310",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-High-Precision-Barometer-Sensor-DPS310-p-4397.html",
    "interfaceKind": "i2c",
    "directory": "GroveHighPrecisionBarometerSensorDPS310",
    "componentName": "GroveHighPrecisionBarometerSensorDPS310",
    "detailed": false
  },
  {
    "title": "Grove 8 Channel I2C Hub TCA9548A",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-8-Channel-I2C-Hub-TCA9548A-p-4398.html",
    "interfaceKind": "i2c",
    "directory": "Grove8ChannelI2CHubTCA9548A",
    "componentName": "Grove8ChannelI2CHubTCA9548A",
    "detailed": false
  },
  {
    "title": "Grove Turbidity Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Turbidity-Sensor-p-4399.html",
    "interfaceKind": "analog",
    "directory": "GroveTurbiditySensor",
    "componentName": "GroveTurbiditySensor",
    "detailed": false
  },
  {
    "title": "Grove Water Level Sensor 10CM",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Water-Level-Sensor-10CM-p-4443.html",
    "interfaceKind": "analog",
    "directory": "GroveWaterLevelSensor10CM",
    "componentName": "GroveWaterLevelSensor10CM",
    "detailed": false
  },
  {
    "title": "Grove AHT20 I2C Industrial grade temperature and humidity sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-AHT20-I2C-Industrial-grade-temperature-and-humidity-sensor-p-4497.html",
    "interfaceKind": "i2c",
    "directory": "GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor",
    "componentName": "GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor",
    "detailed": false
  },
  {
    "title": "Grove Digital PIR Motion Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Digital-PIR-Motion-Sensor-p-4524.html",
    "interfaceKind": "analog",
    "directory": "GroveDigitalPIRMotionSensor",
    "componentName": "GroveDigitalPIRMotionSensor",
    "detailed": false
  },
  {
    "title": "Grove Qwiic Hub",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Qwiic-Hub-p-4531.html",
    "interfaceKind": "digital",
    "directory": "GroveQwiicHub",
    "componentName": "GroveQwiicHub",
    "detailed": false
  },
  {
    "title": "Grove Multichannel Gas Sensor v2",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Multichannel-Gas-Sensor-v2-p-4569.html",
    "interfaceKind": "analog",
    "directory": "GroveMultichannelGasSensorV2",
    "componentName": "GroveMultichannelGasSensorV2",
    "detailed": false
  },
  {
    "title": "Grove Doppler Radar BGT24LTR11",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Doppler-Radar-BGT24LTR11-p-4572.html",
    "interfaceKind": "digital",
    "directory": "GroveDopplerRadarBGT24LTR11",
    "componentName": "GroveDopplerRadarBGT24LTR11",
    "detailed": false
  },
  {
    "title": "Grove ADS1115 16 bit ADC",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-ADS1115-16-bit-ADC-p-4599.html",
    "interfaceKind": "i2c",
    "directory": "GroveADS111516BitADC",
    "componentName": "GroveADS111516BitADC",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera IR Array MLX90641 110 degree",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90641-110-degree-p-4612.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraIRArrayMLX90641110Degree",
    "componentName": "GroveThermalImagingCameraIRArrayMLX90641110Degree",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera MLX90614 DCI IR Array with 5 FOV",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90614-DCI-IR-Array-with-5-FOV-p-4654.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV",
    "componentName": "GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera MLX90621 BAA 16x4 IR Array with 25 FOV",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90621-BAA-16x4-IR-Array-with-25-FOV-p-4655.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV",
    "componentName": "GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera MLX90614 DCC IR Array with 35 FOV",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90614-DCC-IR-Array-with-35-FOV-p-4657.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV",
    "componentName": "GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV",
    "detailed": false
  },
  {
    "title": "Grove Oxygen Sensor MIX8410",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Oxygen-Sensor-MIX8410-p-4697.html",
    "interfaceKind": "analog",
    "directory": "GroveOxygenSensorMIX8410",
    "componentName": "GroveOxygenSensorMIX8410",
    "detailed": false
  },
  {
    "title": "Grove LoRa E5 STM32WLE5JC",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-LoRa-E5-STM32WLE5JC-p-4867.html",
    "interfaceKind": "uart",
    "directory": "GroveLoRaE5STM32WLE5JC",
    "componentName": "GroveLoRaE5STM32WLE5JC",
    "detailed": false
  },
  {
    "title": "Grove Oxygen Sensor Pro Pre calibration",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Oxygen-Sensor-Pro-Pre-calibration-p-4896.html",
    "interfaceKind": "analog",
    "directory": "GroveOxygenSensorProPreCalibration",
    "componentName": "GroveOxygenSensorProPreCalibration",
    "detailed": false
  },
  {
    "title": "Grove Temperature Humidity Sensor V2 0 DHT20",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-V2-0-DHT20-p-4967.html",
    "interfaceKind": "analog",
    "directory": "GroveTemperatureHumiditySensorV20DHT20",
    "componentName": "GroveTemperatureHumiditySensorV20DHT20",
    "detailed": false
  },
  {
    "title": "Grove OLED Yellow Blue Display 0 96 SSD1315 V1 0",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-OLED-Yellow-Blue-Display-0-96-SSD1315-V1-0-p-5010.html",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDYellowBlueDisplay096SSD1315V10",
    "componentName": "GroveOLEDYellowBlueDisplay096SSD1315V10",
    "detailed": false
  },
  {
    "title": "Grove OLED Display 1 12 SH1107 V3 0",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-OLED-Display-1-12-SH1107-V3-0-p-5011.html",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay112SH1107V30",
    "componentName": "GroveOLEDDisplay112SH1107V30",
    "detailed": false
  },
  {
    "title": "Grove OLED Display 0 66 SSD1306 v1 0",
    "category": "Display",
    "sourceUrl": "https://www.seeedstudio.com/Grove-OLED-Display-0-66-SSD1306-v1-0-p-5096.html",
    "interfaceKind": "i2c",
    "directory": "GroveOLEDDisplay066SSD1306V10",
    "componentName": "GroveOLEDDisplay066SSD1306V10",
    "detailed": false
  },
  {
    "title": "Grove Formaldehyde Sensor SFA30",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Formaldehyde-Sensor-SFA30-p-5204.html",
    "interfaceKind": "i2c",
    "directory": "GroveFormaldehydeSensorSFA30",
    "componentName": "GroveFormaldehydeSensorSFA30",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera MLX90641 BCB 16x12 IR Array with 55 FOV",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90641-BCB-16x12-IR-Array-with-55-FOV-p-5265.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV",
    "componentName": "GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV",
    "detailed": false
  },
  {
    "title": "Grove Thermal Imaging Camera MLX90621 BAB 16x4 IR Array with 60 FOV",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90621-BAB-16x4-IR-Array-with-60-FOV-p-5266.html",
    "interfaceKind": "i2c",
    "directory": "GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV",
    "componentName": "GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV",
    "detailed": false
  },
  {
    "title": "Grove All in one Environmental Sensor SEN55",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-All-in-one-Environmental-Sensor-SEN55-p-5373.html",
    "interfaceKind": "i2c",
    "directory": "GroveAllInOneEnvironmentalSensorSEN55",
    "componentName": "GroveAllInOneEnvironmentalSensorSEN55",
    "detailed": false
  },
  {
    "title": "Grove All in one Environmental Sensor SEN54",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-All-in-one-Environmental-Sensor-SEN54-p-5374.html",
    "interfaceKind": "i2c",
    "directory": "GroveAllInOneEnvironmentalSensorSEN54",
    "componentName": "GroveAllInOneEnvironmentalSensorSEN54",
    "detailed": false
  },
  {
    "title": "Grove Temp Humi Sensor SHT41",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT41-p-5383.html",
    "interfaceKind": "i2c",
    "directory": "GroveTempHumiSensorSHT41",
    "componentName": "GroveTempHumiSensorSHT41",
    "detailed": false
  },
  {
    "title": "Grove Temp Humi Sensor SHT40",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT40-p-5384.html",
    "interfaceKind": "i2c",
    "directory": "GroveTempHumiSensorSHT40",
    "componentName": "GroveTempHumiSensorSHT40",
    "detailed": false
  },
  {
    "title": "Grove Gas Sensor BME688",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Gas-Sensor-BME688-p-5478.html",
    "interfaceKind": "i2c",
    "directory": "GroveGasSensorBME688",
    "componentName": "GroveGasSensorBME688",
    "detailed": false
  },
  {
    "title": "Grove AC Voltage sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-AC-Voltage-sensor-p-5540.html",
    "interfaceKind": "analog",
    "directory": "GroveACVoltageSensor",
    "componentName": "GroveACVoltageSensor",
    "detailed": false
  },
  {
    "title": "Grove Wizfi360",
    "category": "Catalogue",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Wizfi360-p-5541.html",
    "interfaceKind": "digital",
    "directory": "GroveWizfi360",
    "componentName": "GroveWizfi360",
    "detailed": false
  },
  {
    "title": "Grove Air Quality Sensor SGP41",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Air-Quality-Sensor-SGP41-p-5687.html",
    "interfaceKind": "i2c",
    "directory": "GroveAirQualitySensorSGP41",
    "componentName": "GroveAirQualitySensorSGP41",
    "detailed": false
  },
  {
    "title": "Grove NFC ST25DV64KC",
    "category": "Communications",
    "sourceUrl": "https://www.seeedstudio.com/Grove-NFC-ST25DV64KC-p-5688.html",
    "interfaceKind": "i2c",
    "directory": "GroveNFCST25DV64KC",
    "componentName": "GroveNFCST25DV64KC",
    "detailed": false
  },
  {
    "title": "Grove Air Quality Sensor SGP40",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Air-Quality-Sensor-SGP40-p-5700.html",
    "interfaceKind": "i2c",
    "directory": "GroveAirQualitySensorSGP40",
    "componentName": "GroveAirQualitySensorSGP40",
    "detailed": false
  },
  {
    "title": "Grove Smart IR Gesture Sensor",
    "category": "Sensor",
    "sourceUrl": "https://www.seeedstudio.com/Grove-Smart-IR-Gesture-Sensor-p-5721.html",
    "interfaceKind": "analog",
    "directory": "GroveSmartIRGestureSensor",
    "componentName": "GroveSmartIRGestureSensor",
    "detailed": false
  }
]
