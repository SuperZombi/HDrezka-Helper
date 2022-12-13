// ==UserScript==
// @name         HDrezka Helper
// @version      4.0.1
// @description  Adds a «Download» button below the video. Export favorites and more.
// @author       Super Zombi
// @match        https://hdrezka.cm/*
// @match        https://rezka.ag/*
// @match        https://hdrezka.me/*
// @match        https://hdrezka.ag/*
// @icon         data:image/png;base64,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
// @homepageURL  https://github.com/SuperZombi/HDrezka-Helper
// @supportURL   https://github.com/SuperZombi/HDrezka-Helper/issues
// @updateURL    https://raw.githubusercontent.com/SuperZombi/HDrezka-Helper/main/hdrezka_helper.user.js
// @downloadURL  https://raw.githubusercontent.com/SuperZombi/HDrezka-Helper/main/hdrezka_helper.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
	'use strict';

const locale = {
	'en': {
		"settings": "Settings",
		"saveBut": "Save",
    	"resetBut": "Reset",
		"closeBut": "Close",
		"downloadBut": "«Download» button",
		"exportStr": "Export",
		"exportBut": "Export Favorites",
		"animationBut": "Animation",
		"hideVkBut": "Hide VK",
		"downloadStr": "Download",
		"downloadLinkDesc": "Alt click on the link to save the file",
		"subtitles": "Subtitles",
		"cancelDownload": "Cancel",
		"fileNamePattern": "File name pattern",
		"insertVariable": "Insert Variable",
		"help": "Help",
		"movieTitle": "Movie title",
		"season": "Season",
		"episode": "Episode",
		"translation": "Translation",
		"resolution": "Resolution"
	},
	'ru': {
		"settings": "Настройки",
		"saveBut": "Сохранить",
		"resetBut": "Сбросить",
		"closeBut": "Закрыть",
		"downloadBut": "Кнопка «Скачать»",
		"exportStr": "Экспорт",
		"exportBut": "Экспорт закладок",
		"animationBut": "Анимация",
		"hideVkBut": "Скрывать VK",
		"downloadStr": "Скачать",
		"downloadLinkDesc": "Нажмите на ссылку, удерживая клавишу Alt, чтобы сохранить файл",
		"subtitles": "Субтитры",
		"cancelDownload": "Отменить",
		"fileNamePattern": "Шаблон имени файла",
		"insertVariable": "Вставить переменную",
		"help": "Помощь",
		"movieTitle": "Название фильма",
		"season": "Сезон",
		"episode": "Эпизод",
		"translation": "Перевод",
		"resolution": "Качество"
	},
	'uk': {
		"settings": "Налаштування",
		"saveBut": "Зберегти",
		"resetBut": "Скинути",
		"closeBut": "Закрити",
		"downloadBut": "Кнопка «Завантажити»",
		"exportStr": "Експорт",
		"exportBut": "Експорт закладок",
		"animationBut": "Анімація",
		"hideVkBut": "Приховувати VK",
		"downloadStr": "Завантажити",
		"downloadLinkDesc": "Натисніть на посилання, утримуючи клавішу Alt, щоб зберегти файл",
		"subtitles": "Субтитри",
		"cancelDownload": "Скасувати",
		"fileNamePattern": "Шаблон імені файлу",
		"insertVariable": "Вставити змінну",
		"help": "Допомога",
		"movieTitle": "Назва фільму",
		"season": "Сезон",
		"episode": "Епізод",
		"translation": "Переклад",
		"resolution": "Якість"
	}
}

function get_message(name, default_="en"){
	var userLang = (navigator.language || navigator.userLanguage).slice(0,2).toLowerCase(); 
	if (Object.keys(locale).includes(userLang) && Object.keys(locale[userLang]).includes(name)){
	return locale[userLang][name]
	}
	return locale[default_][name]
}


function db_get(value, default_=undefined){
	let val = GM_getValue(value)
	if (val != undefined){
		return val
	}
	else{ return default_ }
}
function db_save(array){
	for (let el in array) {
		GM_setValue(el, array[el])
	}
}

