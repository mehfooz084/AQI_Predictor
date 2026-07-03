# 🌍 Air Quality Index (AQI) Predictor

This project predicts the Air Quality Index (AQI) from pollutant concentrations using a Random Forest Regression model. It demonstrates the complete machine learning pipeline, including data preprocessing, exploratory data analysis, feature engineering, model training, evaluation, and deployment using Flask. Users can input pollutant concentrations to receive a predicted AQI, air quality category, and health advisory.

## Features
- Machine Learning–based AQI Prediction (Random Forest Regression)
- Data Preprocessing & Exploratory Data Analysis
- Feature Importance Analysis
- AQI Category Classification
- Personalized Health Advisory
- Interactive Flask Web Application
- Trained Model Serialization (.pkl)

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
