chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Redirect to Up It Quest",
    contexts: ["page", "selection", "link", "editable", "image", "video", "audio"],
    id: "up-it-quest-redirect",
  });

  chrome.contextMenus.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const tab = tabs[0];
      if (!tab.id) return;
      const settings = await chrome.storage.sync.get(["url"]);
      chrome.tabs.sendMessage(tab.id, { type: "redirect", url: settings.url });
    });
  });
});
