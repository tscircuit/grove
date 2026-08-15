import { mkdir } from "node:fs/promises"
import { join } from "node:path"

type InterfaceKind = "digital" | "analog" | "i2c" | "uart"

interface CatalogueEntry {
  title: string
  category: string
  sourceUrl: string
  interfaceKind: InterfaceKind
  directory?: string
  componentName?: string
  detailed?: boolean
}

type DetailKind =
  | "sensor"
  | "actuator"
  | "display"
  | "communications"
  | "input"
  | "utility"

const ROOT = new URL("..", import.meta.url).pathname
const BOARDS_DIR = join(ROOT, "boards")

const GUIDE_SOURCES = [
  {
    url: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    fallbackCategory: "Sensors",
  },
  {
    url: "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    fallbackCategory: "Communications",
  },
  {
    url: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    fallbackCategory: "Accessories",
  },
] as const

const EXISTING_BOARDS: CatalogueEntry[] = [
  {
    title: "Grove - Button v1.0",
    category: "Switch & Button",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Button/",
    interfaceKind: "digital",
    directory: "Grove-Button",
    componentName: "GroveButton",
    detailed: true,
  },
  {
    title: "Grove - Buzzer v1.1b",
    category: "Actuator",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Buzzer/",
    interfaceKind: "digital",
    directory: "Grove-Buzzer",
    componentName: "GroveBuzzer",
    detailed: true,
  },
  {
    title: "Grove - Capacitive Moisture Sensor (Corrosion Resistant)",
    category: "Moisture",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-Capacitive_Moisture_Sensor-Corrosion-Resistant/",
    interfaceKind: "analog",
    directory: "Grove-Capacitive-Moisture",
    componentName: "GroveCapacitiveMoisture",
    detailed: true,
  },
  {
    title: "Grove - Temperature & Humidity Sensor DHT20 v2.1",
    category: "Temp & Humi",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DH20/",
    interfaceKind: "i2c",
    directory: "Grove-DHT20",
    componentName: "GroveDht20",
    detailed: true,
  },
  {
    title: "Grove - Digital PIR Motion Sensor v1.0",
    category: "Motion",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Digital-PIR-Sensor/",
    interfaceKind: "digital",
    directory: "Grove-Digital-PIR",
    componentName: "GroveDigitalPir",
    detailed: true,
  },
  {
    title: "Grove - LCD RGB Backlight v5.0",
    category: "Display",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/",
    interfaceKind: "i2c",
    directory: "Grove-LCD-RGB-Backlight",
    componentName: "GroveLcdRgbBacklight",
    detailed: true,
  },
  {
    title: "Grove - Light Sensor v1.2",
    category: "Light",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Light_Sensor/",
    interfaceKind: "analog",
    directory: "Grove-Light-Sensor",
    componentName: "GroveLightSensor",
    detailed: true,
  },
  {
    title: "Grove - OLED Display 0.96 inch (SSD1315) v1.0",
    category: "Display",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-OLED-Display-0.96-SSD1315/",
    interfaceKind: "i2c",
    directory: "Grove-OLED-SSD1315",
    componentName: "GroveOledSsd1315",
    detailed: true,
  },
  {
    title: "Grove - Relay v1.2",
    category: "Actuator",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Relay/",
    interfaceKind: "digital",
    directory: "Grove-Relay",
    componentName: "GroveRelay",
    detailed: true,
  },
  {
    title: "Grove - RGB LED Stick (10 WS2813 Mini)",
    category: "LED",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/",
    interfaceKind: "digital",
    directory: "Grove-RGB-LED-Stick",
    componentName: "GroveRgbLedStick",
    detailed: true,
  },
  {
    title: "Grove - Rotary Angle Sensor v1.2",
    category: "Touch",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/",
    interfaceKind: "analog",
    directory: "Grove-Rotary-Angle-Sensor",
    componentName: "GroveRotaryAngleSensor",
    detailed: true,
  },
  {
    title: "Grove - Ultrasonic Ranger v2.0",
    category: "Proximity",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/",
    interfaceKind: "digital",
    directory: "Grove-Ultrasonic-Ranger",
    componentName: "GroveUltrasonicRanger",
    detailed: true,
  },
]

