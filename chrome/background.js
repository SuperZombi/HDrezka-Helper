var urlList;

chrome.storage.sync.get("urlList", (data) => {
	urlList = data.urlList || [];

	chrome.storage.onChanged.addListener((changes) => {
		if (changes.urlList){
			urlList = changes.urlList.newValue
		}
	});

	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status == 'complete'){
			let url = new URL(tab.url)
			if (urlList.includes(url.origin)) {
				chrome.scripting.executeScript({
					target: { tabId: tabId },
					files : [ "hdrezka_helper.js" ],
					world: "MAIN"
				});

			}
		}
	});
});
