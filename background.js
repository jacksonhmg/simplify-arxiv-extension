// background.js
const getKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['openai-key'], (result) => {
        if (result['openai-key']) {
          const decodedKey = atob(result['openai-key']);
          resolve(decodedKey);
        }
      });
    });
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === "simplifyContent") {
        simplifyContent(message.title, message.description).then(simplified => {
            chrome.tabs.sendMessage(sender.tab.id, {
                action: 'updateContent',
                title: simplified.title,
                description: simplified.description
            });
        });
    }
});

async function simplifyContent(title, description) {
    // Call GPT (OpenAI's API) to get simplified content
    // Make sure you have the API key and necessary setup to call the OpenAI API
    // This is a placeholder for the actual API call
    let simplifiedTitle = await callGPT(title);
    let simplifiedDescription = await callGPT(description);

    return {
        title: simplifiedTitle,
        description: simplifiedDescription
    };
}

async function callGPT(content) {
    // Placeholder for GPT API call
    // You need to implement the actual API call here
    // Return the simplified content as a string
    return content; // This should be replaced with the actual dumbed-down version from GPT
}
