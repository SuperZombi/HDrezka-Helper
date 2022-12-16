chrome.storage.sync.get({ export: true, export_animation: true }, results => {
  if (results.export){

		window.onload = function(){
			if(window.location.hash){
				let num = parseInt(window.location.hash.substring(1).replace("parsing", ""))
				let arr = JSON.parse(localStorage.getItem('parseArray'));

				let el = document.getElementsByClassName("b-content__htitle")[0];
				let span = document.createElement("span");
				let exportStr = chrome.i18n.getMessage("exportStr");
				span.innerHTML = `— ${exportStr} ${num+1}/${arr.length}`
				span.style.color = "cornflowerblue";
				el.appendChild(span)

				localStorage.setItem(`parsedArray${num}`, JSON.stringify(parseContent()));
				if (num+1 >= arr.length){
					var finalResult = {};
					localStorage.removeItem(`parseArray`);
					for (let i = 0; i < arr.length; i++) {
						let parsed = JSON.parse(localStorage.getItem(`parsedArray${i}`));
						finalResult[arr[i].name] = parsed
						localStorage.removeItem(`parsedArray${i}`);
					}
					var finalFile = {}
					finalFile["version"] = "1.0"
					finalFile["data"] = finalResult
					download('my_favorites.json', JSON.stringify(finalFile, null, 2));
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
					<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 55 55">
					  <path fill="cornflowerblue" d="M52.354 8.51C51.196 4.22 42.577 0 27.5 0S3.803 4.22 2.646 8.51A.98.98 0 0 0 2.5 9v37a.94.94 0 0 0 .117.451C3.798 51.346 14.364 55 27.5 55c13.106 0 23.655-3.639 24.875-8.516A.988.988 0 0 0 52.5 46V9a.98.98 0 0 0-.146-.49zm-1.933 25.475a2.46 2.46 0 0 1-.259.66 3.39 3.39 0 0 1-.45.646 5.42 5.42 0 0 1-.363.392c-.081.079-.17.157-.26.236a8.234 8.234 0 0 1-.526.426c-.082.061-.17.12-.257.18-.226.156-.462.311-.721.463-.068.041-.141.08-.212.12a16.52 16.52 0 0 1-.945.497c-.043.021-.088.041-.132.061-.375.177-.767.351-1.186.519l-.036.014c-2.271.907-5.176 1.67-8.561 2.17l-.051.007a55.03 55.03 0 0 1-2.026.259c-.113.012-.232.02-.346.032-.605.063-1.217.121-1.847.167-.288.021-.59.031-.883.049-.474.028-.943.059-1.429.076a69.019 69.019 0 0 1-4.863-.003c-.486-.017-.955-.049-1.429-.076-.293-.017-.595-.028-.883-.049a59.764 59.764 0 0 1-1.847-.167c-.114-.012-.233-.02-.346-.032a57.277 57.277 0 0 1-2.026-.259l-.051-.007c-3.385-.5-6.29-1.263-8.561-2.17a21.248 21.248 0 0 1-1.222-.533c-.043-.021-.089-.041-.132-.061a15.908 15.908 0 0 1-.945-.497c-.07-.04-.144-.079-.212-.12a11.544 11.544 0 0 1-.721-.463c-.086-.06-.175-.119-.257-.18a8.234 8.234 0 0 1-.526-.426c-.089-.078-.179-.156-.26-.236a5.22 5.22 0 0 1-.363-.392 3.729 3.729 0 0 1-.45-.646 2.423 2.423 0 0 1-.259-.66c-.037-.159-.078-.321-.078-.482 0-.113.013-.226.031-.338a.997.997 0 0 0-.031-.445v-7.424c.028.026.063.051.092.077.218.192.44.383.69.567C9.049 28.786 16.582 31 27.5 31c10.872 0 18.386-2.196 22.169-5.028.302-.22.574-.447.83-.678l.001-.001v7.424a.997.997 0 0 0-.031.445c.019.112.031.225.031.338 0 .161-.041.323-.079.485zm.079-20.692v7.424a.997.997 0 0 0-.031.445c.019.112.031.225.031.338 0 .161-.041.323-.079.485a2.46 2.46 0 0 1-.259.66 3.39 3.39 0 0 1-.45.646 5.42 5.42 0 0 1-.363.392c-.081.079-.17.157-.26.236a8.234 8.234 0 0 1-.526.426c-.082.061-.17.12-.257.18-.226.156-.462.311-.721.463-.068.041-.141.08-.212.12a16.52 16.52 0 0 1-.945.497c-.043.021-.088.041-.132.061-.375.177-.767.351-1.186.519l-.036.014c-2.271.907-5.176 1.67-8.561 2.17l-.051.007a55.03 55.03 0 0 1-2.026.259c-.113.012-.232.02-.346.032-.605.063-1.217.121-1.847.167-.288.021-.59.031-.883.049-.474.028-.943.059-1.429.076a69.019 69.019 0 0 1-4.863-.003c-.486-.017-.955-.049-1.429-.076-.293-.017-.595-.028-.883-.049a59.764 59.764 0 0 1-1.847-.167c-.114-.012-.233-.02-.346-.032a57.277 57.277 0 0 1-2.026-.259l-.051-.007c-3.385-.5-6.29-1.263-8.561-2.17a21.248 21.248 0 0 1-1.222-.533c-.043-.021-.089-.041-.132-.061a15.908 15.908 0 0 1-.945-.497c-.07-.04-.144-.079-.212-.12a11.544 11.544 0 0 1-.721-.463c-.086-.06-.175-.119-.257-.18a8.234 8.234 0 0 1-.526-.426c-.089-.078-.179-.156-.26-.236a5.22 5.22 0 0 1-.363-.392 3.729 3.729 0 0 1-.45-.646 2.423 2.423 0 0 1-.259-.66c-.037-.159-.078-.321-.078-.482 0-.113.013-.226.031-.338a.997.997 0 0 0-.031-.445v-7.424c.12.109.257.216.387.324.072.06.139.12.215.18.3.236.624.469.975.696.073.047.155.093.231.14a17.11 17.11 0 0 0 1.299.731c.365.186.748.367 1.151.542.066.029.126.059.193.087.469.199.967.389 1.485.573.143.051.293.099.44.149.412.139.838.272 1.279.401.159.046.315.094.478.138.585.162 1.189.316 1.823.458.087.02.181.036.269.055a45.634 45.634 0 0 0 2.348.445c.567.093 1.151.178 1.75.256.154.02.301.043.457.062.744.09 1.514.167 2.305.233.195.016.398.028.596.042.633.046 1.28.084 1.942.114.241.011.481.022.727.031.862.029 1.74.05 2.65.05s1.788-.021 2.65-.05c.245-.009.485-.02.727-.031.662-.03 1.309-.068 1.942-.114.198-.015.4-.026.596-.042a60.436 60.436 0 0 0 2.305-.233c.156-.019.303-.042.457-.062a53.94 53.94 0 0 0 2.363-.36 45.634 45.634 0 0 0 1.735-.341c.088-.019.182-.036.269-.055a38.777 38.777 0 0 0 1.823-.458c.163-.045.319-.092.478-.138a32.87 32.87 0 0 0 1.279-.401c.147-.05.297-.098.44-.149a26.392 26.392 0 0 0 1.485-.573c.067-.028.127-.058.193-.087a21.377 21.377 0 0 0 1.518-.735c.327-.175.638-.354.932-.538.076-.047.158-.093.231-.14.351-.227.675-.459.975-.696.075-.06.142-.12.215-.18.13-.108.267-.215.387-.324zM27.5 2c13.555 0 23 3.952 23 7.5s-9.445 7.5-23 7.5-23-3.952-23-7.5S13.945 2 27.5 2zm23 43.703a1.02 1.02 0 0 0-.032.135C49.901 49.297 40.536 53 27.5 53S5.099 49.297 4.532 45.838a1.09 1.09 0 0 0-.032-.131v-8.414c.028.026.063.051.092.077.218.192.44.383.69.567C9.049 40.786 16.582 43 27.5 43c10.872 0 18.386-2.196 22.169-5.028.302-.22.574-.447.83-.678l.001-.001v8.41z"/>
					</svg>
				`

				div.style.cursor = "pointer"
				div.style.verticalAlign = "bottom"
				div.style.borderRadius = "8px"
				div.style.transition = "0.3s"
				div.style.boxShadow = "0 0 4px grey"
				div.style.position = "relative"
				div.style.zIndex = 2
				div.onmouseover = function(){
					div.style.boxShadow = "0 0 8px grey"
				}
				div.onmouseout = function(){
					div.style.boxShadow = "0 0 4px grey"
				}

				let popup = document.createElement("div")
				popup.style.position = "absolute"
				popup.style.visibility = "hidden"
				popup.style.transition = "0.4s"
				popup.style.background = "white"
				popup.style.boxShadow = "0 0 4px lightgrey"
				if (document.body.classList.contains("b-theme__template__night")){
					popup.style.background = "#222d33"
					popup.style.boxShadow = "0 0 4px grey"
				}
				popup.style.left = 0
				popup.style.borderRadius = "10px"
				popup.style.marginTop = "5px"
				popup.style.padding = "10px 5px"
				popup.style.display = "flex"
				popup.style.flexDirection = "row"
				if (results.export_animation){
					popup.style.opacity = 0
					popup.style.transform = "scale(0)"
					popup.style.transformOrigin = "left top"
				}
				popup.style.cursor = "auto"
				div.onclick = _=>{
					if (popup.style.visibility != "visible"){
						if (results.export_animation){
							popup.style.transform = "scale(1)"
							popup.style.opacity = 1
						}
						popup.style.visibility = "visible"
						function hide_popup_menu(e){
							if (!e.path.includes(popup)){
								if (results.export_animation){
									popup.style.transform = "scale(0)"
									popup.style.opacity = 0
								}
								popup.style.visibility = "hidden"
								document.body.removeEventListener("click", hide_popup_menu)
							}
						}
						setTimeout(function(){
							document.body.addEventListener("click", hide_popup_menu)
						}, 50)
					}
				}
				div.appendChild(popup)

				function makeButton(){
					let but = document.createElement("div")
					but.style.cursor = "pointer"
					but.style.borderRadius = "8px"
					but.style.boxShadow = "0 0 4px grey"
					but.style.height = "35px"
					but.style.width = "35px"
					but.style.padding = "5px"
					but.style.margin = "0 5px"
					but.style.display = "inline-block"
					but.style.transition = "0.2s"
					but.onmouseover = function(){
						but.style.background = "rgb(150, 150, 150, 0.25)"
						but.style.transform = "translateY(-2px)"
						but.style.filter = "brightness(1.1)"
						but.style.borderRadius = "14px"
					}
					but.onmouseout = function(){
						but.style.background = ""
						but.style.filter = ""
						but.style.transform = ""
						but.style.borderRadius = "8px"
					}
					return but
				}
				let export_ = makeButton()
				export_.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 120.54" xml:space="preserve">
						<path fill="cornflowerblue" d="M95.7,65.5c15.01,0,27.18,12.17,27.18,27.18c0,15.01-12.17,27.18-27.18,27.18 c-15.01,0-27.18-12.17-27.18-27.18C68.52,77.67,80.69,65.5,95.7,65.5L95.7,65.5z M111.57,92.9h-9.98V77.16H90.33V92.9l-10.27,0 l15.75,15.32L111.57,92.9L111.57,92.9z M17.69,26.67c8.1,2.71,19.38,4.38,31.91,4.38c12.53,0,23.81-1.67,31.91-4.38 c7.11-2.37,11.51-5.25,11.51-8.06c0-2.81-4.4-5.69-11.51-8.06c-8.1-2.7-19.38-4.38-31.91-4.38c-12.53,0-23.81,1.67-31.91,4.38 C2.6,15.59,2.18,21.5,17.69,26.67L17.69,26.67z M6.24,47.86c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.71,19.38,4.38,31.91,4.38 s23.81-1.67,31.91-4.38c7.11-2.37,11.51-5.25,11.51-8.06h0.03v-19.3c-2.53,1.73-5.78,3.26-9.59,4.53 c-8.73,2.91-20.71,4.72-33.86,4.72c-13.16,0-25.13-1.8-33.86-4.72c-3.77-1.26-6.98-2.76-9.49-4.47V47.86L6.24,47.86z M63.3,92.54 c-4.35,0.44-8.95,0.67-13.7,0.67c-13.16,0-25.13-1.8-33.86-4.72c-3.77-1.26-6.98-2.76-9.49-4.47v18.49 c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.7,19.38,4.38,31.91,4.38c7.52,0,14.58-0.6,20.78-1.67c1.56,1.94,3.33,3.7,5.29,5.24 c-7.53,1.65-16.49,2.6-26.07,2.6c-13.16,0-25.13-1.8-33.86-4.72c-4.6-1.54-15.67-6.58-15.67-12.62c0-0.71,0-1.3,0-1.98 C0.06,73.69,0,46.15,0,18.61c0-5.76,6.01-10.65,15.73-13.9C24.46,1.8,36.44,0,49.6,0c13.16,0,25.13,1.8,33.86,4.72 c8.85,2.95,14.62,7.27,15.59,12.37c0.12,0.32,0.18,0.67,0.18,1.04v42.37c-1.2-0.14-2.42-0.21-3.66-0.21c-0.85,0-1.68,0.03-2.51,0.1 v-3.74c-2.53,1.73-5.78,3.26-9.59,4.53c-8.73,2.91-20.71,4.72-33.86,4.72c-13.16,0-25.13-1.8-33.86-4.72 c-3.77-1.26-6.98-2.76-9.49-4.47v18.49c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.7,19.38,4.38,31.91,4.38c5.01,0,9.82-0.27,14.31-0.76 C63.51,88.3,63.3,90.4,63.3,92.54L63.3,92.54z"/>
					</svg>
				`
				export_.title = chrome.i18n.getMessage("exportStr")
				export_.onclick = parse
				popup.appendChild(export_)

				let import_ = makeButton()
				import_.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 120.54" xml:space="preserve">
						<path fill="lime" d="M95.7,65.5c15.01,0,27.18,12.17,27.18,27.18c0,15.01-12.17,27.18-27.18,27.18 c-15.01,0-27.18-12.17-27.18-27.18C68.52,77.67,80.69,65.5,95.7,65.5L95.7,65.5z M80.04,92.03h10.03v15.82h11.31V92.03l10.32,0 L95.88,76.64L80.04,92.03L80.04,92.03z M17.69,26.67c8.1,2.71,19.38,4.38,31.91,4.38s23.81-1.67,31.91-4.38 c7.11-2.37,11.51-5.25,11.51-8.06c0-2.81-4.4-5.69-11.51-8.06c-8.1-2.7-19.38-4.38-31.91-4.38s-23.81,1.67-31.91,4.38 C2.6,15.59,2.18,21.5,17.69,26.67L17.69,26.67z M6.24,47.86c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.71,19.38,4.38,31.91,4.38 s23.81-1.67,31.91-4.38c7.11-2.37,11.51-5.25,11.51-8.06h0.03v-19.3c-2.53,1.73-5.78,3.26-9.59,4.53 c-8.73,2.91-20.71,4.72-33.86,4.72c-13.16,0-25.13-1.8-33.86-4.72c-3.77-1.26-6.98-2.76-9.49-4.47V47.86L6.24,47.86z M63.3,92.54 c-4.35,0.44-8.95,0.67-13.7,0.67c-13.16,0-25.13-1.8-33.86-4.72c-3.77-1.26-6.98-2.76-9.49-4.47v18.49 c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.7,19.38,4.38,31.91,4.38c7.52,0,14.58-0.6,20.78-1.67c1.56,1.94,3.33,3.7,5.29,5.24 c-7.53,1.65-16.49,2.6-26.07,2.6c-13.16,0-25.13-1.8-33.86-4.72c-4.6-1.54-15.67-6.58-15.67-12.62c0-0.71,0-1.3,0-1.98 C0.06,73.69,0,46.15,0,18.61c0-5.76,6.01-10.65,15.73-13.9C24.46,1.8,36.44,0,49.6,0c13.16,0,25.13,1.8,33.86,4.72 c8.85,2.95,14.62,7.27,15.59,12.37c0.12,0.32,0.18,0.67,0.18,1.04v42.37c-1.2-0.14-2.42-0.21-3.66-0.21c-0.85,0-1.68,0.03-2.51,0.1 v-3.74c-2.53,1.73-5.78,3.26-9.59,4.53c-8.73,2.91-20.71,4.72-33.86,4.72c-13.16,0-25.13-1.8-33.86-4.72 c-3.77-1.26-6.98-2.76-9.49-4.47v18.49c0.56,2.62,4.83,5.26,11.45,7.47c8.1,2.7,19.38,4.38,31.91,4.38c5.01,0,9.82-0.27,14.31-0.76 C63.51,88.3,63.3,90.4,63.3,92.54L63.3,92.54z"/>
					</svg>
				`
				import_.title = chrome.i18n.getMessage("importStr")
				import_.onclick = importing
				popup.appendChild(import_)


				if (results.export_animation){
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
		function parse(){
			var array = getArray()
			localStorage.setItem('parseArray', JSON.stringify(array));
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
				let id_ = el.getAttribute("data-id")
				let name = el.getElementsByClassName("b-content__inline_item-link")[0].children[0].innerHTML
				temp.push({
					name: name,
					url: url,
					id: id_
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

		function importMsg(msg, clear=false){
			let el = document.getElementsByClassName("b-content__htitle")[0];
			let span = el.querySelector("[name=importMsg]")
			if (span && clear){span.innerHTML = "";}
			if (clear){return}
			if (!span){
				span = document.createElement("span");
				span.setAttribute("name", "importMsg")
				span.style.color = "red";
				el.appendChild(span)
			}
			span.innerHTML = `— ${msg}`
		}
		function importing(){
			let input = document.createElement('input');
			input.type = 'file';
			input.onchange = e => { 
				let file = e.target.files[0];

				const reader = new FileReader();
				reader.addEventListener('load', (event) => {
					try{
						let file_data = JSON.parse(event.target.result)
						if (file_data.version && file_data.data){
							importMsg("", true)
							import_all(file_data.data)
						}
						else{
							importMsg("Invalid File")
						}
					}
					catch (ex){
						console.error(ex)
						importMsg("Invalid File")
					}
				});
				reader.readAsText(file);
			}
			input.click();
		}
		async function import_all(arr){
			async function postData(url, data) {
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
					body: new URLSearchParams(data)
				});
				return response.json();
			}

			let error_arr = [];
			await Promise.all(
					Object.entries(arr).map(async ([k, v]) => {
						let r = await postData(window.location.origin + "/ajax/favorites/", {
							"name": k,
							"action": "add_cat"
						})
						if (r.success == true){
							v.forEach(async e => {
								let r2 = await postData(window.location.origin + "/ajax/favorites/", {
									"post_id": e.id,
									"cat_id": r.id,
									"action": "add_post"
								})
								if (r2.success != true){
									error_arr.push({
										"action": "add_post",
										"name": e.name,
										...r2
									})
								}
							})
						}
						else{
							error_arr.push({
								"action": "add_catetory",
								"name": k,
								...r
							})
						}
				})
			);
			if (error_arr.length == 0){
				window.location.reload();
			} else{
				console.error(error_arr)
				alert(JSON.stringify(error_arr, null, 2))
			}
		}
  }
});
