chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.captureVisibleTab(null, { format: "jpeg" }, (dataUrl) => {
      chrome.tabs.sendMessage(tab.id, { type: "IMAGE_CAPTURED", dataUrl });
    });
  });
  