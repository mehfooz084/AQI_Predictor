# 🌍 Air Quality Index (AQI) Predictor

A Machine Learning-powered web application that predicts Air Quality Index (AQI) using pollutant concentrations and provides air quality categories with health recommendations.

## Features
- AQI Prediction using Random Forest Regression
- Real-time AQI Calculation
- Health Advisory System
- AQI Category Classification
- Interactive Web Interface
- Flask Backend Integration

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