GM_registerMenuCommand(get_message('settings'), ()=>{
	let div = document.createElement("div")
	div.style.position = 'fixed'
	div.style.zIndex = 10000
	div.style.top = 0
	div.style.right = "-50%"
	div.style.willChange = "right"
	div.style.transition = "0.5s"
	div.style.borderRadius = "0 0 0 12px";
	div.style.background = "white";
	div.style.filter = "drop-shadow(0px 0px 2px black)";
	div.style.fontSize = "14pt"
	div.style.minWidth = "300px"

	if (document.body.classList.contains("b-theme__template__night")){
		div.style.backgroundColor = "#181818";
		div.style.color = "white";
		div.style.filter = "drop-shadow(0px 0px 2px white)";
	}

	let close = document.createElement("div")
	close.style.textAlign = "right"
	close.style.cursor = "pointer"
	close.style.margin = "10px"
	let img = document.createElement("img")
	img.title = get_message("closeBut")
	img.style.height = '20px'
	img.src = 'data:image/png;base64,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'
	img.onclick = _ => {
		div.style.right = "-50%"
		setTimeout(()=>{ div.remove() }, 500)
	}
	close.appendChild(img)
	div.appendChild(close)

	let content = document.createElement("div")
	content.style.textAlign = "center"
	content.style.padding = "20px"
	content.style.paddingTop = 0
	content.innerHTML = `
	<h3 style="font-size: 1.17em;">${get_message('settings')}</h3>

	<hr style="border-top: 1px solid #dfe1e8; margin: 0.5em 0;">

	<div style="text-align:left;">

		<label style="display: block; margin-top: 5px;">
			<input class="settings" type="checkbox" name="download" checked>
			<span>${get_message('downloadBut')}</span>

			<label style="display: block; margin-left: 16px; margin-top: 6px; font-size: 12pt;">
			<input class="settings" type="checkbox" name="subtitles" checked>
			<span>${get_message("subtitles")}</span>
			</label>

			<label style="display: block; margin-left: 16px; margin-top: 6px; font-size: 12pt;">
			<input class="settings" type="checkbox" name="downloader_2">
			<span>Downloader 2.0</span>
			</label>
		</label>

		<span id="filename_structure_block" style="margin: 8px 0 10px 30px;display:none">
				<span>${get_message("fileNamePattern")}:</span>
				<div style="position: relative;">
					<input type="text" id="filename_structure" style="display: block; width: 100%;
							font-size: 16px; margin: 5px 0; font-family: monospace;">
					<div id="variables_list" style="position: absolute; display: none; flex-direction: column;
							background: lightblue; color: black; padding: 3px; border-radius: 15px;
							font-size: 0.9em; font-family: monospace;">
						<span style="padding: 3px 12px; cursor: pointer; border-radius: 12px;"
							value="%title">${get_message("movieTitle")}</span>
						<span style="padding: 3px 12px; cursor: pointer; border-radius: 12px;"
							value="%s">${get_message("season")}</span>
						<span style="padding: 3px 12px; cursor: pointer; border-radius: 12px;"
							value="%ep">${get_message("episode")}</span>
						<span style="padding: 3px 12px; cursor: pointer; border-radius: 12px;"
							value="%transl">${get_message("translation")}</span>
						<span style="padding: 3px 12px; cursor: pointer; border-radius: 12px;"
							value="%res">${get_message("resolution")}</span>
					</div>
				</div>
				<button id="insert_variable_but">${get_message("insertVariable")}</button>
				<details style="color:grey;font-size: 0.8em;">
					<summary style="padding: 10px 0;cursor:pointer;">${get_message("help")}</summary>
					<table>
						<tr>
							<td><code>%title</code></td>
							<td style="text-align:center">${get_message("movieTitle")}</td>
						</tr>
						<tr>
							<td><code>%s</code></td>
							<td style="text-align:center">${get_message("season")}</td>
						</tr>
						<tr>
							<td><code>%ep</code></td>
							<td style="text-align:center">${get_message("episode")}</td>
						</tr>
						<tr>
							<td><code>%transl</code></td>
							<td style="text-align:center">${get_message("translation")}</td>
						</tr>
						<tr>
							<td><code>%res</code></td>
							<td style="text-align:center">${get_message("resolution")}</td>
						</tr>
					</table>
				</details>
			</span>

		<label style="display: block; margin-top: 8px;">
			<input class="settings" type="checkbox" name="exportFavorites" checked>
			<span>${get_message('exportBut')}</span>

			<label style="display: block; margin-left: 16px; margin-top: 6px; font-size: 12pt;">
			<input class="settings" type="checkbox" name="export_animation" checked>
			<span>${get_message('animationBut')}</span>
			</label>
		</label>
		
		<label style="display: block; margin-top: 8px;">
			<input class="settings" type="checkbox" name="hideVK" checked>
			<span>${get_message('hideVkBut')}</span>
		</label>

	</div>

	
	<hr style="border-top: 1px solid #dfe1e8; margin: 0.5em 0;">
	<button name="save" style="font-size: 14pt; cursor: pointer; border: 5em; outline: none;
								margin-top: 5px; padding: 0.5em 1.5em; border-radius: 65px;
								background-image: linear-gradient(45deg, #4568dc, #b06ab3);
								box-shadow: 1px 1px 10px grey; color: white;">
		${get_message("saveBut")}</button>
	<p style="display: flex; align-items: center; justify-content: space-between; margin-top: 1em">
		<a style="display: flex; align-items: center;" href="https://github.com/SuperZombi/HDrezka-Helper" target="_blank">
		<svg style="background: white; border-radius: 50px; padding: 1px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
		<span style="margin-left:5px; color: blue;">GitHub</span>
		</a>

		<img style="margin-top:2px;" src="https://shields.io/badge/version-v4.0.1-blue">
	</p>
	`
	div.appendChild(content)
	let keys = GM_listValues()
	keys.forEach(e=>{
		if (e != 'filename_structure'){
			try{
				let els = div.querySelectorAll(`input[name=${e}]`)
				if (els.length > 1){
					let val = db_get(e)
					let el = Array.from(els).filter(e=>e.value == val)[0]
					el.checked = true
				}
				else{
					els[0].checked = db_get(e)
				}
			} catch{
				GM_deleteValue(e)
			}
		}
	})
	if (keys['filename_structure'] && keys['filename_structure'] != ""){
		dinamic_input(keys['filename_structure'])
	}else{
		dinamic_input("%title s-%s ep-%ep [%transl]")
	}

	let save = div.querySelector("button[name=save]")
	save.onclick = () => initSave()

	window.addEventListener("keydown", function(e){
	    if (e.keyCode == 17){ // CTRL
	      if (!event.repeat){
	        save.innerHTML = get_message('resetBut')
	        save.onclick = _ => {
	          let keys = GM_listValues()
	          keys.forEach(key=>{
	            GM_deleteValue(key)
	          })
	          window.location.reload()
	        }
	      }
	    }
	  })
	window.addEventListener("keyup", function(e){
		if (e.keyCode == 17){ // CTRL
		  save.innerHTML = get_message('saveBut')
		  save.onclick = () => initSave()
		}
	})

	function initSave(){
		let settings = {}
		let inputs = div.querySelectorAll("input.settings")
		Array.from(inputs).forEach(e=>{
			if (e.type == "checkbox"){
			settings[e.name] = e.checked
			}
			else if (e.type == "radio" && e.checked){
			settings[e.name] = e.value
			}
		})
		settings['filename_structure'] = div.querySelector("#filename_structure").value
		db_save(settings)
		window.location.reload()
	}
	function dinamic_input(init_value){
		var input = div.querySelector("#filename_structure")
		set_value(init_value)
		div.querySelector("[name=downloader_2]").onchange = e=>{
			if (e.target.checked){
				div.querySelector("#filename_structure_block").style.display = "block"
			}
			else{
				div.querySelector("#filename_structure_block").style.display = "none"
			}
		}
		if (div.querySelector("[name=downloader_2]").checked){
			div.querySelector("#filename_structure_block").style.display = "block"
		}
		div.querySelectorAll("#variables_list > *").forEach(e=>{
			e.onmouseover = _=>{
				e.style.background = "#00C0FF"
			}
			e.onmouseout = _=>{
				e.style.background = ""
			}
			e.onclick = _=>{
				if (input.value != ""){
					input.value += " "
				}
				input.value += e.getAttribute("value")
				div.querySelector("#variables_list").style.display = "none"
				input.focus()
			}
		})
		function hideInsertMenu(){
			div.querySelector("#variables_list").style.display = "none"
			div.removeEventListener("click", hideInsertMenu)
		}
		div.querySelector("#insert_variable_but").onclick = _=>{
			div.querySelector("#variables_list").style.display = "flex"
			setTimeout(function(){div.addEventListener("click", hideInsertMenu)}, 500)
		}
		input.addEventListener("focus", _=>{
			input.selectionStart = input.selectionEnd = input.value.length;
		})
		function set_value(text){
			input.value = text
		}
	}

	document.body.appendChild(div)
	setTimeout(()=>{ div.style.right = 0; }, 1)
})

