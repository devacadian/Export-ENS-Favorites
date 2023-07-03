// Preload the cheer sound effect
const audio = new Audio('cheer.mp3');
audio.preload = 'auto';

document.getElementById('exportWatchlistBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['content-script.js']
      },
      () => {
        if (chrome.runtime.lastError) {
          const errorMsg = JSON.stringify(chrome.runtime.lastError, null, 2);
          console.error('Error:', errorMsg);
          alert(`An error occurred while exporting the watchlist - verify you are on the app.ens.domains website!: ${errorMsg}`);
          return;
        }

        chrome.tabs.sendMessage(tabs[0].id, { action: 'exportWatchlist' }, (response) => {
          if (chrome.runtime.lastError) {
            const errorMsg = JSON.stringify(chrome.runtime.lastError, null, 2);
            console.error('Error:', errorMsg);
            alert(`An error occurred while exporting the watchlist - verify you are on the app.ens.domains website!: ${errorMsg}`);
          } else if (response.result === false) {
            alert('No watchlist found. Make sure you are on app.ens.domains');
          } else {
            alert('You have successfully exported your ENS Favorites to ens_watchlist.txt! For web3 security purposes, please remember to uninstall the extension after use :)');
          }
        });
      }
    );
  });

  // Play cheer sound effect
  audio.play();


});
