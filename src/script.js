chrome.storage.sync.get({ download: true,
						  hideVK: true,
						  subtitles: true,
						}, results => {
	if (results.hideVK){
		hideVK()
	}
	if (results.download){
		window.onload = function(){
			let chrome_arr = {
				downloadStr: chrome.i18n.getMessage("downloadStr"),
				downloadLinkDesc: chrome.i18n.getMessage("downloadLinkDesc"),
				subtitles: chrome.i18n.getMessage("subtitles"),

				args: {
					subtitles: results.subtitles
				}
			}

			const script = document.createElement('script');
			script.src = chrome.runtime.getURL('myscript.js');
			script.dataset.args = JSON.stringify({chrome_arr});
			document.documentElement.appendChild(script);
		}
	}
});

function hideVK(){
	let el_ = document.getElementById("vk_groups");
	if (el_){
		el_.style.display = "none";
	}
}