function main(){
	let keys = GM_listValues()
	if (db_get("hideVK", true)){
		hideVK()
	}
	var player = document.getElementById('player')
	if (player){
		document.title = document.querySelector('.b-content__main .b-post__title').innerText;

		if (db_get("download", true)){
			downloader();
			var temp_video_src = player.getElementsByTagName("video")[0].src

			let observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (temp_video_src != document.getElementById('player').getElementsByTagName("video")[0].src) {
						temp_video_src = document.getElementById('player').getElementsByTagName("video")[0].src
						downloader();
					}
				});
			});
			observer.observe(document.querySelector("body"), {childList: true, subtree: true});
		}
	}
	else if (window.location.pathname.includes("/favorites/") && db_get("exportFavorites", true)){
		exportFavorites()
	}
}
window.onload = _=>main();

function hideVK(){
	let el_ = document.getElementById("vk_groups");
	if (el_){
		el_.style.display = "none";
	}
}

async function downloader(){
	var arr = clearTrash(CDNPlayerInfo.streams).split(",")
	createButton()
	await createDownloadMenu(arr)
	if (db_get("subtitles", true)){
		addSubtitles()
	}

	function createButton() {
		if (!document.getElementById("downloadButton")){
			let el = document.getElementById("send-video-issue")
			let div = document.createElement("div");
			div.id = "downloadButton"
			div.title = get_message('downloadStr')
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
			div.style.zIndex = "2"
			div.style.right = "0"
			div.style.top = "55px"
			div.style.display = "none"
			div.style.opacity = 0
			div.style.transform = "scale(0)"
			div.style.transformOrigin = "top center"
			div.style.transition = "0.5s"

			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" height="50px" style="margin:auto;display:block;" >
							<g transform="translate(25 50)">
							<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="-0.3333333333333333s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
							<g transform="translate(50 50)">
							<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="-0.16666666666666666s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
							<g transform="translate(75 50)">
							<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
							</svg>`

			document.getElementById("send-video-issue").parentNode.appendChild(div)
		}
		else{
			document.getElementById("downloadMenu").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" height="50px" style="margin:auto;display:block;" >
							<g transform="translate(25 50)">
							<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="-0.3333333333333333s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
							<g transform="translate(50 50)">
							<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="-0.16666666666666666s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
							<g transform="translate(75 50)">
							<circle cx="0" cy="0" r="6" fill="lightblue"><animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform></circle></g>
							</svg>`
		}

		let div_ = document.getElementById("downloadMenu")
		div_.innerHTML = ""
		for (const e of array) {
			var temp = e.split("[")[1].split("]");
			var quality = temp[0];
			var link = temp[1].split(" or ")[1];
			var size = await getFileSize(link);
			size = formatBytes(size, 1);

			let element = makeLink(quality, link, size);
			div_.appendChild(element);
		}
	}

	function buildFileName(name, season, episode, translation, res){
		if (db_get("filename_structure")){
			var selectArray = {
				"title": name,
				"s": season,
				"ep": episode,
				"transl": translation,
				"res": res
			}
			let temp = db_get("filename_structure")
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
		let a = document.createElement("a")
		if (db_get("downloader_2", false)){
			a.title = get_message('downloadStr')
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
					close_but.title = get_message('cancelDownload')
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
						a_el.download = targetFileName + '.mp4'; 
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
			a.download = "video.mp4"
			a.title = get_message('downloadLinkDesc')
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
	async function getFileSize(url){
		return await new Promise((resolve, reject) => {
			var http = new XMLHttpRequest();
			http.open('HEAD', url, true);
			http.onreadystatechange = function() {
				if (this.readyState == this.DONE) {
					if (this.status === 200) {
						let fileSize = this.getResponseHeader('content-length');
						resolve(fileSize)
					}
				}
			};
			http.send();
		})
	}
	function formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
	function hide_download_menu(e){
		let div = document.getElementById("downloadMenu")
		if (e.target.closest("div") && e.target.closest("div") != div){
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
			summary.innerHTML = get_message('subtitles');
			summary.style.color = "aqua";
			summary.style.borderRadius = "8px";
			summary.style.textAlign = "center";
			summary.style.transition = "0.2s"
			summary.onmouseover = function(){
				summary.style.background = "blueviolet"
			}
			summary.onmouseout = function(){
				summary.style.background = null
			}

			details.appendChild(summary);
			div_.appendChild(details);

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

	function clearTrash(data){
		function product(iterables, repeat) {
			var argv = Array.prototype.slice.call(arguments), argc = argv.length;
			if (argc === 2 && !isNaN(argv[argc - 1])) {
				var copies = [];
			for (var i = 0; i < argv[argc - 1]; i++) {
				copies.push(argv[0].slice());
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

		var final_string = atob(trashString);
		return final_string;
	}
}


function exportFavorites(){
	if(window.location.hash){
		let num = parseInt(window.location.hash.substring(1).replace("parsing", ""))
		let arr = JSON.parse(GM_getValue('parseArray'));
		let el = document.getElementsByClassName("b-content__htitle")[0];
		let span = document.createElement("span");
		let exportStr = get_message("exportStr");
		span.innerHTML = `— ${exportStr} ${num+1}/${arr.length}`
		span.style.color = "cornflowerblue";
		el.appendChild(span)

		GM_setValue(`parsedArray${num}`, JSON.stringify(parseContent()));
		if (num+1 >= arr.length){
			var finalResult = {};
			GM_deleteValue(`parseArray`);
			for (let i = 0; i < arr.length; i++) {
				let parsed = JSON.parse(GM_getValue(`parsedArray${i}`));
				finalResult[arr[i].name] = parsed
				GM_deleteValue(`parsedArray${i}`);
			}
			download('my_favorites.json', JSON.stringify(finalResult, null, 2));
			document.location.replace(window.location.origin + "/favorites/")
		}
		else{
			document.location.replace(arr[num+1].link)
		}
	}
	else{
		let el = document.getElementsByClassName("b-content__htitle")[0];
		let div = document.createElement("div");
		
		div.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 120.54" xml:space="preserve">
			<g fill="cornflowerblue">
			<path d="M95.7,65.5c15.01,0,27.18,12.17,27.18,27.18c0,15.01-12.17,27.18-27.18,27.18 c-15.01,0-27.18-12.17-27.18-27.18C68.52,77.67,80.69,65.5,95.7,65.5L95.7,65.5z M111.57,92.9h-9.98V77.16H90.33V92.9l-10.27,0 l15.75,15.32L111.57,92.9L111.57,92.9z M17.69,26.67c8.1,2.71,19.38,4.38,31.91,4.38c12.53,0,23.81-1.67,31.91-4.38 c7.11-2.37,11.51-5.25,11.51-8.06c0-2.81-4.4-5.69-11.51-8.06c-8.1-2.7-19.38-4.38-31.91-4.38c-12.53,0-23.81,1.67-31.91,4.38 C2.6,15.59,2.18,21.5,17.69,26.67L17.69,26.67z M6.24,47.86c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.71,19.38,4.38,31.91,4.38 s23.81-1.67,31.91-4.38c7.11-2.37,11.51-5.25,11.51-8.06h0.03v-19.3c-2.53,1.73-5.78,3.26-9.59,4.53 c-8.73,2.91-20.71,4.72-33.86,4.72c-13.16,0-25.13-1.8-33.86-4.72c-3.77-1.26-6.98-2.76-9.49-4.47V47.86L6.24,47.86z M63.3,92.54 c-4.35,0.44-8.95,0.67-13.7,0.67c-13.16,0-25.13-1.8-33.86-4.72c-3.77-1.26-6.98-2.76-9.49-4.47v18.49 c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.7,19.38,4.38,31.91,4.38c7.52,0,14.58-0.6,20.78-1.67c1.56,1.94,3.33,3.7,5.29,5.24 c-7.53,1.65-16.49,2.6-26.07,2.6c-13.16,0-25.13-1.8-33.86-4.72c-4.6-1.54-15.67-6.58-15.67-12.62c0-0.71,0-1.3,0-1.98 C0.06,73.69,0,46.15,0,18.61c0-5.76,6.01-10.65,15.73-13.9C24.46,1.8,36.44,0,49.6,0c13.16,0,25.13,1.8,33.86,4.72 c8.85,2.95,14.62,7.27,15.59,12.37c0.12,0.32,0.18,0.67,0.18,1.04v42.37c-1.2-0.14-2.42-0.21-3.66-0.21c-0.85,0-1.68,0.03-2.51,0.1 v-3.74c-2.53,1.73-5.78,3.26-9.59,4.53c-8.73,2.91-20.71,4.72-33.86,4.72c-13.16,0-25.13-1.8-33.86-4.72 c-3.77-1.26-6.98-2.76-9.49-4.47v18.49c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.7,19.38,4.38,31.91,4.38c5.01,0,9.82-0.27,14.31-0.76 C63.51,88.3,63.3,90.4,63.3,92.54L63.3,92.54z"/>
			</g>
		</svg>
		`
		div.title = get_message("exportStr")
		div.style.cursor = "pointer"
		div.style.verticalAlign = "bottom"
		div.style.borderRadius = "8px"
		div.style.transition = "0.3s"
		div.style.boxShadow = "0 0 4px grey"
		div.onmouseover = function(){
			div.style.boxShadow = "0 0 8px grey"
		}
		div.onmouseout = function(){
			div.style.boxShadow = "0 0 4px grey"
		}
		div.onclick = parseFavorites

		if (db_get('export_animation', true)){
			div.style.height = "0px"
			div.style.width = "0px"
			div.style.margin = "0 0px"
			div.style.padding = "0px"
			div.style.transform = "scale(0)"
			div.style.transformOrigin = "center"
			div.style.opacity = 0

			el.prepend(div)
			setTimeout(function(){
				div.style.height = "35px"
				div.style.width = "35px"
				div.style.margin = "0 5px"
				div.style.padding = "5px"
				div.style.transform = "scale(1)"
				div.style.display = "inline-block"
				div.style.opacity = 1
			}, 50)
		}
		else{
			div.style.height = "35px"
			div.style.width = "35px"
			div.style.margin = "0 5px"
			div.style.padding = "5px"
			div.style.display = "inline-block"
			el.prepend(div)
		}		
	}

	function getArray(){
		var temp = [];
		var folders = document.getElementById("user-favorites-holder").getElementsByClassName("b-favorites_content__cats_list_link")
		Object.keys(folders).forEach(function(e){
			var el = folders[e]
			var link = el.getAttribute("href")
			var name = el.getElementsByClassName("name")[0].innerHTML
			temp.push({
				name: name,
				link: link + `#parsing${e}`
			})
		})
		return temp;
	}
	function parseFavorites(){
		var array = getArray()
		GM_setValue('parseArray', JSON.stringify(array));
		document.location.replace(array[0].link)
		setTimeout(function(){
			document.location.reload()
		}, 500)
	}
	function parseContent(){
		var temp = [];
		var list = document.getElementsByClassName("b-favorites_content__holder")[0].children
		Object.keys(list).forEach(function(e){
			let el = list[e]
			let url = el.getAttribute("data-url")
			let name = el.getElementsByClassName("b-content__inline_item-link")[0].children[0].innerHTML
			temp.push({
				name: name,
				url: url
			})
		})
		return temp
	}
	function download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}

})();
