chrome.storage.sync.get({ download: true,
						  downloader_2: false,
                          filename_structure: "",
						  hideVK: true,
						  subtitles: true,
						}, results => {
	if (results.hideVK){
		hideVK()
	}
	let player = document.getElementById('player')
	if (player){
		document.title = document.querySelector('.b-content__main .b-post__title').innerText;

		if (results.download){
			window.onload = function(){
				let chrome_arr = {
					downloadStr: chrome.i18n.getMessage("downloadStr"),
					downloadLinkDesc: chrome.i18n.getMessage("downloadLinkDesc"),
					subtitles: chrome.i18n.getMessage("subtitles"),
					cancelDownload: chrome.i18n.getMessage("cancelDownload"),
					donateTitle: chrome.i18n.getMessage("donateTitle"),
					donateButton: chrome.i18n.getMessage("donateButton"),
					errorStr: chrome.i18n.getMessage("errorStr"),
					vpnErrorMsg: chrome.i18n.getMessage("vpnErrorMsg"),

					args: {
						subtitles: results.subtitles,
						downloader_2: results.downloader_2,
						filename_structure: results.filename_structure,
					}
				}
				const script = document.createElement('script');
				script.src = chrome.runtime.getURL('hdrezka_helper.js');
				script.dataset.args = JSON.stringify({chrome_arr});
				document.documentElement.appendChild(script);
			}
		}
	}
});

function hideVK(){
	let el_ = document.getElementById("vk_groups");
	if (el_){
		el_.style.display = "none";
	}
}