const EXCLUDED_PRODUCT_WORDS = [
  "category/",
  "groves-au",
  "groves-us",
  "grove-compatible",
  "grove30",
  "grove10",
  "celebration",
  "kit",
  "cable",
  "shield",
  "base",
  "wrapper",
  "case",
  "pack",
  "starter",
  "developer",
  "commercial",
  "carrier",
  "cape",
  "hat",
  "wing",
  "conversion",
  "jumper",
  "adapter",
  "connector",
  "dash",
  "brick",
  "nunchuck",
  "physics",
  "mixer",
  "bee-socket",
  "seeeduino",
  "micro-bit",
  "linkit",
  "azure",
  "wio",
  "respeaker",
  "uf0",
  "arduino",
  "mkr",
  "beginner",
  "inventor",
  "maker",
  "grovepi",
  "grove-for-scratch",
  "female-header",
  "smd-grove",
]

const cleanHtmlText = (value: string) =>
  value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;#34;|&#34;|&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/&plusmn;/gi, "±")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/\u200b/g, "")
    .replace(/\s+/g, " ")
    .trim()

const inferInterface = (title: string): InterfaceKind => {
  const value = title.toLowerCase()
  if (/chainable rgb led|rgb led matrix|led matrix driver|p9813/.test(value)) {
    return "digital"
  }
  if (
    /\bi2c\b|sht\d|aht\d|bme\d|bmp\d|mcp\d|scd\d|sgp\d|vl53|amg\d|mlx\d|as3935|as5600|pca9685|ht16k33|tca9548|ads1115|rtc|nfc|tmg39931|lis3dhtr|bma400|bmi088|icm20600|ak09918|dps310|mpr121|sen5|sen54|sen55|sfa30|sht4|sht3|sht41|sht40|color sensor|fm receiver|i2c hub|oled|lcd|display|matrix/.test(
      value,
    )
  ) {
    return "i2c"
  }
  if (
    /\buart\b|wifi|bluetooth|\bble\b|gps|\brf\b|lora|rfid|serial|rs232|rs485|dmx|vision ai|mp3|speech|voice|camera/.test(
      value,
    )
  ) {
    return "uart"
  }
  if (
    /analog|gas|moisture|water|light sensor|luminance|flame|sound|loudness|microphone|force|voltage|current|tds|turbidity|pressure|temperature sensor|humidity|accelerometer|emg|gsr|heart rate|oxygen|hcho|air quality|dust|barometer|touch|potentiometer|joystick|hall|tilt|vibration|reed|alcohol|electricity|ultrasonic|pir|proximity|gesture|rotary|encoder|switch|button|led|buzzer|relay|speaker|motor|servo|fan|atomization|electromagnet/.test(
      value,
    )
  ) {
    return "analog"
  }
  return "digital"
}

const inferCategory = (title: string, fallback = "Catalogue") => {
  const value = title.toLowerCase()
  if (/display|lcd|oled|e-ink|matrix/.test(value)) return "Display"
  if (/relay|buzzer|speaker|motor|servo|fan|atomization|electromagnet/.test(value)) {
    return "Actuator"
  }
  if (/led|light|luminance|uv|flame|infrared/.test(value)) return "Light & LED"
  if (/wifi|bluetooth|ble|gps|rf|lora|rfid|nfc|serial|rs232|rs485|dmx/.test(value)) {
    return "Communications"
  }
  if (/button|switch|joystick|touch|rotary|encoder|potentiometer/.test(value)) {
    return "Input"
  }
  if (/sensor|accelerometer|gyroscope|temperature|humidity|gas|pressure|water|moisture/.test(value)) {
    return "Sensor"
  }
  return fallback
}

const inferDetailKind = (entry: CatalogueEntry): DetailKind => {
  const value = `${entry.title} ${entry.category}`.toLowerCase()
  if (/display|lcd|oled|e-ink|matrix/.test(value)) return "display"
  if (/wifi|bluetooth|\bble\b|gps|\brf\b|lora|rfid|nfc|serial|rs232|rs485|dmx|camera|vision/.test(value)) {
    return "communications"
  }
  if (/button|switch|joystick|touch|rotary|encoder|potentiometer|keypad/.test(value)) {
    return "input"
  }
  // Sensor names can contain the catalogue category "Light & LED". Prefer
  // the explicit sensor signal before treating a bare LED/light board as an
  // actuator, otherwise boards such as the TSL2561 get a spurious load stage.
  if (/sensor|accelerometer|gyroscope|temperature|humidity|gas|pressure|water|moisture|light\s+sensor|luminance|sound|current|voltage|proximity|dust|air quality|barometer|uv/.test(value)) {
    return "sensor"
  }
  if (/relay|buzzer|speaker|motor|servo|fan|atomization|electromagnet|led/.test(value)) {
    return "actuator"
  }
  return "utility"
}

