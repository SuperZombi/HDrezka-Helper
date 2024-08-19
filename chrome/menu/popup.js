var urlList;
chrome.storage.sync.get("urlList", (data) => {
	urlList = data.urlList || [];

	urlList.forEach(url=>{
		addWebsite(url)
	})
	main()
});

async function main(){
	let {url, icon} = await getCurrentUrl()
	setCurrentWebsite(url, icon)
	url = url.origin;

	if (urlList.includes(url)){
		setupUrlActionButton("remove", url)
	} else{
		setupUrlActionButton("add", url)
	}

	document.querySelector("#websites_settings").onclick = _=>{
		document.querySelector("#websites_popup").classList.add("show")
	}
	document.querySelector("#websites_popup .close").onclick = _=>{
		document.querySelector("#websites_popup").classList.remove("show")
	}
}



function getCurrentUrl(callback){
	return new Promise((resolve) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			let activeTab = tabs[0];
			let url = new URL(activeTab.url)
			let icon = activeTab.favIconUrl
			resolve({url, icon})
		});
	});
}
function setCurrentWebsite(url, icon){
	document.querySelector("#current_url span").innerHTML = url.hostname;
	document.querySelector("#current_url").setAttribute("url", url.origin)
	if (icon){
		document.querySelector("#current_url img").src = icon;
	}
}


function addNewUrl(url){
	if (!urlList.includes(url)){
		urlList.push(url)
		chrome.storage.sync.set({ urlList: urlList });
		addWebsite(url)
	}
}
function removeUrl(url){
	const index = urlList.indexOf(url);
	if (index > -1) {
		urlList.splice(index, 1);
	}
	chrome.storage.sync.set({ urlList: urlList });
	removeWebsite(url)
}

function setupUrlActionButton(action, url){
	let button = document.querySelector("#add_this")
	if (action == "add"){
		button.innerHTML = chrome.i18n.getMessage("add_this_site")
		button.classList.remove("red")
		button.onclick = _=>{
			addNewUrl(url);
			setupUrlActionButton("remove", url)
		}
	}
	else {
		button.innerHTML = chrome.i18n.getMessage("remove_this_site")
		button.classList.add("red")
		button.onclick = _=>{
			removeUrl(url)
			setupUrlActionButton("add", url)
		}
	}
}



function addWebsite(url){
	let root = document.querySelector("#websites_list")
	let div = document.createElement("div")
	div.className = "site"
	div.innerHTML = `
		<a href="${url}" target="_blank">${url}</a>
		<span class="delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485"><path d="M67.224 0h350.535v71.81H67.224zM417.776 92.829H67.237V485h350.537V92.829h.002zM165.402 431.447H137.04V146.383h28.362v285.064zm91.287 0h-28.363V146.383h28.363v285.064zm91.281 0h-28.361V146.383h28.361v285.064z"/></svg></span>
	`
	root.appendChild(div)
	div.querySelector(".delete").onclick = _=>{
		removeUrl(url)
		if (document.querySelector("#current_url").getAttribute("url") == url){
			setupUrlActionButton("add", url)
		}
	}
}
function removeWebsite(url){
	let el = document.querySelector(`#websites_list a[href="${url}"]`)
	if (el){
		el.closest('.site').remove()
	}
}
