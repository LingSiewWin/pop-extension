document.getElementById("detectBtn").addEventListener("click", async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "startDetection" }, (response) => {
        document.getElementById("result").textContent = `Logos found: ${response.logoCount}`;
      });
    });
  });
  