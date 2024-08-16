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
	if (icon){
		document.querySelector("#current_url img").src = icon;
	}
}


function addNewUrl(url){
	if (!urlList.includes(url)){
		urlList.push(url)
		chrome.storage.sync.set({ urlList: urlList });
		addWebsite(url)
		setupUrlActionButton("remove", url)
	}
}
function removeUrl(url){
	const index = urlList.indexOf(url);
	urlList.splice(index, 1);
	chrome.storage.sync.set({ urlList: urlList });
	removeWebsite(url)
	setupUrlActionButton("add", url)
}

function setupUrlActionButton(action, url){
	let button = document.querySelector("#add_this")
	if (action == "add"){
		button.innerHTML = "Add this website" // TODO
		button.onclick = _=>{addNewUrl(url)}
	}
	else {
		button.innerHTML = "Remove this website" // TODO
		button.onclick = _=>{removeUrl(url)}
	}
}



function addWebsite(url){
	let root = document.querySelector("#websites_list")
	let div = document.createElement("div")
	div.className = "site"
	div.innerHTML = `
		<a href="${url}" target="_blank">${url}</a>
	`
	root.appendChild(div)
}
function removeWebsite(url){
	let el = document.querySelector(`#websites_list a[href="${url}"]`)
	el.remove()
}
