document.addEventListener("DOMContentLoaded", function() {
  // Fetch the stored sites and display them in the popup
  chrome.storage.local.get(['sites', 'lastResetTime'], (result) => {

      // Display the last reset time
      const resetTimeDisplay = document.getElementById("resetTime"); // Assuming you have an element with this ID to display the time
      if (result.lastResetTime) {
          resetTimeDisplay.textContent = "Last Reset: " + result.lastResetTime;
      } else {
          resetTimeDisplay.textContent = "Not reset yet.";
      }
      let sites = result.sites || [];
      let siteList = document.getElementById("siteList"); // Assuming you have a list or div with this ID
      let urlCount = {};

      // Process all sites to count the occurrences of each domain
      sites.forEach(site => {
          let url = site.replace(/https?:\/\/([^/]+)\/.*/, '$1');
          urlCount[url] = (urlCount[url] || 0) + 1;
      });

      // Append the domains and their counts to the list
      for (let url in urlCount) {
          let listItem = document.createElement("li");
          listItem.textContent = url + (urlCount[url] > 1 ? " " + urlCount[url] : "");
          siteList.appendChild(listItem);
      }
  });
});

const button = document.getElementById('reset-button').addEventListener('click', reset);

function reset() {
  const now = new Date();
  chrome.storage.local.set({
      sites: [],
      lastResetTime: now.toString()
  });
  window.location.reload();
}

