// click!
function clickJoinButton() {
    const buttons = document.querySelectorAll('button.BaseElement.Box.Button.goldButton.primary.size-xs.justify-center.align-center.border-radius.hover.background-color-s2');
    let buttonFound = false;
    
    buttons.forEach(button => {
        const span = button.querySelector('span.BaseElement.Span.size-xs');
        if (span && span.textContent.trim() === 'JOIN') {
            button.click();
            console.log('Button found and clicked');
            buttonFound = true;
        }
    });
    
    return buttonFound;
}

function setupObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                if (clickJoinButton()) {
                    observer.disconnect(); // stop looking once found
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Function to periodically check for the button and log a message if not found
function periodicCheck() {
    const interval = setInterval(() => {
        if (!clickJoinButton()) {
            console.log('Button not found, checking again in 10 seconds...');
        } else {
            clearInterval(interval);
        }
    }, 10000); // check every 10 seconds bc why not
}

// call the functionsss
setupObserver();
periodicCheck();
