# GreenCart - Eco-Friendly Product Alternatives Extension

## Overview

GreenCart is a Chrome extension that helps users discover more sustainable alternatives to products they're viewing on Amazon. When browsing product pages, the extension:

1. Analyzes the current product's sustainability score based on its title
2. Recommends higher-scoring eco-friendly alternatives
3. Displays the alternatives directly in the popup for easy access

## Features

- Sustainability Scoring: Calculates a score based on eco-friendly keywords in product titles
- Smart Recommendations: Finds similar products with higher sustainability scores
- Direct Links: Provides quick access to recommended alternatives
- Real-time Analysis: Works instantly as you browse Amazon product pages

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the extension directory

## How It Works

1. The extension activates when you visit an Amazon product page
2. It extracts the product title and sends it to the local Flask server
3. The server calculates a sustainability score and finds better alternatives
4. Results are displayed in the extension popup

## Technical Components

- Frontend:
  - Chrome extension with content script, popup, and background service worker
  - Clean, minimalist UI showing score and alternatives

- Backend:
  - Flask server with product recommendation logic
  - TF-IDF vectorization and cosine similarity for product matching
  - Sustainability scoring based on keyword analysis

## Dataset

The product data comes from [Amazon Product Dataset on Kaggle](https://www.kaggle.com/datasets). We've enhanced it with sustainability scoring.

## Dependencies

- Python 3.x
- Flask
- pandas
- scikit-learn
- Chrome browser

## Running the Backend

1. Install requirements: pip install flask pandas scikit-learn
2. Run the server: python app.py (or run the Jupyter notebook)
3. The server will start at http://localhost:5000

## Future Improvements

- Expand keyword list for better scoring
- Add more product categories
- Include user feedback mechanism
- Support for other e-commerce sites

## Credits

- Product dataset: [Kaggle Amazon Product Dataset](https://www.kaggle.com/datasets)
- Sustainability scoring algorithm: Custom implementation
