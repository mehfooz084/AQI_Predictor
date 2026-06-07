"""
AQI Predictor — Flask Backend
Loads a pre-trained Random Forest model and serves predictions
via a JSON API endpoint at POST /predict.
"""

from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# ── Load model once at startup ────────────────────────────────
try:
    model = joblib.load("aqi_model_4features.pkl")
    print("[AQI] Model loaded successfully.")
except FileNotFoundError:
    model = None
    print("[AQI] WARNING: aqi_model_4features.pkl not found. Predictions will fail.")


# ── Routes ────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded."}), 503

    data = request.get_json(force=True)

    try:
        pm25 = float(data["pm25"])
        pm10 = float(data["pm10"])
        co   = float(data["co"])
        no   = float(data["no"])
    except (KeyError, ValueError, TypeError):
        return jsonify({"error": "Invalid input. Provide pm25, pm10, co, no as numbers."}), 400

    features = np.array([[pm25, co, no, pm10]])   # match training column order
    aqi = float(model.predict(features)[0])

    return jsonify({"aqi": round(aqi)})


# ── Run ───────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
