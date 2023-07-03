chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'exportWatchlist') {
    const result = exportWatchlist();
    sendResponse({ result });
  }
});

function exportWatchlist() {
  const watchlistKey = 'ensFavourites';
  const watchlist = JSON.parse(localStorage.getItem(watchlistKey));

  if (!watchlist) {
    return false;
  }

  const namesOnly = watchlist.map(item => item.name).join('\n');
  const blob = new Blob([namesOnly], { type: 'text/plain;charset=utf-8' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'ens_watchlist.txt';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  return true;
}