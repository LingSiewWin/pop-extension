document.getElementById("detectBtn").addEventListener("click", async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: startLogoDetection,
      });
    });
  });
  
  function startLogoDetection() {
    console.log("Starting logo detection...");
  }
  