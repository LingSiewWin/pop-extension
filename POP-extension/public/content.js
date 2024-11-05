const apiKey = "YOUR_ROBOFLOW_API_KEY";
const modelUrl = "https://detect.roboflow.com/your-model/42"; // Update with your model endpoint

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "IMAGE_CAPTURED") {
    const image = message.dataUrl.split(",")[1]; // Extract base64 part

    try {
      const response = await fetch(modelUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `api_key=${apiKey}&image=${encodeURIComponent(image)}`
      });
      const result = await response.json();
      renderBoundingBoxes(result.predictions);
    } catch (error) {
      console.error("Error with Roboflow inference:", error);
    }
  }
});

function renderBoundingBoxes(predictions) {
  // Overlay a canvas on top of the page and draw boxes
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");

  // Set canvas size to match the viewport
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";

  predictions.forEach(pred => {
    const { x, y, width, height, class: label, confidence } = pred;
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.strokeRect(x - width / 2, y - height / 2, width, height);
    context.fillStyle = "red";
    context.font = "12px Arial";
    context.fillText(`${label} (${(confidence * 100).toFixed(1)}%)`, x - width / 2, y - height / 2 - 5);
  });
}
