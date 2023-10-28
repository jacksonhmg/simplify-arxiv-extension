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
    const OPENAI_API_KEY = await getKey();
    const data = {
    model: "gpt-3.5-turbo",
    messages: [
        {
        role: "system",
        content: "You are a helpful assistant. You are helping a student understand a concept. You will be fed a description of a concept. You need to simplify it. Only return a simplified version of the description. Use easy to understand words. Only return a simplified version of the description."
        },
        {
        role: "user",
        content: {content}
        }
    ]
    };

    return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(data)
    })
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    })
    .then(data => {
    if (data.choices && data.choices.length > 0) {
        return data.choices[0].content;
    } else {
        throw new Error('No content found in the response');
    }
    })
    .catch((error) => {
    console.error('Error:', error);
    return null;
    });
}
