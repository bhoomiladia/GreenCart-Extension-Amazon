chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
  });
  
  // Listen for messages from content.js or popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_ALTERNATIVES") {
      const title = request.title;
  
      // Example API endpoint to fetch sustainability score alternatives
      fetch("http://localhost:5000/api/alternatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.alternatives) {
            sendResponse({ alternatives: data.alternatives,sustainability_score: data.sustainability_score });
          } else {
            sendResponse({ alternatives: [],sustainability_score:[] });
          }
        })
        .catch((err) => {
          console.error("Error fetching alternatives:", err);
          sendResponse({ alternatives: [],sustainability_score:[] });
        });
        
      return true;  // This ensures the sendResponse function is asynchronous
    }
  
    // Return the response after handling the request
    return true;
  });
  