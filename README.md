# Azure IoT Gateway for 17 Minds Sleep Management System
This code base would be installed on an "edge" device, listen to a variety of sleep management sensors or applications, aggregate the received data in some intelligent way, and finally report that data up to Azure for analysis.

This project is a customization and implementation of the Azure IoT Gateway SDK that you can find in its entirety [on GitHub](http://github.com/azure/azure-iot-gateway-sdk). This project uses binaries pre-built on a Raspberry Pi 2 which has an ARM v6 architecture.

The Gateway SDK facilitates the creation of a data workflow by implementing _modules_. The actual code base for the Gateway SDK is low-level and cross-platform C code, but modules can be written in a variety of languages and this project uses mostly Node.js. Modifying the data workflow, then, is simply a matter of writing Node.js script files (in the `./modules` folder) and then configuring the flow in the `./config.json` file.

### Here's a description of each of the project's modules thus far...
* API Module (Node.js) - provides an HTTP REST API for reporting messages from anywhere within the gateway's network
* Aggregate Module (Node.js) - allows us to filter or otherwise process received data 
* Mapper Module (native) - maps device specific ID's to actual, registered devices in IoT Hub so that devices can be recognized, authorized, and managed
* IoT Hub Module (native) - sends messages to Azure IoT Hub
* Simulated Device Module (Node.js) - generates sample messages at regular intervals to simulate devices in the real world
* Printer Module (Node.js) - simply prints messages to the console as they are observed making development and troubleshooting easier

