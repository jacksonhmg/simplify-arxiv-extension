let divId = 0; // Counter to assign unique IDs to divs

chrome.runtime.onMessage.addListener(function (message) {
    console.log('listener for updateContent')
    if (message.action === 'updateContent') {
        let divToUpdate = document.querySelector(`.meta[data-div-id="${message.divId}"]`);
        if (divToUpdate) {
            let titleDiv = divToUpdate.querySelector('.list-title.mathjax');
            let descriptionP = divToUpdate.querySelector('p.mathjax');
            if (titleDiv && descriptionP) {
                titleDiv.innerHTML = message.title;
                descriptionP.innerHTML = message.description;
            }
        }
    }
});

function sendContentForSimplification() {
    console.log('sendContentForSimplification')
    let metaDivs = document.querySelectorAll('.meta');
    metaDivs.forEach(metaDiv => {
        let titleDiv = metaDiv.querySelector('.list-title.mathjax');
        let descriptionP = metaDiv.querySelector('p.mathjax');
        if (titleDiv && descriptionP) {
            let currentDivId = divId++; // Assign and increment the unique ID
            metaDiv.setAttribute('data-div-id', currentDivId); // Set the unique ID as a data attribute

            chrome.runtime.sendMessage({
                type: "simplifyContent",
                divId: currentDivId, // Send the unique ID with the message
                title: titleDiv.innerText,
                description: descriptionP.innerText
            });
        }
    });
}

sendContentForSimplification();
