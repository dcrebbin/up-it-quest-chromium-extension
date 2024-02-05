chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("content script received message", message);
  if (message.type === "redirect") {
    const url = window.location.href;
    const regex = /problems\/(.*?)\/description\//g;
    const match = regex.exec(url);
    if (match && match[1]) {
      window.location.href = `${message.url}/?question=${match[1]}`;
    }
  }
});

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
