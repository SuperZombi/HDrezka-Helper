var urlList = [];
var browser = chrome || browser;

browser.storage.sync.get("urlList").then((data) => {
	urlList = data.urlList || ["https://hdrezka.ag", "https://hdrezka.cm", "https://hdrezka.me", "https://hdrezka.co", "https://hdrezka-home.tv"];

	browser.storage.onChanged.addListener((changes) => {
		if (changes.urlList){
			urlList = changes.urlList.newValue

			let newValue = changes.urlList.newValue;
			let oldValue = changes.urlList.oldValue;

			let addedSites = newValue.filter(site => !oldValue || !oldValue.includes(site));
			browser.tabs.query({}, function(tabs) {
				tabs.forEach(tab => {
					if (tab.status == "complete"){
						let url = new URL(tab.url)
						if (addedSites.includes(url.origin)) {
							executeScript(tab.id)
							executeBefore(tab.id)
							browser.action.setIcon({
								path: { 128: "images/logo.png" },
								tabId: tab.id
							})
						}
					}
				})
			})
		}
	})
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete' || changeInfo.status == 'loading'){
		let url = new URL(tab.url)
		if (urlList.includes(url.origin)) {
			changeInfo.status == 'complete' ? executeScript(tabId) : executeBefore(tabId)
			browser.action.setIcon({
				path: { 128: "images/logo.png" },
				tabId: tab.id
			})
		}
	}
})


