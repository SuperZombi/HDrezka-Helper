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
					download('my_favorites.json', JSON.stringify(finalResult, null, 2));
					document.location.replace("https://hdrezka.cm/favorites/")
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
				div.title = chrome.i18n.getMessage("exportStr")
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
				div.onclick = parse

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

						el.style.marginBottom = "2px"	
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
});