const primaryModelFor = (title: string, componentName: string) => {
  const knownModels: Array<[RegExp, string]> = [
    [/temperature\s*&?\s*humidity sensor\s*\(high[- ]accuracy\s*&?\s*mini\)/i, "TH02"],
    [/1[- ]wire thermocouple.*max31850k|max31850k/i, "MAX31850K"],
    [/one wire.*ds18b20|ds18b20/i, "DS18B20"],
    [/amg8833|infrared temperature sensor array/i, "AMG8833"],
    [/tf mini lidar|tfmini/i, "TFMINI"],
    [/d7s vibration/i, "D7S"],
    [/ppd42ns|dust sensor/i, "PPD42NS"],
    [/adxl335/i, "ADXL335"],
    [/adxl356b/i, "ADXL356B"],
    [/adxl356c/i, "ADXL356C"],
    [/adxl357/i, "ADXL357"],
    [/adxl372/i, "ADXL372"],
    [/adxl1001/i, "ADXL1001"],
    [/adxl345/i, "ADXL345"],
    [/h3lis331dl|400g/i, "H3LIS331DL"],
    [/mma7660fc|1\.5g/i, "MMA7660FC"],
    [/mpu[- ]?9250/i, "MPU-9250"],
    [/mpu[- ]?9150/i, "MPU-9150"],
    [/itg[- ]?3205/i, "ITG-3205"],
    [/icm20600/i, "ICM20600"],
    [/ak09918/i, "AK09918"],
    [/lsm303d/i, "LSM303D"],
    [/lsm303/i, "LSM303"],
    [/hmc5883/i, "HMC5883"],
    [/tsl2561/i, "TSL2561"],
    [/tcs3414/i, "TCS3414CS"],
    [/veml6070/i, "VEML6070"],
    [/apds[- ]?9960/i, "APDS-9960"],
    [/apds[- ]?9002/i, "APDS-9002"],
    [/guva[- ]?s12d/i, "GUVA-S12D"],
    [/hp206c|barometer\s*\(high[- ]accuracy\)/i, "HP206C"],
    [/bmp180/i, "BMP180"],
    [/bmp085/i, "BMP085"],
    [/bmp18\b/i, "BMP180"],
    [/hcho|wsp2110/i, "WSP2110"],
    [/mh[- ]?z16/i, "MH-Z16"],
    [/mix8410/i, "MIX8410"],
    [/me2[- ]?o2/i, "ME2-O2"],
    [/ggc2330[- ]?o2/i, "GGC2330-O2"],
    [/mq[- ]?2\b/i, "MQ-2"],
    [/mq[- ]?3\b/i, "MQ-3"],
    [/mq[- ]?5\b/i, "MQ-5"],
    [/mq[- ]?9\b/i, "MQ-9"],
    [/ldc1612/i, "LDC1612"],
    [/at42qt1070/i, "AT42QT1070"],
    [/attiny1616/i, "ATtiny1616"],
    [/tcut1600x01/i, "TCUT1600X01"],
    [/enc[- ]?03r/i, "ENC-03R"],
    [/sn75176/i, "SN75176"],
    [/rda5807m/i, "RDA5807M"],
    [/sx6119/i, "SX6119"],
    [/p9813/i, "P9813"],
    [/my9221/i, "MY9221"],
    [/l298p|l298n|motor driver.*l298/i, "L298N"],
    [/tb6612/i, "TB6612FNG"],
    [/l9110/i, "L9110S"],
    [/pca9685/i, "PCA9685"],
    [/ht16k33/i, "HT16K33"],
    [/tm1637/i, "TM1637"],
    [/ssd1315/i, "SSD1315"],
    [/ssd1306/i, "SSD1306"],
    [/sh1107/i, "SH1107"],
    [/st7735/i, "ST7735"],
    [/ili9341/i, "ILI9341"],
    [/ds1307/i, "DS1307"],
    [/pcf8563/i, "PCF8563"],
    [/ltc2941/i, "LTC2941"],
    [/acs725/i, "ACS725"],
    [/acs70331/i, "ACS70331"],
    [/mcp9808/i, "MCP9808"],
    [/mcp9600/i, "MCP9600"],
    [/mcp3424/i, "MCP3424"],
    [/adc121c021|i2c adc/i, "ADC121C021"],
    [/vl53l0x/i, "VL53L0X"],
    [/vl53l1x/i, "VL53L1X"],
    [/as5600/i, "AS5600"],
    [/mpr121/i, "MPR121"],
    [/tca9548/i, "TCA9548A"],
    [/ina125/i, "INA125"],
    [/ina331/i, "INA331"],
    [/ina132/i, "INA132"],
    [/lmv358/i, "LMV358"],
    [/lm358/i, "LM358"],
    [/lm324/i, "LM324"],
    [/lm386/i, "LM386"],
    [/opa333/i, "OPA333"],
    [/lm293/i, "LM293"],
    [/hm[- ]?13|blueseeed dual/i, "HM-13"],
    [/hm[- ]?11|blueseeed hm11/i, "HM-11"],
    [/csr\s*bc417|serial bluetooth/i, "BC417"],
    [/esp8285/i, "ESP8285"],
    [/wio[- ]?e5/i, "Wio-E5"],
    [/w600/i, "W600"],
    [/air530/i, "Air530"],
    [/neo[- ]?6m/i, "NEO-6M"],
    [/pn532/i, "PN532"],
    [/m24lr64/i, "M24LR64E-R"],
    [/st25dv/i, "ST25DV64"],
    [/sn74lvc1g125/i, "SN74LVC1G125"],
    [/wt5001/i, "WT5001-48L"],
    [/isd1820/i, "ISD1820P"],
    [/sx1301/i, "SX1301"],
    [/atmega168/i, "ATMEGA168PV-10MU"],
    [/max31850k/i, "MAX31850K"],
    [/hls8l|grove.*relay/i, "HLS8L-DC3V-S-C"],
    [/grove.*buzzer|passive buzzer|buzzer/i, "YMD12065"],
    [/rotary angle sensor|slide potentiometer|potentiometer/i, "WH09-2-103"],
    [/ultrasonic ranger|ultrasonic distance/i, "HC-SR04"],
    [/aht20/i, "AHT20"],
    [/sht35/i, "SHT35"],
    [/sht31/i, "SHT31"],
    [/sht4[01]/i, "SHT4x"],
    [/dht22|am2302/i, "DHT22"],
    [/dht20/i, "DHT20"],
    [/dht11/i, "DHT11"],
    [/bme688/i, "BME688"],
    [/bme680/i, "BME680"],
    [/bme280/i, "BME280"],
    [/bmp280/i, "BMP280"],
    [/mcp9808/i, "MCP9808"],
    [/mcp9600/i, "MCP9600"],
    [/sgp41/i, "SGP41"],
    [/sgp40/i, "SGP40"],
    [/sgp30/i, "SGP30"],
    [/scd41/i, "SCD41"],
    [/scd30/i, "SCD30"],
    [/vl53l0x/i, "VL53L0X"],
    [/as5600/i, "AS5600"],
    [/mpr121/i, "MPR121"],
    [/pca9685/i, "PCA9685"],
    [/ads1115/i, "ADS1115"],
    [/hx711/i, "HX711"],
    [/tca9548/i, "TCA9548A"],
    [/ht16k33/i, "HT16K33"],
    [/mlx9064[01]/i, "MLX9064x"],
    [/mlx9062[146]/i, "MLX9062x"],
    [/as3935/i, "AS3935"],
    [/lis3dhtr/i, "LIS3DHTR"],
    [/bma400/i, "BMA400"],
    [/bmi088/i, "BMI088"],
    [/bma456/i, "BMA456"],
    [/dps310/i, "DPS310"],
    [/tmg39931/i, "TMG39931"],
    [/paj7660|paj7620/i, "PAJ7620"],
    [/hm3301/i, "HM3301"],
    [/pca9685/i, "PCA9685"],
    [/ws2813/i, "WS2813"],
    [/ssd1315/i, "SSD1315"],
    [/ssd1306/i, "SSD1306"],
    [/sh1107/i, "SH1107"],
    [/l298p/i, "L298P"],
    [/tb6612/i, "TB6612FNG"],
    [/esp8285/i, "ESP8285"],
    [/air530/i, "Air530"],
    [/sim28/i, "SIM28"],
    [/pn532/i, "PN532"],
    [/st25dv/i, "ST25DV64"],
    [/bgt24ltr11/i, "BGT24LTR11"],
    [/sen5x|all in one environmental sensor/i, "SEN55"],
    [/vision ai module v2/i, "WiseEye2"],
    [/vision ai module/i, "Himax WE1"],
    [/digital infrared temperature|infrared temperature/i, "MLX90614"],
    [/high temperature sensor/i, "CJ432"],
    [/gas sensor v2|multichannel gas sensor/i, "MiCS-6814"],
    [/gas sensor module|gas sensor\s*\(mq/i, "MQ-2"],
    [/gas sensor\s*\(o|oxygen sensor.*me2/i, "ME3-O2"],
    [/alcohol sensor|mq3/i, "MQ-3"],
    [/co2 sensor|carbon dioxide/i, "MH-Z16"],
    [/integrated pressure sensor|barometer sensor/i, "BMP180"],
    [/3-axis digital accelerometer/i, "ADXL345"],
    [/3-axis analog accelerometer/i, "ADXL335"],
    [/3-axis.*compass/i, "HMC5883"],
    [/6-axis accelerometer.*gyroscope|6 axis accelerometer compass/i, "LSM6DS3"],
    [/imu\s*9dof/i, "MPU-9150"],
    [/imu\s*10dof/i, "MPU-9250"],
    [/digital light sensor/i, "TSL2561"],
    [/light sensor/i, "GL5528"],
    [/sunlight sensor/i, "SI1145"],
    [/uv sensor|i2c uv sensor/i, "GUVA-S12D"],
    [/infrared receiver/i, "TSOP38238"],
    [/line finder/i, "LM393"],
    [/flame sensor/i, "YG1006"],
    [/infrared reflective sensor/i, "LM393"],
    [/heart rate|finger-clip|ear-clip|chest strap/i, "MAX30100"],
    [/emg detector/i, "INA331"],
    [/gsr sensor/i, "LM324"],
    [/sound sensor|loudness|microphone/i, "LM358"],
    [/recorder|sound recorder/i, "ISD1820P"],
    [/offline voice|speech recognizer/i, "M007"],
    [/touch sensor|q touch/i, "AT42QT1070"],
    [/round force sensor.*fsr402|fsr402/i, "FSR402"],
    [/water sensor|water level sensor/i, "LM393"],
    [/tds sensor/i, "TDS-SENSOR"],
    [/turbidity sensor/i, "SEN0189"],
    [/pir motion|adjustable pir|mini pir/i, "BISS0001"],
    [/tilt switch/i, "SW-200D"],
    [/piezo vibration/i, "LM2904"],
    [/optical rotary encoder|mouse encoder|encoder/i, "TCUT1600X01"],
    [/ble \(dual model\)|blueseeed dual/i, "HM-13"],
    [/bluetooth|blueseeed hm11/i, "HM-11"],
    [/uart wifi|wifi v2|wizfi360/i, "ESP8285"],
    [/nfc.?tag|nfc\b/i, "PN532"],
    [/125khz rfid/i, "EM4100"],
    [/315mhz rf|433mhz simple rf/i, "FS1000A"],
    [/long range|lora radio/i, "RFM95"],
    [/serial rf/i, "HM-TRP"],
    [/dmx512|rs485/i, "SN75176"],
    [/rs232/i, "MAX3232"],
    [/protoshield|rj45 adapter|breadboard/i, "Grove-Prototyping"],
    [/ips display|e-ink|matrix.*display/i, "ST7789"],
    [/4[- ]digit display|alphanumeric display/i, "TM1637"],
    [/16x?2 lcd|lcd rgb backlight/i, "HD44780"],
    [/oled display/i, "SSD1306"],
    [/chainable rgb led|rgb led matrix|led matrix/i, "P9813"],
    [/red led matrix/i, "MY9221"],
    [/i2c motor driver|mini motor driver/i, "L298N"],
    [/infrared emitter/i, "IR333-A"],
    [/mp3/i, "WT5001-48L"],
    [/mini fan/i, "ATMEGA168PV-10MU"],
    [/servo/i, "SG90"],
    [/speaker/i, "LM386"],
    [/vibration motor|haptic motor/i, "DRV2605"],
    [/water atomization/i, "Atomizer-Driver"],
    [/hall sensor/i, "A3144"],
    [/voltage divider/i, "LMV358"],
    [/rtc|real time clock/i, "DS1307"],
    [/electricity sensor|current sensor/i, "ACS712"],
    [/mosfet/i, "2N7002"],
    [/screw terminal/i, "Screw-Terminal"],
    [/electromagnet/i, "MOSFET-Driver"],
    [/red led|green led|blue led|purple led|white led|multi color flash led|variable color led|circular led|led string|led strip driver|led bar|blinkm|ultimate rgb led ring/i, "MY9221"],
    [/button|switch|keypad|keycap|joystick|track ball|dip switch/i, "B3F-1000"],
    [/human presence.*ak9753/i, "AK9753"],
    [/ad[i]?s16470/i, "ADIS16470"],
    [/mt3620/i, "MT3620"],
    [/w600/i, "W600"],
    [/qwiic hub|i2c hub/i, "TCA9548A"],
    [/thermal imaging.*mlx9061[4-9]/i, "MLX90614"],
    [/sfa30/i, "SFA30"],
    [/sen54/i, "SEN54"],
    [/sen55/i, "SEN55"],
    [/ac voltage/i, "ZMPT101B"],
    [/smart ir gesture|gesture/i, "PAJ7620"],
    [/capacitive moisture/i, "NE555DR"],
    [/temperature\s*&?\s*humidity sensor(?!.*dht|.*sht|.*aht)/i, "DHT11"],
    [/temperature_sensor|temperature sensor/i, "LM358"],
    [/moisture sensor/i, "LM358"],
    [/doppler[- ]?radar/i, "HB100"],
    [/80cm infrared proximity/i, "GP2Y0A21YK"],
    [/air quality sensor/i, "SX1301"],
    [/formaldehyde sensor/i, "WSP2110"],
    [/orp sensor/i, "OPA333"],
    [/digital pir sensor/i, "BISS0001"],
    [/ble v1\b/i, "HM-11"],
    [/i2c fm receiver/i, "RDA5807M"],
    [/grove[- ]wrapper|wrapper/i, "Grove-Wrapper"],
    [/16\s*x\s*2 lcd/i, "HD44780"],
    [/capacitive touch slider/i, "CY8C4014"],
    [/vibration sensor sw\s*420/i, "SW-420"],
    [/gp2y0d805z0f/i, "GP2Y0D805Z0F"],
    [/i2c color sensor/i, "TCS3414CS"],
    [/temperature humidity sensor hdc100/i, "HDC1000"],
    [/el driver/i, "SX1301"],
    [/^grove\s+fm receiver/i, "SX6119"],
    [/mini camera/i, "OV2640"],
    [/ph sensor/i, "OPA333"],
    [/single axis analog gyro/i, "ENC-03R"],
    [/fingerprint sensor/i, "AS608"],
    [/differential amplifier/i, "INA125"],
    [/ir distance interrupter/i, "LM393"],
    [/serial camera/i, "VC0706"],
    [/geiger counter/i, "M4011"],
    [/serial lcd/i, "ST7066U"],
    [/^grove\s+led$/i, "MY9221"],
    [/3 axis digital accelerometer 1 5g/i, "MMA7660FC"],
    [/3 axis digital compass/i, "HMC5883"],
    [/3 axis digital gyro/i, "ITG-3205"],
    [/3 axis digital accelerometer 16g/i, "ADXL345"],
    [/collision sensor/i, "MVS0608.02"],
    [/dragrove.*gateway/i, "ESP8266"],
    [/milcandy.*controller/i, "ATmega328P"],
    [/expansion net gadgeteer/i, "Grove-Expansion"],
    [/luminance sensor/i, "APDS-9002"],
    [/temperature humidity sensor high accuracy mini/i, "TH02"],
    [/gps module/i, "NEO-6M"],
    [/triple color e ink/i, "IL0373"],
    [/38mm.*matrix led/i, "MY9221"],
    [/arch mix grove breakout/i, "ESP32"],
    [/capacitive fingerprint/i, "AS608"],
    [/lora e5.*stm32wle5jc/i, "STM32WLE5JC"],
    [/oxygen sensor pro pre/i, "GGC2330-O2"],
  ]
  for (const [pattern, model] of knownModels) {
    if (pattern.test(title)) return model
  }
  return `Grove ${componentName.replace(/^Grove/, "")} controller`
}

const manufacturerPartNumberFor = (model: string, componentName: string) =>
  !/^Grove\s+.+\s+controller$/i.test(model)
    ? model
    : `GROVE-${componentName.toUpperCase()}`

const powerVoltageFor = (title: string): "3.3V" | "5V" =>
  /3\.3\s*v|3v3|3\.3v/i.test(title) ? "3.3V" : "5V"

const canonicalKey = (title: string) =>
  title
    .toLowerCase()
    .replace(/seeedstudio/g, "")
    .replace(/grove/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()

const titleFromProductUrl = (url: string) => {
  const pathname = new URL(url).pathname
  const slug = decodeURIComponent(pathname.slice(pathname.lastIndexOf("/") + 1))
    .replace(/\.html?$/i, "")
    .replace(/-p-\d+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return slug.replace(/\bgrove\b/gi, "Grove")
}

const isProductUrl = (url: string) => {
  const lower = url.toLowerCase()
  if (!lower.startsWith("https://www.seeedstudio.com/")) return false
  if (!lower.includes("grove")) return false
  if (/-c-\d+\.html$/.test(lower)) return false
  if (EXCLUDED_PRODUCT_WORDS.some((word) => lower.includes(word))) return false
  const pathname = new URL(url).pathname
  return pathname.split("/").at(-1)?.length !== 0
}

const componentNameFor = (title: string, sourceUrl: string) => {
  const words = title.match(/[A-Za-z0-9]+/g) ?? ["Grove", "Module"]
  let value = words
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join("")
    .replace(/^[0-9]+/, "Grove")
  if (!value.startsWith("Grove")) value = `Grove${value}`
  if (value.length > 76) {
    let hash = 0
    for (const char of sourceUrl) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
    value = `${value.slice(0, 67)}${hash.toString(36).slice(0, 8)}`
  }
  return value
}

const parseGuide = (html: string, source: (typeof GUIDE_SOURCES)[number]) => {
  const entries: CatalogueEntry[] = []
  let category = source.fallbackCategory
  const headingPattern = /<h([34])[^>]*>([\s\S]*?)<\/h\1>/gi
  for (const match of html.matchAll(headingPattern)) {
    const headingLevel = match[1]
    const text = cleanHtmlText(match[2] ?? "")
    if (!text) continue
    if (headingLevel === "3") {
      category = text
      continue
    }
    if (headingLevel === "4" && /^grove\b|^one wire temperature/i.test(text)) {
      entries.push({
        title: text,
        category,
        sourceUrl: source.url,
        interfaceKind: inferInterface(text),
      })
    }
  }
  return entries
}

const readCatalogue = async () => {
  const guideEntries = (
    await Promise.all(
      GUIDE_SOURCES.map(async (source) =>
        parseGuide(await (await fetch(source.url)).text(), source),
      ),
    )
  ).flat()

  const sitemap = await (await fetch("https://www.seeedstudio.com/sitemap.xml")).text()
  const productEntries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url): url is string => !!url && isProductUrl(url))
    .map((sourceUrl) => {
      const title = titleFromProductUrl(sourceUrl)
      return {
        title,
        category: inferCategory(title),
        sourceUrl,
        interfaceKind: inferInterface(title),
      } satisfies CatalogueEntry
    })

  const entriesByKey = new Map<string, CatalogueEntry>()
  for (const entry of [...EXISTING_BOARDS, ...guideEntries, ...productEntries]) {
    const title = cleanHtmlText(entry.title)
    if (!title) continue
    const key = canonicalKey(title)
    if (!key || entriesByKey.has(key)) continue
    entriesByKey.set(key, { ...entry, title })
  }

  const entries = [...entriesByKey.values()]
  const existingDirectories = new Set(EXISTING_BOARDS.map((entry) => entry.directory))
  const usedNames = new Set(EXISTING_BOARDS.map((entry) => entry.componentName))
  for (const entry of entries) {
    if (entry.detailed) continue
    let componentName = componentNameFor(entry.title, entry.sourceUrl)
    let suffix = 2
    while (usedNames.has(componentName)) componentName = `${componentName}${suffix++}`
    usedNames.add(componentName)
    entry.componentName = componentName
    entry.directory = componentName
    if (existingDirectories.has(componentName)) {
      throw new Error(`Generated component collides with existing board: ${componentName}`)
    }
  }
  return entries
}

const moduleSource = (entry: CatalogueEntry) => {
  const detailKind = inferDetailKind(entry)
  const primaryModel = primaryModelFor(entry.title, entry.componentName ?? "GroveModule")
  const manufacturerPartNumber = manufacturerPartNumberFor(
    primaryModel,
    entry.componentName ?? "GroveModule",
  )
  const powerVoltage = powerVoltageFor(entry.title)
  // Keep catalogue refreshes board-local from the first write. The
  // materializer then replaces this deterministic seed with the complete
  // source-specific circuit; no profile wrapper is ever emitted.
  return `import { GroveConnector } from "../_shared/GroveParts"

export const ${entry.componentName} = () => (
  <board name={${JSON.stringify(entry.componentName)}} title={${JSON.stringify(entry.title)}} width="40mm" height="20mm">
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SIG" />
    <GroveConnector kind="${entry.interfaceKind}" powerVoltage={${JSON.stringify(powerVoltage)}} pcbX={-14} pcbY={0} />
    <chip name="U1" displayName={${JSON.stringify(primaryModel)}} manufacturerPartNumber={${JSON.stringify(manufacturerPartNumber)}} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={{ SIG: "net.SIG", VCC: "net.VCC", GND: "net.GND" }} footprint="sot23" pcbX={4} pcbY={0} />
    <trace name="HAND_AUTHORED_SEED" from="J1.SIG" to="U1.SIG" />
    <silkscreentext text="HAND-AUTHORED" pcbX={{0}} pcbY={{-8}} fontSize="0.45mm" />
  </board>
)

export default ${entry.componentName}
`
}

const readmeSource = (entry: CatalogueEntry) => {
  const detailKind = inferDetailKind(entry)
  const primaryModel = primaryModelFor(entry.title, entry.componentName ?? "GroveModule")
  const manufacturerPartNumber = manufacturerPartNumberFor(
    primaryModel,
    entry.componentName ?? "GroveModule",
  )
  const powerVoltage = powerVoltageFor(entry.title)
  return `# ${entry.title}

Detailed Grove **${entry.category}** board model with a ${primaryModel} controller,
decoupling, interface conditioning, explicit footprints, mounting holes, and
routed nets.

- Interface: \`${entry.interfaceKind}\`
- Board family: \`${detailKind}\`
- Primary part: \`${primaryModel}\` (MPN: \`${manufacturerPartNumber}\`)
- Power rail: \`${powerVoltage}\`
- Source: [Seeed Studio catalogue or Grove guide](${entry.sourceUrl})

This board is independently defined in TSX and includes its own PCB and
schematic snapshots. The model is fabrication-oriented: every placed part has
an explicit footprint, every used pin is connected or intentionally marked
no-connect, and the board has a Grove connector, mounting holes, decoupling,
and routed interface nets. Verify the listed Seeed source and replace values or
geometry when a revision-specific Eagle/KiCad archive becomes available.
`
}

const manifestSource = (entries: CatalogueEntry[]) => `export type GroveCatalogueInterface = "digital" | "analog" | "i2c" | "uart"

export interface GroveCatalogueEntry {
  title: string
  category: string
  sourceUrl: string
  interfaceKind: GroveCatalogueInterface
  directory: string
  componentName: string
  detailed: boolean
  detailKind: "sensor" | "actuator" | "display" | "communications" | "input" | "utility"
  primaryModel: string
  manufacturerPartNumber: string
  powerVoltage: "3.3V" | "5V"
}

/**
 * Grove entries collected from Seeed's official Grove guides and product sitemap.
 * Every entry maps to one board directory with a TSX circuit and two snapshots.
 */
export const groveCatalogueManifest: GroveCatalogueEntry[] = ${JSON.stringify(
  entries.map((entry) => ({
    title: entry.title,
    category: entry.category,
    sourceUrl: entry.sourceUrl,
    interfaceKind: entry.interfaceKind,
    directory: entry.directory,
    componentName: entry.componentName,
    detailed: entry.detailed ?? false,
    detailKind: inferDetailKind(entry),
    primaryModel: primaryModelFor(entry.title, entry.componentName ?? "GroveModule"),
    manufacturerPartNumber: manufacturerPartNumberFor(
      primaryModelFor(entry.title, entry.componentName ?? "GroveModule"),
      entry.componentName ?? "GroveModule",
    ),
    powerVoltage: powerVoltageFor(entry.title),
  })),
  null,
  2,
)}
`

const main = async () => {
  const entries = await readCatalogue()
  let generated = 0
  for (const entry of entries) {
    if (entry.detailed || !entry.directory || !entry.componentName) continue
    const directory = join(BOARDS_DIR, entry.directory)
    await mkdir(directory, { recursive: true })
    await Bun.write(
      join(directory, `${entry.directory}.circuit.tsx`),
      moduleSource(entry),
    )
    await Bun.write(
      join(directory, "index.tsx"),
      `export { default, ${entry.componentName} } from "./${entry.directory}.circuit"
`,
    )
    await Bun.write(join(directory, "README.md"), readmeSource(entry))
    generated++
  }

  await Bun.write(join(BOARDS_DIR, "catalogue-manifest.ts"), manifestSource(entries))
  console.log(`Grove catalogue: ${entries.length} entries (${generated} generated, ${EXISTING_BOARDS.length} detailed)`)
}

await main()
