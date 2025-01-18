var urlList;
var browser = chrome || browser;

browser.storage.sync.get("urlList").then((data) => {
	urlList = data.urlList || ["https://hdrezka.ag", "https://hdrezka.cm", "https://hdrezka.ag", "https://hdrezka.me", "https://hdrezka.co"];

	browser.storage.onChanged.addListener((changes) => {
		if (changes.urlList){
			urlList = changes.urlList.newValue

			let newValue = changes.urlList.newValue;
			let oldValue = changes.urlList.oldValue;

			let addedSites = newValue.filter(site => !oldValue || !oldValue.includes(site));
			browser.tabs.query({}, function(tabs) {
				tabs.forEach(tab => {
					let url = new URL(tab.url)
					if (addedSites.includes(url.origin)) {
						executeScript(tab.id)
					}
				});
			});
		}
	});

	browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status == 'complete' || changeInfo.status == 'loading'){
			let url = new URL(tab.url)
			if (urlList.includes(url.origin)) {
				changeInfo.status == 'complete' ? executeScript(tabId) : executeBefore(tabId)
			}
		}
	});
});


function executeScript(tabId){
	browser.storage.sync.get({
		download: true,
		downloader_2: false,
		filename_structure: "",
		hideVK: true,
		subtitles: true,
	}, results => {
		let chrome_arr = {
			downloadStr: browser.i18n.getMessage("downloadStr"),
			downloadLinkDesc: browser.i18n.getMessage("downloadLinkDesc"),
			subtitles: browser.i18n.getMessage("subtitles"),
			cancelDownload: browser.i18n.getMessage("cancelDownload"),
			donateTitle: browser.i18n.getMessage("donateTitle"),
			donateButton: browser.i18n.getMessage("donateButton"),
			errorStr: browser.i18n.getMessage("errorStr"),
			vpnErrorMsg: browser.i18n.getMessage("vpnErrorMsg"),
			args: results
		}
		browser.scripting.executeScript({
			target: { tabId: tabId },
			func: MainScript,
			args: [chrome_arr],
			world: "MAIN"
		});
	})
}
function executeBefore(tabId){
	browser.storage.sync.get({
		mobileMode: false
	}, results => {
		browser.scripting.executeScript({
			target:{ tabId: tabId },
			func: beforeLoaded,
			args: [results]
		});
	})
}


