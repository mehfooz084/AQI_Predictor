# 🌍 Air Quality Index (AQI) Predictor

This project predicts AQI from pollutant concentrations using a Random Forest model trained on the provided dataset. The web application is intended as a demonstration of the machine learning pipeline and should not be interpreted as reproducing official live AQI values from external providers.

## Features
- AQI Prediction using Random Forest Regression
- Real-time AQI Calculation
- Health Advisory System
- AQI Category Classification
- Interactive Web Interface
- Flask Backend Integration

## Live Demo 
- https://aqipredictor-production-c30c.up.railway.app/
## Tech Stack
- Python
- Flask
- Scikit-Learn
- Pandas
- NumPy
- HTML
- CSS
- JavaScript

## Model Performance
- Algorithm: Random Forest Regressor
- R² Score: 0.892
- Accuracy: 89.2%
- MAE: 21.57
- RMSE: 42.35

## Input Features
- PM2.5
- PM10
- CO
- NO

## AQI Categories
| AQI Range | Category |
|------------|------------|
| 0-50 | Good |
| 51-100 | Satisfactory |
| 101-200 | Moderate |
| 201-300 | Poor |
| 301-400 | Very Poor |
| 401+ | Severe |

## Installation

```bash
pip install -r requirements.txt
python app.py
