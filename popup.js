document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "Loading...";
  
    // Request title from content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "GET_TITLE" }, (response) => {
        if (!response || !response.title) {
          console.error("❌ Could not get product title.");
          resultsContainer.innerHTML = "❌ Could not get product title.";
          return;
        }
  
        const title = response.title;
        console.log("📦 Fetched Title:", title); // Debugging log
  
        // Send the title to your API to fetch better alternatives
        fetch("http://localhost:5000/api/alternatives", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        })
          .then((res) => res.json())
          .then((data) => {
            // ✅ Display the sustainability score of the current product
            const scoreElement = document.getElementById("current-score");
            if (data.sustainability_score !== undefined && scoreElement) {
              scoreElement.innerText = `Sustainability Score: ${data.sustainability_score}`;
          
              // Optional: Add color based on score
              if (data.sustainability_score >= 100) {
                scoreElement.style.color = "green";
              } else if (data.sustainability_score > 40) {
                scoreElement.style.color = "orange";
              } else {
                scoreElement.style.color = "red";
              }
            }
          
            // ✅ Show alternatives
            if (!data.alternatives || data.alternatives.length === 0) {
              resultsContainer.innerHTML = "😔 No better alternatives found.";
              return;
            }
          
            // continue rendering alternatives...
          
  
            let html = `<h3>🌿 Better Alternatives</h3><ul>`;
            data.alternatives.forEach((alt) => {
              html += `
                <li style="margin-bottom: 10px;">
                  <strong>${alt.title}</strong><br>
                  ♻️ Score: ${alt.sustainability_score}<br>
                  💵 Price: $${alt.price}<br>
                  <a href="${alt.productURL}" target="_blank">🔗 View</a>
                </li>
              `;
            });
            html += `</ul>`;
            resultsContainer.innerHTML = html;
          })
          .catch((err) => {
            console.error("⚠️ Error fetching alternatives:", err);
            resultsContainer.innerHTML = "⚠️ Error fetching alternatives.";
          });
      });
    });
  });
  