function beforeLoaded(args){
	if (args.mobileMode){ mobileView() }

	function mobileView(){
		document.querySelector("meta[name='viewport']").content = 'width=device-width'
		let meta = document.createElement("meta")
		meta.name = 'viewport'
		meta.content = 'width=device-width'
		document.head.appendChild(meta)
		const style = document.createElement('style');
		style.innerHTML = `
			.b-dwnapp,.b-post__schedule_list,.b-sidelist__holder{overflow:auto}#translators-list li,body{min-width:0}body.active-brand,body.active-brand.pp{padding-top:0!important}#cdnplayer,#cdnplayer-container,#footer,#top-head,#top-nav,#wrapper,.b-container.b-wrapper,.b-footer__inner.b-wrapper,.b-footer__left,.b-tophead.b-wrapper,.b-topnav.b-wrapper,.b-wrapper:has(.b-content__crumbs){width:100%!important}#top-nav{display:flex;height:100%}#search{position:unset}#topnav-menu,.b-content__inline_sidebar,.b-post__social_holder .share-label,.b-post__social_holder .share-list,.b-post__wait_status,.b-simple_episodes__list:before{display:none}.b-tophead-right.user-things.pull-right{width:100%;display:flex;justify-content:space-evenly}#search-results,.b-content__columns,.b-content__inline_inner.b-content__inline_inner_mainprobar,.b-content__inline_inner_main{padding-right:0}#cdnplayer-preloader,.b-collections__newest_inner,.b-content__main,.b-wrapper.nopadd{width:100%}.b-post__infotable{display:flex;flex-wrap:wrap;justify-content:center;padding-left:0}.b-post__infotable_left{margin-left:0}#translators-list{display:grid;grid-template-columns:1fr 1fr}.b-addcomment__actions,.b-content__htitle,.b-post__infolast,.b-post__origtitle,.b-post__title,.b-user__settings_holder_save{text-align:center}.b-sidelist__holder .b-sidelist{display:flex;padding:0 5px}.b-sidelist__holder .b-sidelist div{flex-shrink:0}#ps-content-holder,.b-post__description{padding:10px}.b-content__inline:has(#videosaves-list){overflow:auto}.b-content__inline:has(.b-favorites_content__sidebar){padding-top:10px}#videosaves-list .info,#videosaves-list .title{min-width:120px}.b-search__live_all,.b-search__live_section{margin:0}.b-favorites_content__sidebar{float:unset;margin:auto}.b-content__main_filters{margin:0!important;display:flex;flex-direction:column;align-items:flex-start}.b-content__filters_types{display:flex;width:100%;flex-direction:column-reverse}.b-content__inline_items{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));padding:10px;box-sizing:border-box}.b-navigation{grid-column:1/-1}.b-content__inline_items .b-content__inline_item,.b-post__schedule_table .td-4{width:auto}#newest-slider{width:100%;padding:0}.b-simple_episodes__list{display:grid;grid-template-columns:1fr 1fr 1fr}#hd-comments-list{overflow:hidden}.b-post__actions:has(#user-favorites-holder[style*=block]) td:has(#comments-list-button){display:none}.b-post__schedule_block_title{display:flex}#ps-trailer-player,#ps-trailer-player iframe,.b-content__main_filters_item,.b-post__schedule_block_title .title{width:100%}.b-post__schedule_list .load-more{text-align:left;padding-left:1rem}.b-post__schedule_list table{min-width:max-content}.b-post__schedule_table .td-5{width:auto;padding:1rem}input[type=password],input[type=text],select{width:100%!important;box-sizing:border-box;max-width:90vw;display:block;margin:auto}.b-tabs__main{display:flex;flex-direction:column;gap:5px;padding:10px}.b-user__settings label{margin-left:1rem}textarea.b-area.b-field{max-width:95vw!important;display:block;margin:auto}.b-addcomment__actions .actions-left{float:unset}.b-userprofile__avatar_wrapper{display:flex;flex-direction:column;width:100dvw;align-items:center}.choose-avatar-holder{margin:10px}#login-popup,#register-popup{top:50%!important;left:50%!important;transform:translate(-50%,-50%);margin:0!important;width:95vw;box-sizing:border-box}.register_button{width:100%!important}.b-content__main_filters_item a{width:100%;box-sizing:border-box}
		`
		document.head.appendChild(style);
	}
}


