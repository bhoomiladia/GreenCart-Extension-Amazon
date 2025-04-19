chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_TITLE") {
    // Try to select the product title element
    const titleElement = document.querySelector("#productTitle");

    if (titleElement) {
      const title = titleElement.innerText.trim();
      console.log("📦 Extracted Title:", title); // Debugging log
      sendResponse({ title });
    } else {
      console.log("❌ Product title not found.");
      sendResponse({ title: null });
    }
  }
  return true; // Ensures asynchronous response
});
