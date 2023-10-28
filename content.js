// Send the current page's URL to the background script
chrome.runtime.sendMessage({type: "saveUrl", url: window.location.href});
