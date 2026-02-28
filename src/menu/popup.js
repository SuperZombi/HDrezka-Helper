var browser = chrome || browser;
var urlList = [];
browser.storage.sync.get("urlList", (data) => {
	urlList = data.urlList || ["https://hdrezka.ag", "https://hdrezka.cm", "https://hdrezka.me", "https://hdrezka.co", "https://hdrezka-home.tv", "https://hello-rezka.tv"];
	urlList.forEach(url=>{addWebsite(url)})
	main()
});

async function main(){
	let {url, icon} = await getCurrentUrl()
	if (url && (url.protocol == "http:" || url.protocol == "https:")){
		setCurrentWebsite(url, icon)
		document.querySelector("#add_this").style.display = "block"
		document.querySelector("#current_url").classList.remove("tiny")
		url = url.origin;
		if (urlList.includes(url)){
			setupUrlActionButton("remove", url)
		} else{
			setupUrlActionButton("add", url)
		}
	} else{
		document.querySelector("#current_url").classList.add("tiny")
	}
	document.querySelector("#websites_settings").onclick = _=>{
		document.querySelector("#websites_popup").classList.add("show")
	}
	document.querySelector("#websites_popup .close").onclick = _=>{
		document.querySelector("#websites_popup").classList.remove("show")
	}
	document.querySelector("#add_url").onclick = _=>{
		let new_url = validUrl(window.prompt(browser.i18n.getMessage("url_prompt")))
		if (new_url){
			addNewUrl(new_url.origin)
			if (document.querySelector("#current_url").getAttribute("url") == new_url.origin){
				setupUrlActionButton("remove", new_url.origin)
			}
		} else {
			window.alert(browser.i18n.getMessage("wrong_url"))
		}
	}
}

function validUrl(string){
	if (string && (string.startsWith("http:") || string.startsWith("https:"))){
		try {
			let url = new URL(string);
			return url;
		} catch (_) {
			return false;  
		}
	}
}


function getCurrentUrl(){
	return new Promise((resolve) => {
		browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0) {
				let activeTab = tabs[0];
				let url_href = activeTab.url || activeTab.pendingUrl
				if (url_href){
					let url = new URL(url_href)
					let icon = activeTab.favIconUrl || `https://www.google.com/s2/favicons?domain=${url_href}&sz=128`
					resolve({url, icon})
				}
			}
			resolve({url: null, icon: null})
		});
	});
}
function setCurrentWebsite(url, icon){
	document.querySelector("#current_url span").textContent = url.hostname;
	document.querySelector("#current_url").setAttribute("url", url.origin)
	if (icon){
		document.querySelector("#current_url img").src = icon;
	}
}


function addNewUrl(url){
	if (!urlList.includes(url)){
		urlList.push(url)
		browser.storage.sync.set({ urlList: urlList });
		addWebsite(url)
	}
}
function removeUrl(url){
	const index = urlList.indexOf(url);
	if (index > -1) {
		urlList.splice(index, 1);
	}
	browser.storage.sync.set({ urlList: urlList });
	removeWebsite(url)
}

function setupUrlActionButton(action, url){
	let button = document.querySelector("#add_this")
	if (action == "add"){
		button.textContent = browser.i18n.getMessage("add_this_site")
		button.classList.remove("red")
		button.onclick = _=>{
			addNewUrl(url);
			setupUrlActionButton("remove", url)
		}
	}
	else {
		button.textContent = browser.i18n.getMessage("remove_this_site")
		button.classList.add("red")
		button.onclick = _=>{
			removeUrl(url)
			setupUrlActionButton("add", url)
		}
	}
}


function makeSVG(viewBox, path){
	const svgNamespace = "http://www.w3.org/2000/svg";
	let svg = document.createElementNS(svgNamespace, "svg");
	svg.setAttribute("viewBox", viewBox)
	let path_el = document.createElementNS(svgNamespace, "path");
	path_el.setAttribute("d", path);
	svg.append(path_el)
	return svg
}
function addWebsite(url){
	let root = document.querySelector("#websites_list")
	let div = document.createElement("div")
	div.className = "site"
	let a = document.createElement("a")
	a.href = url
	a.target = "_blank"
	a.textContent = url
	div.appendChild(a)
	let delete_span = document.createElement("span")
	delete_span.className = "delete"
	delete_span.appendChild(makeSVG("0 0 485 485", "M67 0h351v72H67zm351 93H67v392h351V93zM165 431h-28V146h28v285zm92 0h-29V146h29v285zm91 0h-28V146h28v285z"))
	div.appendChild(delete_span)
	root.appendChild(div)
	delete_span.onclick = _=>{
		if (window.confirm(browser.i18n.getMessage("confirm_delete").replace("%url", url))){
			removeUrl(url)
			if (document.querySelector("#current_url").getAttribute("url") == url){
				setupUrlActionButton("add", url)
			}
		}
	}
}
function removeWebsite(url){
	let el = document.querySelector(`#websites_list a[href="${url}"]`)
	if (el){
		el.closest('.site').remove()
	}
}
