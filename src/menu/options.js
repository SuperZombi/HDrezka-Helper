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

function dinamic_input(init_value){
  var input = document.querySelector("#filename_structure")
  var selectArray = ["title", "s", "ep", "transl", "res"]
  set_value(init_value)
  document.querySelector("#downloader_2").onchange = e=>{
    if (e.target.checked){
      document.querySelector("#filename_structure_block").style.display = "block"
    }
    else{
      document.querySelector("#filename_structure_block").style.display = "none"
    }
  }
  if (document.querySelector("#downloader_2").checked){
    document.querySelector("#filename_structure_block").style.display = "block"
  }
  input.onblur = _=>{
    if (input.querySelector(".cursor")){
      input.querySelector(".cursor").remove()
    }
  }
  input.onkeydown = function(e){
    if (e.key.length == 1){
      if (e.key == "%"){
        let temp = document.createElement("span")
        temp.className = "select-area opened"
        
        selectArray.forEach(el=>{
          let a = document.createElement("a")
          a.innerHTML = el;
          a.onmouseover = _=>{
            temp.querySelectorAll(".hover").forEach(el_=>{el_.className = ""})
            a.className = "hover"
          }
          a.onmouseout = _=>{
            a.className = ""
          }
          a.onclick = _=>{
            temp.classList.remove("opened")
            temp.innerHTML = el
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
        temp.innerHTML = e.key;
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
  }
  function update_value(init=false){
    let string = ""
    input.querySelectorAll(":scope > *").forEach(e=>{
      if (e.classList.contains("select-area")){
        if (!e.classList.contains("opened")){
          string += "%" + e.innerHTML
        }
      }
      else{
        string += e.innerHTML
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
        for (let j = 0; j < selectArray.length; j++){
          if (temp.split(selectArray[j])[0] == "%"){
            input.innerHTML += `<span class="select-area">${selectArray[j]}</span>`
            i += selectArray[j].length
            break
          }
        }
      }
      else{
        if (text[i] == " "){
          input.innerHTML += '<span class="space"> </span>'
        }
        else{
          input.innerHTML += `<span>${text[i]}</span>`
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
                          downloader_2: false,
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
    input.checked = results[input.id]
    labels[e].onclick = function(){obserse(labels[e], results)}
    checkSub(labels[e])
  })

  if (results['filename_structure'] != ""){
    dinamic_input(results['filename_structure'])
  }else{
    dinamic_input("%title s-%s ep-%ep [%transl]")
  }

  document.getElementById("save").onclick = _ => {
    let labels = document.getElementById("main-wraper").getElementsByTagName("label")
    let settings = {};
    Object.keys(labels).forEach(function(e){
      let input = labels[e].getElementsByTagName("input")[0]
      settings[input.id] = input.checked;
    })
    settings['filename_structure'] = document.querySelector("#filename_structure").getAttribute("value")

    browser.storage.sync.set(settings, _ => {
      // Reload extension to make opt-out change immediate. 
      browser.runtime.reload();
      window.close();
    });
  };
});