function MainScript(chrome_i18n) {
	var args = chrome_i18n.args;

	if (args.hideVK){ hideVK() }

	let player = document.getElementById('player')
	if (player){
		document.title = document.querySelector('.b-content__main .b-post__title').innerText;
		if (args.download){
			main();
			temp_video_src = document.getElementById('player').getElementsByTagName("video")[0].src
			let observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (temp_video_src != document.getElementById('player').getElementsByTagName("video")[0].src) {
						temp_video_src = document.getElementById('player').getElementsByTagName("video")[0].src
						main();
					}
				});
			});
			observer.observe(document.querySelector("body"), {childList: true, subtree: true});
		}
	}


	async function main(){
		var arr = clearTrash(CDNPlayerInfo.streams).split(",")
		createButton()
		await createDownloadMenu(arr)
		if (args.subtitles){
			addSubtitles()
		}
	}

	function hideVK(){
		let el_ = document.getElementById("vk_groups");
		if (el_){
			el_.style.display = "none";
		}
	}

	function clearTrash(data){
		function product(iterables, repeat) {
			var argv = Array.prototype.slice.call(arguments), argc = argv.length;
			if (argc === 2 && !isNaN(argv[argc - 1])) {
				var copies = [];
			for (var i = 0; i < argv[argc - 1]; i++) {
				copies.push(argv[0].slice()); // Clone
			}
			argv = copies;
			}
			return argv.reduce(function tl(accumulator, value) {
			var tmp = [];
			accumulator.forEach(function(a0) {
				value.forEach(function(a1) {
				tmp.push(a0.concat(a1));
				});
			});
			return tmp;
			}, [[]]);
		}
		function unite(arr){
			var final = [];
			arr.forEach(function(e){
				final.push(e.join(""))
			})
			return final;
		}
		var trashList = ["@","#","!","^","$"];
		var two = unite(product(trashList, 2));
		var tree = unite(product(trashList, 3));
		var trashCodesSet = two.concat(tree);

		var arr = data.replace("#h", "").split("//_//");
		var trashString = arr.join('');

		trashCodesSet.forEach(function(i){
			var temp = btoa(i)
			trashString = trashString.replaceAll(temp, '')
		})
		try{
			var final_string = atob(trashString);
		} catch{
			console.error(trashString)
		}
		return final_string;
	}

	function createButton() {
		if (!document.getElementById("downloadButton")){
			el = document.getElementById("send-video-issue")
			let div = document.createElement("div");
			div.id = "downloadButton"
			div.title = chrome_i18n.downloadStr
			div.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve">
								<g fill="green">
									<path d="M211.667,127.121l-31.669,31.666V75c0-8.285-6.716-15-15-15c-8.284,0-15,6.715-15,15v83.787l-31.665-31.666 c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.859-5.858,15.355,0,21.213l57.271,57.271c2.929,2.93,6.768,4.395,10.606,4.395 c3.838,0,7.678-1.465,10.607-4.393l57.275-57.271c5.857-5.857,5.858-15.355,0.001-21.215 C227.021,121.264,217.524,121.264,211.667,127.121z"/>
									<path d="M195,240h-60c-8.284,0-15,6.715-15,15c0,8.283,6.716,15,15,15h60c8.284,0,15-6.717,15-15C210,246.715,203.284,240,195,240z"/>
								</g>
							</svg>`
			div.style.right = "55px"
			div.style.top = "0"
			div.style.height = "50px"
			div.style.width = "50px"
			div.style.position = "absolute"
			div.style.cursor = "pointer"
			div.style.transition = "0.3s"
			div.style.background = "#2d2d2d"

			div.onmouseover = function(){
				div.style.background = "#4D4D4D"
			}
			div.onmouseout = function(){
				div.style.background = "#2d2d2d"
			}
			div.onclick = show_download_menu

			el.parentNode.insertBefore(div, el);
		}
	}

	function LOADER(){
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" height="50px" style="margin:auto;display:block;" >
			<g transform="translate(25 50)">
			<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="-0.3s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
			<g transform="translate(50 50)">
			<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="-0.16s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
			<g transform="translate(75 50)">
			<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
		</svg>`
	}

	async function createDownloadMenu(array){
		if (!document.getElementById("downloadMenu")){
			let div = document.createElement("div")
			div.id = "downloadMenu"
			div.style.minHeight = "50px"
			div.style.width = "160px"
			div.style.background = "rgba(93, 93, 93, 0.5)"
			div.style.backdropFilter = "blur(5px)"
			div.style.position = "absolute"
			div.style.borderRadius = "6px"
			div.style.padding = "4px"
			div.style.filter = "drop-shadow(black 2px 4px 6px)"
			div.style.zIndex = "100"
			div.style.right = "0"
			div.style.top = "55px"
			div.style.display = "none"
			div.style.opacity = 0
			div.style.transform = "scale(0)"
			div.style.transformOrigin = "top center"
			div.style.transition = "0.5s"
			div.style.userSelect = "none"
			div.style.overflow = "hidden"
			div.innerHTML = LOADER();
			document.getElementById("send-video-issue").parentNode.appendChild(div)
		}
		else{
			document.getElementById("downloadMenu").innerHTML = LOADER();
		}

		let div_target = document.getElementById("downloadMenu")
		let div_ = document.createElement("div")
		for (const e of array) {
			var temp = e.split("[")[1].split("]");
			var quality = temp[0];
			var links = temp[1].split(" or ").filter(x=>x.endsWith('.mp4'))
			for (let link of links){
				let size = await getFileSize(link);
				if (size){
					size = formatBytes(size, 1);
					let element = makeLink(quality, link, size);
					div_.appendChild(element);
					break
				} else{
					console.error({"_": "Error", "name": quality, "url": link})
				}
			}
		}
		div_target.innerHTML = ""
		div_target.appendChild(div_)

		if (div_.children.length == 0){
			vpnAlert(div_target)
		} else{
			donationPopup(div_target)
		}
	}

	function buildFileName(name, season, episode, translation, res){
		if (args.filename_structure){
			var selectArray = {
				"title": name,
				"s": season,
				"ep": episode,
				"transl": translation,
				"res": res
			}
			let temp = args.filename_structure
			Object.keys(selectArray).forEach(function(e){
				if (selectArray[e]){
					temp = temp.replaceAll("%" + e, selectArray[e])
				}else{
					temp = temp.replaceAll("%" + e, "")
				}
			})
			return temp
		}else{return "video"}
	}

	function makeLink(title, href, size){
		let filename = href.split('/').pop()
		let a = document.createElement("a")
		if (args.downloader_2){
			a.title = chrome_i18n.downloadStr
			a.onclick = _=>{
				if (!a.getAttribute("blocked")){
					a.setAttribute("blocked", true)
					let season, episode, translation, name;
					var xhr = new XMLHttpRequest();
					let el = document.querySelector("#simple-episodes-tabs .active")
					if (el){
						season = el.getAttribute("data-season_id")
						episode = el.getAttribute("data-episode_id")
					}
					let el2 = document.querySelector("#translators-list .active")
					if (el2){
						translation = el2.innerText
					}
					name = document.querySelector('.b-content__main .b-post__title').innerText

					var targetFileName = buildFileName(name, season, episode, translation, title)

					let div = document.createElement("span")
					div.className = "download-area"
					div.style.display = "flex"
					div.style.alignItems = "center"
					div.style.padding = "6px 0"
					let progress = document.createElement("progress")
					progress.max = 100;
					let percentage = document.createElement("span")
					percentage.style.marginLeft = "5px"
					percentage.innerHTML = "0%"
					let close_but = document.createElement("button")
					close_but.innerHTML = "✖"
					close_but.style.marginLeft = "5px"
					close_but.style.borderRadius = "50px"
					close_but.style.border = "2px solid transparent"
					close_but.style.height = "20px";
					close_but.style.width = "20px";
					close_but.style.display = "flex";
					close_but.style.alignItems = "center";
					close_but.style.justifyContent = "center";
					close_but.style.color = "red";
					close_but.style.transition = "0.25s"
					close_but.title = chrome_i18n.cancelDownload
					close_but.onclick = _=>{
						xhr.abort();
						a.querySelector(".download-area").remove()
						a.style.background = null
						setTimeout(function(){
							a.removeAttribute("blocked")
						}, 100)
					}
					close_but.onmouseover = _=>{
						close_but.style.borderColor = "red"
					}
					close_but.onmouseout = _=>{
						close_but.style.borderColor = "transparent"
					}
					div.appendChild(progress)
					div.appendChild(percentage)
					div.appendChild(close_but)
					a.appendChild(div)

					window.URL = window.URL || window.webkitURL;
					xhr.open('GET', href, true);
					xhr.responseType = 'blob';
					xhr.onprogress = prog=>{
						let percentComplete = Math.round((prog.loaded / prog.total) * 100);
						progress.value = percentComplete;
						percentage.innerHTML = percentComplete + "%"
					}
					xhr.onload = function () {
						var file = new Blob([xhr.response], { type : 'application/octet-stream' });
						let a_el = document.createElement('a')
						a_el.href = window.URL.createObjectURL(file);
						let extension = filename.split('.').pop();
						a_el.download = `${targetFileName}.${extension}`;
						a_el.click();
						setTimeout(function(){
							close_but.click();
						}, 1000)
					};
					xhr.send();
				}
			}
		}
		else{
			a.href = href
			a.target = '_blank'
			a.download = filename
			a.title = chrome_i18n.downloadLinkDesc
		}
		a.style.display = "block"
		a.style.color = "white"
		a.style.textDecoration = "none"
		a.style.padding = "4px 5px"
		a.style.margin = "2px 0"
		a.style.borderRadius = "6px"
		a.style.transition = "0.2s"
		a.style.cursor = "pointer"

		a.onmouseover = function(){
			a.style.background = "rgb(0, 0, 255, 0.75)"
		}
		a.onmouseout = function(){
			a.style.background = null
		}

		let span = document.createElement("span")
		span.innerHTML = title
		let span2 = document.createElement("span")
		span2.style.float = "right"
		span2.innerHTML = size

		a.appendChild(span)
		a.appendChild(span2)
		return a;
	}

	function addSubtitles(){
		const Subtitles = CDNPlayerInfo.subtitle;
		if (Subtitles){
			let div_ = document.getElementById("downloadMenu");
			let details = document.createElement("details");
			details.style.border = "1px solid white";
			details.style.borderRadius = "8px";
			details.style.margin = "2px";
			details.style.marginTop = "8px";
			details.style.cursor = "pointer";
			let summary = document.createElement("summary");
			summary.innerHTML = chrome_i18n.subtitles;
			summary.style.color = "aqua";
			summary.style.borderRadius = "8px";
			summary.style.textAlign = "center";
			summary.style.transition = "0.2s";
			summary.style.padding = "2px 0";
			summary.onmouseover = function(){
				summary.style.background = "blueviolet"
			}
			summary.onmouseout = function(){
				summary.style.background = null
			}

			details.appendChild(summary);
			div_.appendChild(details);

			let hr = document.createElement("hr");
			hr.style.margin = 0;
			details.appendChild(hr);

			Subtitles.split(",").forEach(async function(e){
				let temp = e.split("[")[1].split("]");
				let lang = temp[0];
				let link = temp[1];
				let size = await getFileSize(link);
				size = formatBytes(size, 1);

				let element = makeLink(lang, link, size);
				details.appendChild(element);
			})
		}
	}

	var timer;
	function show_download_menu(){
		let div = document.getElementById("downloadMenu")
		setTimeout(function(){
			document.body.onclick = hide_download_menu
		}, 50)
		if (div.style.display == "none"){
			div.style.display = "block"
			setTimeout(function(){
				div.style.transform = "scale(1)"
				div.style.opacity = 1
			}, 10)
		}
		else{
			if (timer) {
				clearTimeout(timer);
				div.style.transform = "scale(1)"
				div.style.opacity = 1
			}
		}
	}
	function hide_download_menu(event){
		let div = document.getElementById("downloadMenu")
		let path = event.path || (event.composedPath && event.composedPath());
		if (!path.includes(div)){
			div.style.transform = "scale(0)"
			div.style.opacity = 0
			setTimeout(function(){
				document.body.onclick = ""
			}, 50)
			timer = setTimeout(function(){
				div.style.display = "none"
			}, 400)
		}
	}


	async function getFileSize(url) {
		return new Promise(async (resolve) => {
			let controller = new AbortController();
			fetch(url, {signal: controller.signal}).then(resp=>{
				resolve(resp.headers.get('Content-Length'))
				controller.abort();
			}).catch(_=>{resolve(0)})
		})
	}

	function formatBytes(bytes, decimals = 2) {
		if (bytes == 0) return '';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	function makePopup(parrent){
		let div = document.createElement("div")
		div.style.inset = 0
		div.style.position = "absolute"
		div.style.zIndex = 2
		div.style.background = "rgb(0, 0, 0, 0.85)"
		div.style.padding = "5px"
		div.style.textAlign = "center"
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.justifyContent = "center";
		div.style.alignItems = "center";
		div.style.gap = "5px";
		parrent.appendChild(div)
		return div
	}
	function addCloseButton(popup, callback=null){
		let div = document.createElement("span")
		div.innerHTML = "✖"
		div.style.position = "absolute"
		div.style.zIndex = 3
		div.style.color = "red"
		div.style.fontWeight = "bold"
		div.style.top = "2px"
		div.style.right = "1px"
		div.style.padding = "2px"
		div.style.cursor = "pointer"
		div.style.border = "2px solid red"
		div.style.borderRadius = "50px"
		div.style.height = "1em"
		div.style.width = "1em"
		div.style.display = "flex";
		div.style.justifyContent = "center";
		div.style.alignItems = "center";
		div.style.background = "transparent";
		div.style.transition = "0.15s";

		popup.appendChild(div)
		div.onclick = _=>{
			popup.remove()
			if (callback){ callback() }
		}
		div.onmouseover = _=>{
			div.style.color = "white";
			div.style.background = "red";
		}
		div.onmouseout = _=>{
			div.style.color = "red";
			div.style.background = "transparent";
		}
	}

	function vpnAlert(div_target){
		let popup = makePopup(div_target)
		popup.style.background = "unset"
		popup.style.position = "unset"
		popup.style.padding = "10px"
		popup.innerHTML = `
			<svg fill="white" height="55" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="m20.45 5.468-4-3a.753.753 0 0 0-.45-.15H8a.753.753 0 0 0-.45.15l-4 3a.753.753 0 0 0-.3.6v4.211c0 4.97 3.126 9.481 7.784 11.228a2.744 2.744 0 0 0 1.937-.001c4.653-1.746 7.779-6.257 7.779-11.227V6.068a.75.75 0 0 0-.3-.6Zm-7.7 6.773V14a.75.75 0 0 1-1.5 0v-1.759c-.589-.282-1-.879-1-1.574 0-.965.785-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .695-.411 1.292-1 1.574Z"/>
			</svg>
			<h5 style="color: red; font-size: 1.1em">${chrome_i18n.errorStr}</h5>
			<h5>${chrome_i18n.vpnErrorMsg}</h5>
		`
	}

	function donationPopup(menu_element){
		function checkLastNotificationTime(){
			let currentTime = Math.floor(Date.now() / 1000);
			let lastNotificationTime = localStorage.getItem('lastNotificationTime');
			if (!lastNotificationTime || (currentTime - lastNotificationTime > 12*60*60)) {
				return true;
			} else {
				return false;
			}
		}
		if (checkLastNotificationTime()){
			let popup = makePopup(menu_element)
			menu_element.style.minWidth = "175px"
			popup.innerHTML = `
				<svg height="48" fill="lime" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path d="M21 24.294h-7.09a.5.5 0 0 1 0-1H21a1.318 1.318 0 1 0 0-2.636h-5.092a.505.505 0 0 1-.312-.11l-1.423-1.138a4.99 4.99 0 0 0-5.099-.69l-1.877.805a.5.5 0 0 1-.394-.918l1.877-.805a5.994 5.994 0 0 1 6.118.827l1.286 1.03H21a2.318 2.318 0 1 1 0 4.635Z"/><path d="M16.956 29.5a4.958 4.958 0 0 1-1.571-.255l-8.452-2.817a.5.5 0 1 1 .316-.95l8.453 2.818a3.988 3.988 0 0 0 3.291-.361l9.867-5.92a1.318 1.318 0 1 0-1.356-2.26l-4.171 2.502a.5.5 0 0 1-.514-.858l4.17-2.502a2.318 2.318 0 1 1 2.385 3.976l-9.866 5.919a4.958 4.958 0 0 1-2.552.708Z"/><path d="M7 27.5H2a.5.5 0 0 1 0-1h4.5v-9H2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5Z"/><circle cx="3" cy="19.5" r="1"/><path d="M17.5 16.5a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7Zm0-13a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6Z"/><path d="M17.5 6.972a.5.5 0 0 1-.5-.5v-.918a.5.5 0 1 1 1 0v.918a.5.5 0 0 1-.5.5ZM17.5 13.946a.5.5 0 0 1-.5-.5v-.918a.5.5 0 0 1 1 0v.918a.5.5 0 0 1-.5.5Z"/><path d="M17.5 12.984a2.024 2.024 0 0 1-2.105-1.926.5.5 0 0 1 1 0 1.123 1.123 0 0 0 2.21 0 .87.87 0 0 0-.635-.874l-1.256-.418a1.877 1.877 0 0 1-1.32-1.824 2.114 2.114 0 0 1 4.211 0 .5.5 0 0 1-1 0 1.123 1.123 0 0 0-2.21 0 .87.87 0 0 0 .635.874l1.256.418a1.877 1.877 0 0 1 1.32 1.824 2.024 2.024 0 0 1-2.106 1.926Z"/>
				</svg>
				<h5 style="color:white">${chrome_i18n.donateTitle}</h5>
				<a href="https://donatello.to/super_zombi" target="_blank">
					<button style="--glow-color: #00a0b0; border: .25em solid var(--glow-color); padding: 0.5em 2em; margin: 0.5em; color: var(--glow-color); font-weight: bold; background: black; border-radius: 0.75em; outline: none; box-shadow: 0 0 1em .25em var(--glow-color), inset 0 0 1em 0 var(--glow-color); text-shadow: 0 0 1em var(--glow-color); transition: all 0.3s;">
						${chrome_i18n.donateButton}
					</button>
				</a>
			`
			let button = popup.querySelector("button")
			button.onmouseover = _=>{
				button.style.color = "white";
				button.style.background = "var(--glow-color)";
				button.style.boxShadow = "0 0 1.25em .5em var(--glow-color)";
			}
			button.onmouseout = _=>{
				button.style.color = "var(--glow-color)";
				button.style.background = "black";
				button.style.boxShadow = "0 0 1em .25em var(--glow-color), inset 0 0 1em 0 var(--glow-color)";
			}
			button.onclick = _=>{
				popup.remove()
				var currentTime = Math.floor(Date.now() / 1000);
				localStorage.setItem('lastNotificationTime', currentTime);
			}
			addCloseButton(popup, _=>{
				var currentTime = Math.floor(Date.now() / 1000);
				localStorage.setItem('lastNotificationTime', currentTime);
			})
		}
	}
};
