var browser = chrome || browser;
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
  document.body.className = "dark"
  theme = "dark"
}
else{
  theme = "light"
}
const manifestData = browser.runtime.getManifest();
document.querySelector("#version").src = `https://shields.io/badge/${browser.i18n.getMessage("versionStr")}-${manifestData.version}-blue`

function obserse(element, arr){
  let els = document.getElementById("main-wraper").getElementsByTagName("label")
  var enabled = false;
  if (!blocking){
    setTimeout(function(){checkSub(element)}, 10)
  }
  for (let i = 0; i < els.length; i++){
    let inpt = els[i].getElementsByTagName("input")[0]
    if (inpt.checked != arr[inpt.id]){
      enabled = true;
      break;
    }
  }
  if(enabled){
    document.getElementById("save").classList.remove("disabled")
  }
  else{
    document.getElementById("save").classList.add("disabled")
  }
}

var blocking = false;
function checkSub(element){
  blocking = true;
  let childs = element.children
  let input = element.getElementsByTagName("input")[0]
  Object.keys(childs).forEach(function(el){
    if (childs[el].classList.contains("sub")){
      if (input.checked){
        childs[el].classList.remove("sub-disabled")
      }
      else{
        childs[el].classList.add("sub-disabled") 
      }
    }
  })

  setTimeout(function(){blocking = false;}, 100)
}

function initHidenBlocks(){
  document.querySelector("#inline_downloader").onchange = e=>{
    if (e.target.checked){
      document.querySelector("#filename_structure_block").style.display = "block"
      document.querySelector("#inline_downloader_options").style.display = "block"
      if (document.querySelector('input[type=radio][name="downloader_type"][value="fetch"]').checked){
        document.querySelector("#chunk-select-block").style.display = "block"
      }
    }
    else{
      document.querySelector("#filename_structure_block").style.display = "none"
      document.querySelector("#inline_downloader_options").style.display = "none"
      document.querySelector("#chunk-select-block").style.display = "none"
    }
  }
  if (document.querySelector("#inline_downloader").checked){
    document.querySelector("#filename_structure_block").style.display = "block"
    document.querySelector("#inline_downloader_options").style.display = "block"
    if (document.querySelector('input[type=radio][name="downloader_type"][value="fetch"]').checked){
      document.querySelector("#chunk-select-block").style.display = "block"
    }
  }
  document.querySelectorAll('input[type=radio][name="downloader_type"]').forEach(radio=>{
    radio.onchange = e=>{
      if (e.target.value == "fetch") {
        document.querySelector("#chunk-select-block").style.display = "block"
      } else {
        document.querySelector("#chunk-select-block").style.display = "none"
      }
    }
  })
  document.querySelector("select[name='chunk_size']").onchange = _=>{
    document.getElementById("save").classList.remove("disabled")
  }
}

