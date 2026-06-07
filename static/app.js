/**
 * AQI Predictor — Production JavaScript
 * Flask API integration: POST /predict
 * Features: count-up animation, bar animation, category theming,
 *           loading state, error handling, AQI scale highlight
 */

'use strict';

/* ── AQI data ────────────────────────────────────────────── */
const AQI_LEVELS = [
  {
    max: 50, key: 'good', label: 'Good',
    color: '#22c55e', chipClass: 'chip-good', barClass: 'bar-good',
    catKey: 'good',
    advice: 'Air quality is satisfactory. No health risk — enjoy outdoor activities freely.'
  },
  {
    max: 100, key: 'satisfactory', label: 'Satisfactory',
    color: '#86efac', chipClass: 'chip-satisf', barClass: 'bar-satisf',
    catKey: 'satisfactory',
    advice: 'Minor breathing discomfort may occur for sensitive individuals such as those with asthma or respiratory conditions.'
  },
  {
    max: 200, key: 'moderate', label: 'Moderate',
    color: '#facc15', chipClass: 'chip-moderate', barClass: 'bar-moderate',
    catKey: 'moderate',
    advice: 'Sensitive groups should reduce prolonged outdoor activity. People with heart or lung disease, children, and older adults should take care.'
  },
  {
    max: 300, key: 'poor', label: 'Poor',
    color: '#f97316', chipClass: 'chip-poor', barClass: 'bar-poor',
    catKey: 'poor',
    advice: 'Breathing discomfort may occur during prolonged exposure. Everyone should limit prolonged outdoor exertion — consider wearing a mask.'
  },
  {
    max: 400, key: 'verypoor', label: 'Very Poor',
    color: '#ef4444', chipClass: 'chip-verypoor', barClass: 'bar-verypoor',
    catKey: 'verypoor',
    advice: 'Respiratory illness is possible with prolonged exposure. Avoid outdoor activities. Sensitive groups must remain indoors.'
  },
  {
    max: Infinity, key: 'severe', label: 'Severe',
    color: '#991b1b', chipClass: 'chip-severe', barClass: 'bar-severe',
    catKey: 'severe',
    advice: 'Serious health impacts are likely even for healthy individuals. Avoid all outdoor activities. Keep windows closed and use air purifiers indoors.'
  }
];

/* ── DOM refs ────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const UI = {
  btn:          $('predict-btn'),
  errorMsg:     $('error-msg'),
  errorText:    $('error-text'),
  resultEmpty:  $('result-empty'),
  resultContent:$('result-content'),
  aqiNumber:    $('aqi-number'),
  aqiChip:      $('aqi-category-chip'),
  aqiBar:       $('aqi-bar-fill'),
  aqiThumb:     $('aqi-bar-thumb'),
  aqiBarTrack:  document.querySelector('.aqi-bar-track'),
  adviceCard:   $('advice-card'),
  adviceText:   $('advice-text'),
  timestamp:    $('result-timestamp'),
  sumPM25:      $('sum-pm25'),
  sumPM10:      $('sum-pm10'),
  sumCO:        $('sum-co'),
  sumNO:        $('sum-no'),
  scaleItems:   document.querySelectorAll('.scale-item'),
};

/* ── Helpers ─────────────────────────────────────────────── */

/** Return AQI level config for a given numeric AQI */
function getLevel(aqi) {
  return AQI_LEVELS.find(l => aqi <= l.max) || AQI_LEVELS[AQI_LEVELS.length - 1];
}

/** Clamp value between min and max */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/** Format time as HH:MM:SS */
function timeNow() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

