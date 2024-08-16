var urlList;

chrome.storage.sync.get("urlList", (data) => {
	urlList = data.urlList || [];

	chrome.storage.onChanged.addListener((changes) => {
		if (changes.urlList){
			urlList = changes.urlList.newValue
		}
	});

	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.url) {
			let newUrl = new URL(changeInfo.url)
			if (urlList.includes(newUrl.origin)) {
				console.log(`Совпадение найдено: ${changeInfo.url}`);
			}
		}
	});
});