function executeScript(tabId){
	browser.storage.sync.get({
		download: true,
		fast_filesize: true,
		inline_downloader: false,
		downloader_type: "fetch",
		chunk_size: 5,
		filename_structure: "",
		hideVK: true,
		subtitles: true,
		mobileMode: false,
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
		let viewportMeta = document.querySelector("meta[name='viewport']");
		if (viewportMeta) {
			viewportMeta.content = "width=device-width, initial-scale=1.0";
		} else {
			viewportMeta = document.createElement("meta");
			viewportMeta.name = "viewport";
			viewportMeta.content = "width=device-width, initial-scale=1.0";
			document.head.appendChild(viewportMeta);
		}
		const style = document.createElement('style');
		style.innerHTML = `
			.b-dwnapp,.b-post__schedule_list,.b-sidelist__holder{overflow:auto}#translators-list li,body{min-width:0}body.active-brand,body.active-brand.pp{padding-top:0!important}#cdnplayer,#cdnplayer-container,#footer,#top-head,#top-nav,#wrapper,.b-container.b-wrapper,.b-footer__inner.b-wrapper,.b-footer__left,.b-tophead.b-wrapper,.b-topnav.b-wrapper,.b-wrapper:has(.b-content__crumbs){width:100%!important}#top-nav{display:flex;height:100%}#search{position:unset}#topnav-menu,.b-content__inline_sidebar,.b-post__social_holder .share-label,.b-post__social_holder .share-list,.b-post__wait_status,.b-simple_episodes__list:before{display:none}.b-tophead-right.user-things.pull-right{width:100%;display:flex;justify-content:space-evenly}#search-results,.b-content__columns,.b-content__inline_inner.b-content__inline_inner_mainprobar,.b-content__inline_inner_main{padding-right:0}#cdnplayer-preloader,.b-collections__newest_inner,.b-content__main,.b-wrapper.nopadd{width:100%}.b-post__infotable{display:flex;flex-wrap:wrap;justify-content:center;padding-left:0}.b-post__infotable_left{margin-left:0}#translators-list{display:grid;grid-template-columns:1fr 1fr}.b-addcomment__actions,.b-content__htitle,.b-post__infolast,.b-post__origtitle,.b-post__title,.b-user__settings_holder_save{text-align:center}.b-sidelist__holder .b-sidelist{display:flex;padding:0 5px}.b-sidelist__holder .b-sidelist div{flex-shrink:0}#ps-content-holder,.b-post__description{padding:10px}.b-content__inline:has(#videosaves-list){overflow:auto}.b-content__inline:has(.b-favorites_content__sidebar){padding-top:10px}#videosaves-list .info,#videosaves-list .title{min-width:120px}.b-search__live_all,.b-search__live_section{margin:0}.b-favorites_content__sidebar{float:unset;margin:auto}.b-content__main_filters{margin:0!important;display:flex;flex-direction:column;align-items:flex-start}.b-content__filters_types{display:flex;width:100%;flex-direction:column-reverse}.b-content__inline_items{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));padding:10px;box-sizing:border-box}.b-navigation{grid-column:1/-1}.b-content__inline_items .b-content__inline_item,.b-post__schedule_table .td-4{width:auto}#newest-slider{width:100%;padding:0}.b-simple_episodes__list{display:grid;grid-template-columns:1fr 1fr 1fr}#hd-comments-list{overflow:hidden}.b-post__actions:has(#user-favorites-holder[style*=block]) td:has(#comments-list-button){display:none}.b-post__schedule_block_title{display:flex}#ps-trailer-player,#ps-trailer-player iframe,.b-content__main_filters_item,.b-post__schedule_block_title .title{width:100%}.b-post__schedule_list .load-more{text-align:left;padding-left:1rem}.b-post__schedule_list table{min-width:max-content}.b-post__schedule_table .td-5{width:auto;padding:1rem}input[type=password],input[type=text],select{width:100%!important;box-sizing:border-box;max-width:90vw;display:block;margin:auto}.b-tabs__main{display:flex;flex-direction:column;gap:5px;padding:10px}.b-user__settings label{margin-left:1rem}textarea.b-area.b-field{max-width:95vw!important;display:block;margin:auto}.b-addcomment__actions .actions-left{float:unset}.b-userprofile__avatar_wrapper{display:flex;flex-direction:column;width:100dvw;align-items:center}.choose-avatar-holder{margin:10px}#login-popup,#register-popup{top:50%!important;left:50%!important;transform:translate(-50%,-50%);margin:0!important;width:95vw;box-sizing:border-box}.register_button{width:100%!important}.b-content__main_filters_item a{width:100%;box-sizing:border-box}.tooltipster-base{min-width:unset!important;max-width:unset!important;}#ps-favorites-content{padding:40px 10px;}#ps-favorites-holderbuttons{text-align:center;}
		`
		document.head.appendChild(style);
	}
}


function MainScript(chrome_i18n) {
	var args = chrome_i18n.args;

	if (args.hideVK){ hideVK() }

	function getFilmInfo(){
		const title = document.querySelector('.b-content__main .b-post__title')?.textContent.trim()
		const post_id = (
			document.getElementById("post_id")?.getAttribute("value") ||
			document.getElementById("send-video-issue")?.getAttribute("data-id") ||
			document.getElementById("user-favorites-holder")?.getAttribute("data-post_id") ||
			window.location.pathname.split("/").filter(Boolean).pop().split("-")[0]
		)
		const image = (
			document.querySelector('.b-content__main .b-sidecover a')?.getAttribute("href") ||
			document.querySelector('.b-content__main .b-sidecover img')?.getAttribute("src")
		)
		const filmType = document.head.querySelector('meta[property="og:type"]')?.getAttribute("content")
		if (!(filmType && ["video.tv_series", "video.movie"].includes(filmType))){
			console.error("Failed to get film type")
		}
		const currentEpisode = _=>{
			const el = document.querySelector("#simple-episodes-tabs .active")
			if (el){
				return {
					id: el.getAttribute("data-episode_id"),
					name: el.textContent.trim()
				}
			}
		}
		const currentSeason = _=>{
			const el = document.querySelector("#simple-seasons-tabs .active")
			if (el){
				return {
					id: el.getAttribute("data-tab_id"),
					name: el.textContent.trim()
				}
			}
		}
		const translator = _=>{
			const el = document.querySelector("#translators-list .active")
			if (el){
				return {
					id: el.getAttribute("data-translator_id"),
					name: el.textContent.trim()
				}
			} else {
				const tr = [...document.querySelectorAll(".b-post__info tr")]
					.find(e => e.textContent.includes("переводе"))
				if (!tr){console.error("Failed to find translator name")}
				const tr_name = tr?.querySelector("td:last-child").textContent.trim()
				
				const initCDNEvents = {'video.tv_series': 'initCDNSeriesEvents', 'video.movie': 'initCDNMoviesEvents'}
				const tr_id = document.documentElement.textContent
					.split(`sof.tv.${initCDNEvents[filmType]}`).pop().split("{")[0].split(",")[1].trim()
				return {
					id: tr_id,
					name: tr_name
				}
			}
		}
		return {
			"id": post_id,
			"type": filmType,
			"title": title, "image": image,
			"season": currentSeason(), "episode": currentEpisode(),
			"translator": translator()
		}
	}

	let player = document.getElementById('player')
	if (player){
		let videoElement=_=>{return player.querySelector("video")}
		document.title = getFilmInfo().title;

		videoElement().addEventListener("play",_=>{
			if ("mediaSession" in navigator) {
				let filmInfo = getFilmInfo()
				navigator.mediaSession.metadata = new MediaMetadata({
					title: filmInfo.title,
					artist: [filmInfo.season.name, filmInfo.episode.name].filter(Boolean).join(' • '),
					artwork: [{ src: filmInfo.image }]
				})
			}
		})

		if (args.download){
			main()
			let temp_video_src = videoElement().src
			let observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					let current_video_src = videoElement().src
					if (temp_video_src != current_video_src) {
						temp_video_src = current_video_src
						main()
					}
				})
			})
			observer.observe(document.querySelector("body"), {childList: true, subtree: true})
		}
	}

	function hideVK(){
		let el_ = document.getElementById("vk_groups");
		if (el_){
			el_.style.display = "none";
		}
	}

	function main(){
		createButton()
		const film_info = getFilmInfo()
		console.table(film_info)
		updateDownloadMenuHeader(
			film_info.type == "video.tv_series" ? 
				[film_info.season.name, film_info.episode.name].filter(Boolean).join(' • ') :
				film_info.translator ? film_info.translator.name : film_info.title
		)
		updateDownloadMenuBody(LOADER())
		makeRequest({
			data: {
				id: film_info.id,
				translator_id: film_info.translator.id,
				season: film_info?.season?.id,
				episode: film_info?.episode?.id,
				action: film_info.type == "video.movie" ? "get_movie" : "get_stream"
			}
		}).then(data => {
			createDownloadMenu(data)
		}).catch(err=>{
			console.error(err)
			vpnAlert()
		})
	}

	async function makeRequest({
		url = "ajax/get_cdn_series/",
		data = {}
	}){
		const filtered = Object.fromEntries(
			Object.entries(data).filter(([k, v]) => v)
		)
		const res = await fetch(new URL(url, window.location.origin), {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: new URLSearchParams(filtered)
		})
		if (!res.ok) {
			throw new Error(`Request failed: ${res.status}`)
		}
		const result = await res.json()
		if (!result?.success) {
			throw new Error(`Server error: ${result?.message}`)
		}
		return result
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
			console.error("[Error] Failed to execute clearTrash() on string")
			return trashString;
		}
		return final_string;
	}

	function createButton() {
		if (!document.getElementById("downloadButton")){
			const parent = document.getElementById("send-video-issue")
			const button = document.createElement("div");
			button.id = "downloadButton"
			button.title = chrome_i18n.downloadStr
			const svg = makeSVG("0 0 330 330", "m211.667 127.121-31.669 31.666V75c0-8.285-6.716-15-15-15-8.284 0-15 6.715-15 15v83.787l-31.665-31.666c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.859-5.858 15.355 0 21.213l57.271 57.271A14.95 14.95 0 0 0 164.997 210c3.838 0 7.678-1.465 10.607-4.393l57.275-57.271c5.857-5.857 5.858-15.355.001-21.215-5.859-5.857-15.356-5.857-21.213 0zM195 240h-60c-8.284 0-15 6.715-15 15 0 8.283 6.716 15 15 15h60c8.284 0 15-6.717 15-15 0-8.285-6.716-15-15-15z")
			svg.setAttribute("fill", "green")
			button.appendChild(svg)
			button.style.right = "55px"
			button.style.top = "0"
			button.style.height = "50px"
			button.style.width = "50px"
			button.style.position = "absolute"
			button.style.cursor = "pointer"
			button.style.transition = "0.3s"
			button.style.background = "#2d2d2d"
			button.onmouseover = function(){
				button.style.background = "#4D4D4D"
			}
			button.onmouseout = function(){
				button.style.background = "#2d2d2d"
			}
			button.onclick = show_download_menu
			parent.parentNode.insertBefore(button, parent);
		}
		if (!document.getElementById("downloadMenu")){
			const menu = document.createElement("div")
			menu.id = "downloadMenu"
			menu.style.minHeight = "120px"
			menu.style.width = "200px"
			menu.style.background = "rgba(93, 93, 93, 0.5)"
			menu.style.backdropFilter = "blur(5px)"
			menu.style.position = "absolute"
			menu.style.borderRadius = "6px"
			menu.style.padding = "4px"
			menu.style.filter = "drop-shadow(black 0 0 4px)"
			menu.style.boxShadow = "0 2px 4px black"
			menu.style.zIndex = "100"
			menu.style.right = args.mobileMode ? "5px" : "0"
			menu.style.top = "55px"
			menu.style.display = "none"
			menu.style.opacity = 0
			menu.style.transform = "scale(0)"
			menu.style.transformOrigin = "top center"
			menu.style.transition = "0.5s"
			menu.style.userSelect = "none"
			menu.style.overflow = "hidden"
			menu.style.flexDirection = "column"

			const header = document.createElement("h4")
			header.className = "download-menu-header"
			header.style.whiteSpace = "nowrap"
			header.style.textAlign = "center"
			header.style.overflow = "hidden"
			header.style.textOverflow = "ellipsis"
			header.style.padding = "0.5rem 0.25rem"
			header.style.borderBottom = "1px solid gray"

			const body = document.createElement("div")
			body.className = "download-menu-body"
			body.style.margin = "auto"
			body.style.width = "100%"
			body.style.paddingTop = "5px"
			
			const popup = document.createElement("div")
			popup.className = "download-menu-popup"
			popup.style.position = "absolute"
			popup.style.inset = 0
			popup.style.zIndex = 2
			popup.style.background = "rgb(0, 0, 0, 0.85)"
			popup.style.padding = "5px"
			popup.style.visibility = "hidden"
			popup.style.display = "flex";
			popup.style.flexDirection = "column";
			popup.style.justifyContent = "center";
			popup.style.alignItems = "center";
			popup.style.gap = "5px";
			popup.style.transition = "0.5s ease-in-out"
			popup.style.textAlign = "center"

			menu.appendChild(header)
			menu.appendChild(body)
			menu.appendChild(popup)
			document.getElementById("send-video-issue").parentNode.appendChild(menu)
		}
		else{
			updateDownloadMenuHeader()
			updateDownloadMenuBody(LOADER())
		}
	}
	function downloadMenuExists(){
		if (document.getElementById("downloadMenu")){return true}
		else {console.error("Trying to change download menu, but it is not created yet.")}
	}
	function updateDownloadMenuHeader(text=""){
		if (downloadMenuExists()){
			const header = document.querySelector("#downloadMenu .download-menu-header")
			header.textContent = text
			header.style.visibility = text ? "visible" : "hidden"
		}
	}
	function updateDownloadMenuBody(content=null){
		if (downloadMenuExists()){
			document.querySelector("#downloadMenu .download-menu-body").replaceChildren(...content?.children || [])
		}
	}
	function updateDownloadMenuPopup(content=null, visible=true){
		if (downloadMenuExists()){
			const popup = document.querySelector("#downloadMenu .download-menu-popup")
			popup.replaceChildren(...content?.children || [])
			popup.style.opacity = visible ? 1 : 0
			popup.style.visibility = visible ? "visible" : "hidden"
		}
	}

	async function createDownloadMenu(data){
		if (data.url){
			const array = clearTrash(data.url).split(",")
			let seen = [];
			const result = array.map(e => {
				let temp = e.split("[")[1].split("]");
				let quality = temp[0].replace(/<[^>]*>/g, "").trim();
				let links = temp[1].split(" or ").map(x => x.trim())
					.filter(x => x.endsWith(".mp4") && !seen.includes(x));
				links.forEach(link => seen.push(link));
				return links.length ? { [quality]: links } : null;
			}).filter(Boolean).reduce((a, b) => Object.assign(a, b), {});

			const root = document.createElement("div")
			for (let [quality, links] of Object.entries(result)) {
				for (let link of links){
					let size = await getFileSize(link, args.fast_filesize);
					if (size === null){
						console.error({"_": "Error", "name": quality, "url": link})
					} else{
						let element = makeLink(quality, link, formatBytes(size, 1));
						root.appendChild(element);
						break
					}
				}
			}
			if (root.children.length == 0){
				vpnAlert()
			} else {
				if (args.subtitles && data.subtitle){
					const subs_el = buildSubtitles(data.subtitle)
					root.appendChild(subs_el)
				}
				updateDownloadMenuBody(root)
				donationPopup()
			}
		}
	}

	function buildFileName(name, origName, season, episode, translation, res, year){
		if (args.filename_structure){
			let selectArray = {
				"title": name,
				"origTitle": origName,
				"s": season,
				"ep": episode,
				"tr": translation,
				"res": res,
				"year": year
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
		if (args.inline_downloader){
			a.title = chrome_i18n.downloadStr
			a.onclick = async _=>{
				if (!a.getAttribute("blocked")){
					a.setAttribute("blocked", true)
					let season, episode, translation, origName;
					let el = document.querySelector("#simple-episodes-tabs .active")
					if (el){
						season = el.getAttribute("data-season_id")
						episode = el.getAttribute("data-episode_id")
					}
					let el2 = document.querySelector("#translators-list .active")
					if (el2){
						translation = el2.textContent.trim()
					}
					let name = document.querySelector('.b-content__main .b-post__title').textContent.split("/")[0].trim()
					let origNameEl = document.querySelector('.b-content__main .b-post__origtitle')
					if (origNameEl){
						origName = origNameEl.textContent.split("/")[0].trim()
					} else{
						origName = name
					}
					let year = document.querySelector('.b-content__main .b-post__info a[href*="/year/"]')?.getAttribute("href")?.match(/\d{4}/)?.[0]
					let targetFileName = buildFileName(name, origName, season, episode, translation, title, year)

					let div = document.createElement("span")
					div.className = "download-area"
					div.style.display = "flex"
					div.style.alignItems = "center"
					div.style.padding = "6px 0"
					let progress = document.createElement("progress")
					progress.style.width = "100%"
					progress.max = 100;
					let percentage = document.createElement("span")
					percentage.style.marginLeft = "5px"
					percentage.textContent = "0%"
					let close_area = document.createElement("div")
					close_area.title = chrome_i18n.cancelDownload
					close_area.style.display = "flex"
					close_area.style.marginLeft = "5px"
					let close_but = closeSVG()
					close_but.style.borderRadius = "50%"
					close_but.style.width = "20px";
					close_but.style.transition = "0.25s"
					close_but.onmouseover = _=>{
						close_but.setAttribute("fill", "#c80000")
					}
					close_but.onmouseout = _=>{
						close_but.setAttribute("fill", "red")
					}
					close_area.appendChild(close_but)
					div.appendChild(progress)
					div.appendChild(percentage)
					div.appendChild(close_area)
					a.appendChild(div)

					let on_progress = percent=>{
						progress.value = percent;
						percentage.textContent = percent + "%"
					}
					let finish = _=>{
						div.remove()
						a.style.background = null
						setTimeout(function(){
							a.removeAttribute("blocked")
						}, 100)
					}
					let abort;
					if (args.downloader_type == "fetch"){
						abort = await videoDownloadV3(href, targetFileName, on_progress, finish)
					}
					else if (args.downloader_type == "xhr") {
						abort = videoDownloadV2(href, targetFileName, on_progress, finish)
					}
					close_but.onclick = _=>{
						abort()
						finish()
					}
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
		span.textContent = title
		let span2 = document.createElement("span")
		span2.style.float = "right"
		span2.textContent = size

		a.appendChild(span)
		a.appendChild(span2)
		return a;
	}

	function buildSubtitles(data){
		const details = document.createElement("details")
		details.style.border = "1px solid gray";
		details.style.borderRadius = "8px";
		details.style.marginTop = "6px";
		details.style.overflow = "hidden"
		const summary = document.createElement("summary")
		summary.textContent = chrome_i18n.subtitles;
		summary.style.textAlign = "center";
		summary.style.cursor = "pointer";
		summary.style.transition = "0.2s";
		summary.style.padding = "4px 5px";
		summary.style.borderBottom = "1px solid gray";
		summary.onmouseover = function(){
			summary.style.background = "gray"
		}
		summary.onmouseout = function(){
			summary.style.background = null
		}
		details.appendChild(summary)

		const array = data.split(",")
		array.forEach(async function(e){
			let temp = e.split("[")[1].split("]");
			let lang = temp[0];
			let link = temp[1];
			let size = await getFileSize(link, args.fast_filesize) || 0;
			size = formatBytes(size, 1);
			let element = makeLink(lang, link, size);
			details.appendChild(element);
		})
		return details
	}

	var timer;
	function show_download_menu(){
		let div = document.getElementById("downloadMenu")
		setTimeout(function(){
			document.body.onclick = hide_download_menu
		}, 50)
		if (div.style.display == "none"){
			div.style.display = "flex"
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

	function videoDownloadV2(url, filename, on_progress, on_complete){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'blob';
		xhr.onprogress = prog=>{
			on_progress(Math.round((prog.loaded / prog.total) * 100))
		}
		xhr.onload = function () {
			window.URL = window.URL || window.webkitURL;
			let file = new Blob([xhr.response], { type : 'application/octet-stream' });
			let a_el = document.createElement('a')
			a_el.href = window.URL.createObjectURL(file);
			a_el.download = `${filename}.mp4`;
			a_el.click();
			setTimeout(function(){
				on_complete()
			}, 1000)
		};
		xhr.send()
		return ()=>{xhr.abort()}
	}

	async function videoDownloadV3(url, fileName, on_progress, on_complete){
		let canDownload = true;
		let _blobs = [];
		let _next_offset = 0;
		let CHUNK_SIZE = parseInt(args.chunk_size)*1024*1024;
		let downloaded = 0;
		let filesize = await getFileSize(url) || 0
		let controller = new AbortController();

		function fetchNextPart(_writable){
			fetch(url, {
				signal: controller.signal,
				method: "GET",
				headers: {
					Range: `bytes=${_next_offset}-${Math.min(_next_offset + CHUNK_SIZE, filesize)}`,
				}
			})
			.then((res) => {
				if (![200, 206].includes(res.status)) { throw new Error("Not 200/206 response: " + res.status); }
				return new Response(
					new ReadableStream({
						start(controller) {
							const reader = res.body.getReader();
							read();
							function read() {
								reader.read().then(({done, value}) => {
									if (done) {
										controller.close();
										return;
									}
									downloaded += value.byteLength;
									_next_offset = downloaded;
									on_progress(Math.round((downloaded / filesize) * 100))
									controller.enqueue(value);
									read();
								}).catch(error => {
									console.error(error);
									controller.error(error)
								})
							}
						}
					})
				);
			})
			.then(response => response.blob())
			.then((resBlob) => {
				if (_writable) {
					_writable.write(resBlob);
				} else {
					_blobs.push(resBlob);
				}
			})
			.then(() => {
				if (_next_offset < filesize) {
					if (canDownload){
						fetchNextPart(_writable);
					} else {
						throw new Error("Aborted!")
					}
				} else {
					if (_writable) {
						_writable.close().then(() => {
							on_complete()
						});
					} else {
						save()
						on_complete()
					}
				}
			})
			.catch((reason) => {
				console.error(reason)
				on_complete()
			});
		};

		function save(){
			const blob = new Blob(_blobs, { type: "video/mp4" });
			const blobUrl = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			document.body.appendChild(a);
			a.href = blobUrl;
			a.download = fileName;
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(blobUrl);
		};

		const supportsFileSystemAccess = "showSaveFilePicker" in window;
		if (supportsFileSystemAccess) {
			window.showSaveFilePicker({
				suggestedName: fileName,
				types: [{
					description: 'Video File',
					accept: {'video/mp4': ['.mp4']}
				}]
			}).then((handle) => {
				fileName = handle.name;
				handle.createWritable()
				.then((writable) => {
					fetchNextPart(writable);
				})
			})
			.catch((err) => {
				if (err.name !== "AbortError") {
					console.error(err.name, err.message);
				}
				on_complete()
			});
		} else {
			fetchNextPart(null);
		}
		return ()=>{canDownload = false;controller.abort()}
	}

	async function getFileSize(url, fast=false) {
		async function makeRequest(method) {
			let args = {}
			let controller = new AbortController();
			try {
				let resp = await fetch(url, {
					method: method,
					signal: controller.signal
				})
				controller.abort();
				return resp.headers.get('Content-Length') || null
			} catch (e){
				return null;
			}
		}
		let size = await makeRequest('HEAD')
		if (size === null && !fast) {
			return await makeRequest('GET')
		}
		return size
	}

	function formatBytes(bytes, decimals = 2) {
		if (bytes == 0) return '';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	function LOADER(){
		const svgNamespace = "http://www.w3.org/2000/svg";
		function createCircle(cx, begin) {
			let circle = document.createElementNS(svgNamespace, "circle");
			circle.setAttribute("cx", cx);
			circle.setAttribute("cy", "12");
			circle.setAttribute("r", "3");
			circle.setAttribute("fill", "lightblue");

			let animate = document.createElementNS(svgNamespace, "animate");
			animate.setAttribute("attributeName", "r");
			animate.setAttribute("begin", begin);
			animate.setAttribute("dur", "0.75s");
			animate.setAttribute("values", "3;.2;3");
			animate.setAttribute("repeatCount", "indefinite");

			circle.appendChild(animate);
			return circle;
		}
		const div = document.createElement("div")
		const svg = document.createElementNS(svgNamespace, "svg");
		svg.setAttribute("viewBox", "0 0 24 24")
		svg.style.height = "50px"
		svg.style.margin = "auto"
		svg.style.display = "block"
		svg.appendChild(createCircle("4", "0s"));
		svg.appendChild(createCircle("12", "0.15s"));
		svg.appendChild(createCircle("20", "0.3s"));
		div.appendChild(svg)
		return div
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
	function closeSVG(color="red"){
		const svgNamespace = "http://www.w3.org/2000/svg";
		let svg = document.createElementNS(svgNamespace, "svg");
		svg.setAttribute("viewBox", "0 0 512 512")
		svg.setAttribute("fill", color);
		let circle = document.createElementNS(svgNamespace, "circle");
		circle.setAttribute("cx", "256");
		circle.setAttribute("cy", "256");
		circle.setAttribute("r", "256");
		svg.append(circle)
		let path_el = document.createElementNS(svgNamespace, "path");
		path_el.setAttribute("d", "M334.63 177.37a24 24 0 0 1 0 33.94L289.94 256l44.69 44.69a24 24 0 1 1-33.94 33.94L256 289.94l-44.69 44.69a24 24 0 1 1-33.94-33.94L222.06 256l-44.69-44.69a24 24 0 1 1 33.94-33.94L256 222.06l44.69-44.69a24 24 0 0 1 33.94 0z");
		path_el.setAttribute("fill", "#fff");
		svg.append(path_el)
		return svg
	}

	function vpnAlert(){
		const div = document.createElement("div")
		const svg = makeSVG("0 0 24 24", "m20.45 5.468-4-3a.753.753 0 0 0-.45-.15H8a.753.753 0 0 0-.45.15l-4 3a.753.753 0 0 0-.3.6v4.211c0 4.97 3.126 9.481 7.784 11.228a2.744 2.744 0 0 0 1.937-.001c4.653-1.746 7.779-6.257 7.779-11.227V6.068a.75.75 0 0 0-.3-.6Zm-7.7 6.773V14a.75.75 0 0 1-1.5 0v-1.759c-.589-.282-1-.879-1-1.574 0-.965.785-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .695-.411 1.292-1 1.574Z")
		svg.setAttribute("fill", "white")
		svg.style.height = "55px"
		div.appendChild(svg)

		const h1 = document.createElement("h5")
		h1.style.color = "red"
		h1.textContent = chrome_i18n.errorStr
		div.appendChild(h1)
		const h2 = document.createElement("h5")
		h2.textContent = chrome_i18n.vpnErrorMsg
		div.appendChild(h2)
		updateDownloadMenuPopup(div)
		updateDownloadMenuHeader()
		updateDownloadMenuBody()
	}

	function donationPopup(){
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
			const popup = document.createElement("div")
			const svg = makeSVG("0 0 32 32", "M21 24.3h-7.09a.5.5 0 0 1 0-1H21a1.32 1.32 0 1 0 0-2.64h-5.1a.5.5 0 0 1-.3-.11l-1.43-1.14a4.99 4.99 0 0 0-5.1-.69l-1.87.8a.5.5 0 0 1-.4-.91l1.88-.8a6 6 0 0 1 6.12.82l1.28 1.03H21a2.32 2.32 0 1 1 0 4.63Zm-4.04 5.2a4.96 4.96 0 0 1-1.58-.26l-8.45-2.81a.5.5 0 1 1 .32-.95l8.45 2.82a3.99 3.99 0 0 0 3.3-.36l9.86-5.92a1.32 1.32 0 1 0-1.36-2.26l-4.17 2.5a.5.5 0 0 1-.51-.86l4.17-2.5a2.32 2.32 0 1 1 2.38 3.97l-9.86 5.92a4.96 4.96 0 0 1-2.55.71ZM7 27.5H2a.5.5 0 0 1 0-1h4.5v-9H2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5Zm10.5-11a7 7 0 1 1 7-7 7 7 0 0 1-7 7Zm0-13a6 6 0 1 0 6 6 6 6 0 0 0-6-6Zm0 3.47a.5.5 0 0 1-.5-.5v-.92a.5.5 0 1 1 1 0v.92a.5.5 0 0 1-.5.5Zm0 6.98a.5.5 0 0 1-.5-.5v-.92a.5.5 0 0 1 1 0v.92a.5.5 0 0 1-.5.5Zm0-.97a2.02 2.02 0 0 1-2.1-1.92.5.5 0 0 1 1 0 1.12 1.12 0 0 0 2.2 0 .87.87 0 0 0-.63-.88l-1.26-.41a1.88 1.88 0 0 1-1.32-1.83 2.11 2.11 0 0 1 4.21 0 .5.5 0 0 1-1 0 1.12 1.12 0 0 0-2.2 0 .87.87 0 0 0 .63.88l1.26.41a1.88 1.88 0 0 1 1.32 1.83 2.02 2.02 0 0 1-2.11 1.92Z")
			svg.setAttribute("fill", "lime")
			svg.style.height = "48px"
			popup.appendChild(svg)

			const h = document.createElement("h5")
			h.style.color = "white"
			h.textContent = chrome_i18n.donateTitle
			popup.appendChild(h)

			const a = document.createElement("a")
			a.href = "https://donatello.to/super_zombi"
			a.target = "_blank"
			popup.appendChild(a)
			
			const button = document.createElement("button")
			button.textContent = chrome_i18n.donateButton
			a.appendChild(button)
			button.style.setProperty("--glow-color", "#00a0b0");
			button.style.border = ".25em solid var(--glow-color)";
			button.style.padding = "0.5em 2em";
			button.style.margin = "0.5em";
			button.style.color = "var(--glow-color)";
			button.style.fontWeight = "bold";
			button.style.background = "black";
			button.style.borderRadius = "0.75em";
			button.style.outline = "none";
			button.style.boxShadow = "0 0 1em .25em var(--glow-color), inset 0 0 1em 0 var(--glow-color)";
			button.style.textShadow = "0 0 1em var(--glow-color)";
			button.style.transition = "all 0.3s";
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

			const close_but = closeSVG()
			close_but.style.position = "absolute"
			close_but.style.zIndex = 3
			close_but.style.top = "3px"
			close_but.style.right = "3px"
			close_but.style.cursor = "pointer"
			close_but.style.borderRadius = "50%"
			close_but.style.width = "22px";
			close_but.style.transition = "0.25s"
			close_but.onmouseover = _=>{
				close_but.setAttribute("fill", "#c80000")
			}
			close_but.onmouseout = _=>{
				close_but.setAttribute("fill", "red")
			}
			popup.appendChild(close_but)

			const popupAction = _=>{
				updateDownloadMenuPopup(popup, false)
				const currentTime = Math.floor(Date.now() / 1000)
				localStorage.setItem('lastNotificationTime', currentTime)
			}
			close_but.onclick = _=>popupAction()
			button.onclick = _=>popupAction()
			updateDownloadMenuPopup(popup)
		}
	}
}