function dinamic_input(init_value){
  var input = document.querySelector("#filename_structure")
  var fake_input = document.querySelector("#fake_input")
  var selectArray = {
    "title": browser.i18n.getMessage("movieTitle"),
    "origTitle": browser.i18n.getMessage("origTitle"),
    "s": browser.i18n.getMessage("season"),
    "ep": browser.i18n.getMessage("episode"),
    "tr": browser.i18n.getMessage("translation"),
    "res": browser.i18n.getMessage("resolution"),
    "year": browser.i18n.getMessage("releaseYear")
  }
  set_value(init_value)
  fake_input.onblur = _=>{
    if (input.querySelector(".cursor")){
      input.querySelector(".cursor").remove()
    }
  }
  fake_input.onkeydown = function(e){
    if (e.key.length == 1){
      if (e.key == "%"){
        let temp = document.createElement("span")
        temp.className = "select-area opened"
        Object.entries(selectArray).forEach(([key, value]) => {
          let a = document.createElement("a")
          a.textContent = key;
          a.title = value
          a.onmouseover = _=>{
            temp.querySelectorAll(".hover").forEach(el_=>{el_.className = ""})
            a.className = "hover"
          }
          a.onmouseout = _=>{
            a.className = ""
          }
          a.onclick = _=>{
            temp.classList.remove("opened")
            temp.textContent = key
            update_value()
            setTimeout(function(){
              setCursorHere(temp)
            }, 10)
          }
          temp.appendChild(a)
        })
        input.insertBefore(temp, input.querySelector(".cursor"));
      }
      else{
        let temp = document.createElement("span")
        temp.textContent = e.key;
        if (e.key == " "){
          temp.className = "space"
        }
        input.insertBefore(temp, input.querySelector(".cursor"));
      }
    }
    else{
      if (e.keyCode == 8){
        let temp = input.querySelector(".cursor").previousSibling
        if (temp){
          temp.remove()
        }
      }
      else if (e.keyCode == 46){
        let temp = input.querySelector(".cursor").nextSibling
        if (temp){
          temp.remove()
        }
      }
      else if (e.keyCode == 37){
        let temp = input.querySelector(".cursor").previousSibling
        if (temp){
          setCursorHere(temp, true)
        }
      }
      else if (e.keyCode == 39){
        let temp = input.querySelector(".cursor").nextSibling
        if (temp){
          setCursorHere(temp)
        }
      }
      else if (e.keyCode == 38){
        let temp = input.querySelector(".select-area.opened")
        if (temp){
          let temp2 = temp.querySelector(".hover")
          if (temp2){
            if (temp2.previousSibling){
              temp2.previousSibling.className = "hover"
            }
            else{
              temp.lastChild.className = "hover"
            }
            temp2.className = ""
          }
          else{
            temp.lastChild.className = "hover"
          }
        }
      }
      else if (e.keyCode == 40){
        let temp = input.querySelector(".select-area.opened")
        if (temp){
          let temp2 = temp.querySelector(".hover")
          if (temp2){
            if (temp2.nextSibling){
              temp2.nextSibling.className = "hover"
            }
            else{
              temp.firstChild.className = "hover"
            }
            temp2.className = ""
          }
          else{
            temp.firstChild.className = "hover"
          }
        }
      }
      else if (e.keyCode == 13){
        let temp = input.querySelector(".select-area.opened .hover")
        if (temp){
          temp.click();
        }
      }
    }
    update_value()
  }
  input.onclick = e=>{
    if (e.target != input && e.target.tagName == 'SPAN'){
      setCursorHere(e.target)
    }
    else{
      setCursorHere(input.lastChild)
    }
    fake_input.focus()
  }
  function update_value(init=false){
    let string = ""
    input.querySelectorAll(":scope > *").forEach(e=>{
      if (e.classList.contains("select-area")){
        if (!e.classList.contains("opened")){
          string += "%" + e.textContent.trim()
        }
      }
      else{
        string += e.textContent
      }
    })
    input.setAttribute("value", string)
    if (init){
      input.setAttribute("init-value", string)
    }
    else{
      if (input.getAttribute("init-value") && input.getAttribute("init-value") != input.getAttribute("value")){
        document.getElementById("save").classList.remove("disabled")
      }
    }
  }
  function set_value(text){
    for (let i = 0; i < text.length; i++){
      if (text[i] == "%"){
        let temp = text.slice(i)
        let root_arr = Object.keys(selectArray)
        for (let j = 0; j < root_arr.length; j++){
          if (temp.split(root_arr[j])[0] == "%"){
            let span = document.createElement("span")
            span.className = "select-area"
            span.textContent = root_arr[j]
            input.appendChild(span)
            i += root_arr[j].length
            break
          }
        }
      }
      else{
        if (text[i] == " "){
          let span = document.createElement("span")
          span.className = "space"
          span.textContent = " "
          input.appendChild(span)
        }
        else{
          let span = document.createElement("span")
          span.textContent = text[i]
          input.appendChild(span)
        }
      }
    }
    update_value(true)
  }
  function setCursorHere(el, before=false){
    if (input.querySelector(".cursor")){
      input.querySelector(".cursor").remove()
    }
    let span = document.createElement("span")
    span.className = "cursor"
    if (before){
      input.insertBefore(span, el);
    }
    else{
      if (el){
        el.after(span)
      }
      else{
        input.appendChild(span)
      }
    }
  }
}

browser.storage.sync.get({ download: true,
                          fast_filesize: true,
                          inline_downloader: false,
                          downloader_type: "fetch",
                          chunk_size: 5,
                          filename_structure: "",
                          subtitles: true,
                          export: true,
                          export_animation: true,
                          hideVK: true,
                          mobileMode: false
                        }, results => {
  let labels = document.getElementById("main-wraper").getElementsByTagName("label")
  Object.keys(labels).forEach(function(e){
    let input = labels[e].getElementsByTagName("input")[0]
    if (input.type == "checkbox"){
      input.checked = results[input.id]
      labels[e].onclick = function(){obserse(labels[e], results)}
      checkSub(labels[e])
    }
    else if (input.type == "radio"){
      if (input.value == results[input.name]){
        input.checked = true;
      }
    }
  })

  if (results['filename_structure'] != ""){
    dinamic_input(results['filename_structure'])
  }else{
    dinamic_input("%title s-%s ep-%ep [%tr]")
  }
  if (results['chunk_size']){
    document.querySelector("select[name='chunk_size']").value = results['chunk_size']
  }
  initHidenBlocks()

  document.getElementById("save").onclick = _ => {
    let labels = document.getElementById("main-wraper").getElementsByTagName("label")
    let settings = {};
    Object.keys(labels).forEach(function(e){
      let input = labels[e].getElementsByTagName("input")[0]
      if (input.type == "checkbox"){
        settings[input.id] = input.checked;
      }
      else if (input.type == "radio" && input.checked){
        settings[input.name] = input.value;
      }
    })
    settings['filename_structure'] = document.querySelector("#filename_structure").getAttribute("value")
    settings['chunk_size'] = document.querySelector("select[name='chunk_size']").value

    browser.storage.sync.set(settings, _ => {
      // Reload extension to make opt-out change immediate. 
      browser.runtime.reload();
      window.close();
    });
  };
});
