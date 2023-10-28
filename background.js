chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url) {
        chrome.storage.local.get(['sites'], (result) => {
            let sites = result.sites || [];
            if (!sites.includes(message.url)) {
                sites.push(message.url);
                chrome.storage.local.set({sites: sites});
            }
        });
    }
});
