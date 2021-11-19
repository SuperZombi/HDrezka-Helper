window.onload = function(){
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + main + ')();'));
	document.body.appendChild(script);
}

var main = function() {
	try{
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
	catch{}


	function main(){
		var arr = CDNPlayerInfo.streams.split(",")
		createButton()
		createDownloadMenu(arr)
	}

	function createButton() {
		if (!document.getElementById("downloadButton")){
			el = document.getElementById("send-video-issue")
			let div = document.createElement("div");
			div.id = "downloadButton"
			div.title = "Скачать"
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
			div.style.width = "155px"
			div.style.background = "#5D5D5D"
			div.style.position = "absolute"
			div.style.borderRadius = "5px"
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
		var Videos = []
		for (const e of array) {
			var temp = e.split("[")[1].split("]")
			var quality = temp[0]
			var link = temp[1].split(" or ")[1]
			var size = await getFileSize(link)
			size = formatBytes(size, 1)
			Videos.push({res: quality, link: link, size: size})
		}

		div_.innerHTML = ""

		for (const e of Videos) {
			let a = document.createElement("a")
			a.href = e.link
			a.target = '_blank'
			a.download = "video.mp4"
			a.title = "Нажмите на ссылку, удерживая клавишу Alt или Ctrl, чтобы сохранить файл."
			a.style.display = "block"
			a.style.color = "white"
			a.style.textDecoration = "none"
			a.style.padding = "0 5px"
			a.style.margin = "2px 0"
			a.style.borderRadius = "4px"

			a.onmouseover = function(){
				a.style.background = "blue"
			}
			a.onmouseout = function(){
				a.style.background = null
			}

			let span = document.createElement("span")
			span.innerHTML = e.res
			let span2 = document.createElement("span")
			span2.style.float = "right"
			span2.innerHTML = e.size

			a.appendChild(span)
			a.appendChild(span2)

			div_.appendChild(a)
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
	function hide_download_menu(e){
		let div = document.getElementById("downloadMenu")
		if (e.target.closest("div") != div){
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


	async function getFileSize(url)
	{
		return await new Promise((resolve, reject) => {
			var http = new XMLHttpRequest();
		    http.open('HEAD', url, true); // true = Asynchronous
		    http.onreadystatechange = function() {
		        if (this.readyState == this.DONE) {
		            if (this.status === 200) {
		                fileSize = this.getResponseHeader('content-length');
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
};
