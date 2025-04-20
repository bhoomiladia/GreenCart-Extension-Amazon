document.addEventListener("DOMContentLoaded", function () {
  const resultsContainer = document.getElementById("results");
  
  // Create beautiful loading animation
  resultsContainer.innerHTML = `
    <div class="loading-container">
      <div class="spinner"></div>
      <div class="loading-text">Finding eco-friendly alternatives...</div>
    </div>
  `;

  // Conversion rate (approximate 1 USD = 83 INR)
  const usdToInr = 83;

  // Request title from content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "GET_TITLE" }, (response) => {
      if (!response || !response.title) {
        console.error("❌ Could not get product title.");
        resultsContainer.innerHTML = `
          <div class="error-message">
            <div class="error-icon">⚠️</div>
            <div>Could not get product title.</div>
          </div>
        `;
        return;
      }

      const title = response.title;
      console.log("📦 Fetched Title:", title);

      // Send the title to your API
      fetch("http://localhost:5000/api/alternatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Convert prices to INR
          if (data.alternatives) {
            data.alternatives.forEach(alt => {
              alt.price = (alt.price * usdToInr).toFixed(2);
            });
          }
          
          // Display sustainability score
          const scoreElement = document.getElementById("current-score");
          if (data.sustainability_score !== undefined && scoreElement) {
            scoreElement.innerHTML = `
              <div class="score-display">
                <div class="score-label">Sustainability Score</div>
                <div class="score-value ${
                  data.sustainability_score >= 100 ? "score-good" : 
                  data.sustainability_score > 40 ? "score-average" : "score-poor"
                }">${data.sustainability_score}</div>
                <div class="score-description">
                  ${
                    data.sustainability_score >= 100 ? "Excellent eco-choice!" :
                    data.sustainability_score > 40 ? "Moderate sustainability" : "Consider alternatives"
                  }
                </div>
              </div>
            `;
          }
        
          // Show alternatives
          if (!data.alternatives || data.alternatives.length === 0) {
            resultsContainer.innerHTML = `
              <div class="no-results">
                <div class="no-results-icon">😔</div>
                <div>No better alternatives found.</div>
              </div>
            `;
            return;
          }
        
          // Render beautiful alternatives cards
          let html = `<h3 class="alternatives-title">🌿 Better Alternatives</h3>`;
          data.alternatives.forEach((alt) => {
            html += `
              <div class="product-card">
                <div class="eco-badge">Eco-Score: ${alt.sustainability_score} ♻️</div>
                <h3 class="product-title">${alt.title}</h3>
                <div class="product-details">
                  <span>₹${alt.price}</span>
                  <a href="${alt.productURL}" target="_blank" class="product-link">View Product</a>
                </div>
              </div>
            `;
          });
          resultsContainer.innerHTML = html;
        })
        .catch((err) => {
          console.error("⚠️ Error fetching alternatives:", err);
          resultsContainer.innerHTML = `
            <div class="error-message">
              <div class="error-icon">⚠️</div>
              <div>Error fetching alternatives. Please try again.</div>
            </div>
          `;
        });
    });
  });

  // Add dynamic styles (could also be moved to popup.html)
  const style = document.createElement('style');
  style.textContent = `
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px 20px;
    }
    
    .spinner {
      border: 3px solid rgba(46, 204, 113, 0.2);
      border-radius: 50%;
      border-top: 3px solid #2ecc71;
      width: 24px;
      height: 24px;
      animation: spin 1s linear infinite;
      margin-bottom: 12px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-text {
      color: #7f8c8d;
      font-size: 14px;
      text-align: center;
    }
    
    .error-message, .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      text-align: center;
      color: #e74c3c;
    }
    
    .error-icon, .no-results-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    .score-display {
      text-align: center;
    }
    
    .score-label {
      font-size: 14px;
      color: #7f8c8d;
    }
    
    .score-value {
      font-size: 36px;
      font-weight: 600;
      margin: 8px 0;
    }
    
    .score-good { color: #2ecc71; }
    .score-average { color: #f39c12; }
    .score-poor { color: #e74c3c; }
    
    .score-description {
      font-size: 13px;
      color: #7f8c8d;
    }
    
    .alternatives-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #2c3e50;
    }
    
    .product-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    
    .eco-badge {
      background: #d5f5e3;
      color: #2ecc71;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
      margin-bottom: 8px;
    }
    
    .product-title {
      font-weight: 500;
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 15px;
    }
    
    .product-details {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #7f8c8d;
    }
    
    .product-link {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
    }
  `;
  document.head.appendChild(style);
});