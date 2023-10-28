// content.js
chrome.runtime.onMessage.addListener(function (message) {
    print('listener for updateContent')
    if (message.action === 'updateContent') {
        let metaDivs = document.querySelectorAll('.meta');
        metaDivs.forEach(div => {
            let titleDiv = div.querySelector('.list-title.mathjax');
            let descriptionP = div.querySelector('p.mathjax');
            if (titleDiv && descriptionP) {
                titleDiv.innerHTML = message.title;
                descriptionP.innerHTML = message.description;
            }
        });
    }
});

function sendContentForSimplification() {
    print('sendContentForSimplification')
    let metaDivs = document.querySelectorAll('.meta');
    metaDivs.forEach(div => {
        let titleDiv = div.querySelector('.list-title.mathjax');
        let descriptionP = div.querySelector('p.mathjax');
        if (titleDiv && descriptionP) {
            chrome.runtime.sendMessage({
                type: "simplifyContent",
                title: titleDiv.innerText,
                description: descriptionP.innerText
            });
        }
    });
}

sendContentForSimplification();
