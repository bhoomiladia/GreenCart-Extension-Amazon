# GreenCart - Eco-Friendly Product Alternatives Extension  

## 📌 Overview  

GreenCart is a Chrome extension that helps users discover sustainable alternatives to products on Amazon. It analyzes product titles, calculates a sustainability score, and recommends eco-friendly alternatives with higher scores.  

---

## ✨ Features  

✅ **Sustainability Scoring** – Rates products based on eco-friendly keywords (e.g., "bamboo," "recycled")  
✅ **Smart Recommendations** – Finds similar but more sustainable products  
✅ **One-Click Access** – Direct links to recommended alternatives  
✅ **Real-Time Analysis** – Works instantly on Amazon product pages  

---

## 📥 Installation  

### **1. Install the Chrome Extension**  
1. Download this repository (or clone via `git clone`).  
2. Open Chrome and go to:  
   ```
   chrome://extensions/
   ```  
3. Enable **Developer Mode** (toggle in top-right).  
4. Click **"Load unpacked"** and select the extension folder.  

### **2. Set Up the Backend Server**  
1. Install Python dependencies:  
   ```sh
   pip install flask pandas scikit-learn
   ```  
2. Run the Flask server:  
   ```sh
   python app.py
   ```  
   (or execute the Jupyter notebook `app.ipynb`)  

---

## 🔍 How It Works  

1. **When you visit an Amazon product page**, the extension extracts the product title.  
2. **The title is sent to the local Flask server**, which:  
   - Calculates a sustainability score.  
   - Finds similar but more eco-friendly alternatives.  
3. **Results appear in the popup**, showing:  
   - The current product's sustainability score.  
   - Recommended alternatives with higher scores.  

---

## 📂 Dataset Setup  

### **Downloading the Amazon Product Dataset from Kaggle**  
1. **Go to Kaggle**:  
   - Dataset used: [Amazon Product Dataset](https://www.kaggle.com/datasets/asaniczka/amazon-products-dataset-2023-1-4m-products)   

2. **Download the dataset**:  
   - If you don’t have a Kaggle account, sign up first.  
   - Go to the dataset page and click **"Download"**.  

3. **Prepare the dataset**:  
   - Extract the downloaded file.  
   - Place `amazon_products_final.csv` in the same folder as `app.py`.  
   - The Flask server will automatically load it.  

---

## 🛠️ Dependencies  

- **Python 3.x** (with `flask`, `pandas`, `scikit-learn`)  
- **Chrome browser** (for the extension)  

---

## 🚀 Future Improvements  

🔹 Expand sustainability keyword coverage  
🔹 Support more e-commerce sites (e.g., Walmart, eBay)  
🔹 Add user feedback for better recommendations  
🔹 Improve scoring with machine learning  

---

## 📜 Credits  

- **Dataset**: [Kaggle Amazon Product Dataset](https://www.kaggle.com/datasets/asaniczka/amazon-products-dataset-2023-1-4m-products)  
- **Sustainability Algorithm**: Custom implementation  

---


### 🌿 Happy Sustainable Shopping! 🌿
