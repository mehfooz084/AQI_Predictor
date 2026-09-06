# 🌍 AQI Predictor

A **Machine Learning-based Air Quality Prediction System** that uses real-time air-quality data from the **Open-Meteo API** and a trained Python machine-learning model to predict the Air Quality Index (AQI).

Users can check AQI for their **current location** or enter a location manually. The application fetches real-time pollutant measurements based on the selected location and passes them to the trained ML model for AQI prediction.

## 🚀 Features

* 📍 **My Location / Live Location** using browser geolocation
* 🔎 **Enter Location** to check AQI for a specific location
* 🌐 Real-time air-quality data using Open-Meteo
* 🤖 Machine Learning-based AQI prediction
* 📊 Uses pollutant values including:

  * PM2.5
  * PM10
  * Carbon Monoxide (CO)
  * Nitrogen Dioxide (NO₂)
* 📈 Displays the predicted AQI
* 📱 Responsive user interface
* 🔄 Dynamic location-based predictions


## Live Demo 
-https://aqi-predictor-gzsv.vercel.app/
## 🧠 How It Works

The application follows a simple end-to-end ML prediction pipeline:

```text
User selects location
        ↓
Get Latitude & Longitude
        ↓
Open-Meteo Air Quality API
        ↓
Fetch real-time pollutant values
        ↓
Prepare model input features
        ↓
Trained ML Model (.pkl)
        ↓
Predict AQI
        ↓
Display predicted AQI
```

## 🌐 Open-Meteo API

The application uses the **Open-Meteo Air Quality API** to fetch real-time air-quality measurements based on latitude and longitude.

API endpoint:

`https://air-quality-api.open-meteo.com/v1/air-quality`

The following parameters are retrieved:

* `pm10`
* `pm2_5`
* `carbon_monoxide`
* `nitrogen_dioxide`

These values are then provided as input to the trained machine-learning model.

## 🤖 Machine Learning Model

The AQI prediction is performed using a **trained machine-learning model saved as a `.pkl` file**.

The model receives pollutant measurements obtained from Open-Meteo and generates the predicted AQI.

### Prediction Pipeline

```text
Real-time pollutant data
        ↓
Feature preprocessing
        ↓
Trained ML model
        ↓
AQI prediction
```

The `.pkl` model contains the trained model used by the application for making predictions.

## 📍 Location-Based Prediction

### My Location

The browser's **Geolocation API** is used to obtain the user's current latitude and longitude.

These coordinates are sent to Open-Meteo to retrieve the corresponding air-quality measurements, which are then passed to the ML model.

### Enter Location

Users can enter a location manually. The application obtains the corresponding latitude and longitude and uses them to fetch air-quality data from Open-Meteo.

## 🛠️ Tech Stack

* **Python**
* **Machine Learning**
* **Scikit-learn**
* **Pickle (.pkl)**
* **Open-Meteo Air Quality API**
* **HTML**
* **CSS**
* **JavaScript**
* **Browser Geolocation API**

## 🔄 Data Flow

```text
Location
   ↓
Latitude & Longitude
   ↓
Open-Meteo API
   ↓
PM2.5 | PM10 | CO | NO₂
   ↓
ML Model (.pkl)
   ↓
Predicted AQI
   ↓
AQI Result
```

## 🎯 Project Objective

The objective of this project is to combine **real-time air-quality data** with a **machine-learning model** to provide location-based AQI predictions.

Instead of relying on manually entered or static pollutant values, the application dynamically retrieves current air-quality measurements from Open-Meteo and uses them as inputs for the trained ML model.

## 📌 Key Highlights

* Real-time pollutant data
* Machine-learning-based AQI prediction
* Location-based predictions
* Browser-based live location detection
* Trained `.pkl` model integration
* Dynamic API-driven input data

## 🌐 Data Source

[Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api?utm_source=chatgpt.com)