/** Animate a number from 0 to target over ~700ms */
function animateCounter(el, target, duration = 700) {
  const start = performance.now();
  const from = 0;

  function step(now) {
    const elapsed = now - start;
    const progress = clamp(elapsed / duration, 0, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (target - from) * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── UI state management ─────────────────────────────────── */

function setLoading(active) {
  UI.btn.disabled = active;
  UI.btn.classList.toggle('loading', active);
  UI.btn.setAttribute('aria-busy', active);
}

function showError(message) {
  UI.errorText.textContent = message;
  UI.errorMsg.hidden = false;
}

function clearError() {
  UI.errorMsg.hidden = true;
}

/* ── AQI scale highlight ─────────────────────────────────── */

const catToScaleKey = {
  'good': 'good', 'satisfactory': 'satisfactory',
  'moderate': 'moderate', 'poor': 'poor',
  'verypoor': 'verypoor', 'severe': 'severe'
};

function highlightScale(catKey) {
  UI.scaleItems.forEach(item => {
    const isActive = item.dataset.cat === catToScaleKey[catKey];
    item.classList.toggle('active', isActive);
  });
}

/* ── Render result ───────────────────────────────────────── */

function renderResult(aqi, inputs) {
  const level = getLevel(aqi);
  const pct   = clamp((aqi / 500) * 100, 0, 100);

  // Show result panel
  UI.resultEmpty.hidden = true;
  UI.resultContent.hidden = false;
  // Re-trigger animation by cloning
  UI.resultContent.style.animation = 'none';
  UI.resultContent.offsetHeight; // reflow
  UI.resultContent.style.animation = '';

  // AQI number count-up
  animateCounter(UI.aqiNumber, aqi);
  UI.aqiNumber.style.color = level.color;

  // Category chip
  UI.aqiChip.textContent = level.label;
  UI.aqiChip.className   = `aqi-category-chip ${level.chipClass}`;

  // Progress bar — defer for CSS transition
  requestAnimationFrame(() => {
    UI.aqiBar.style.width = pct + '%';
    UI.aqiBar.className   = `aqi-bar-fill ${level.barClass}`;
    UI.aqiThumb.style.background = level.color;
  });

  // ARIA on bar track
  UI.aqiBarTrack.setAttribute('aria-valuenow', aqi);

  // Health advice
  UI.adviceText.textContent = level.advice;
  UI.adviceCard.className   = `advice-card advice-${level.catKey}`;

  // Timestamp
  UI.timestamp.textContent = `Predicted at ${timeNow()}`;

  // Pollutant summary
  UI.sumPM25.textContent = inputs.pm25.toFixed(1);
  UI.sumPM10.textContent = inputs.pm10.toFixed(1);
  UI.sumCO.textContent   = inputs.co.toFixed(2);
  UI.sumNO.textContent   = inputs.no.toFixed(1);

  // Scale highlight
  highlightScale(level.catKey);

  // Scroll result into view on mobile
  if (window.innerWidth < 860) {
    document.getElementById('result-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ── Main predict function ───────────────────────────────── */

async function predictAQI() {
  clearError();

  // Read + validate inputs
  const inputs = {
    pm25: parseFloat($('pm25').value),
    pm10: parseFloat($('pm10').value),
    co:   parseFloat($('co').value),
    no:   parseFloat($('no').value),
  };

  for (const [key, val] of Object.entries(inputs)) {
    if (isNaN(val) || val < 0) {
      showError(`Invalid value for ${key.toUpperCase()}. Please enter a non-negative number.`);
      $( key).focus();
      return;
    }
  }

  setLoading(true);

  try {
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();

    // Flask should return { aqi: <number> }
    // Accept both 'aqi' and 'prediction' for compatibility
    const rawAQI = data.aqi ?? data.prediction ?? data.result;

    if (rawAQI === undefined || rawAQI === null || isNaN(Number(rawAQI))) {
      throw new Error('Unexpected response format from prediction service.');
    }

    const aqi = Math.round(Number(rawAQI));
    renderResult(aqi, inputs);

  } catch (err) {
    console.error('[AQI Predict] Error:', err);
    showError('Prediction service unavailable. Please check your connection and try again.');
  } finally {
    setLoading(false);
  }
}

/* ── Allow Enter key in inputs ───────────────────────────── */
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') predictAQI();
  });
});
