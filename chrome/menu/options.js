const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
  document.body.className = "dark"
  theme = "dark"
}
else{
  theme = "light"
}

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

chrome.storage.sync.get({ download: true,
                          subtitles: true,
                          export: true,
                          export_animation: true,
                          hideVK: true }, results => {
  let labels = document.getElementById("main-wraper").getElementsByTagName("label")
  Object.keys(labels).forEach(function(e){
    let input = labels[e].getElementsByTagName("input")[0]
    input.checked = results[input.id]
    labels[e].onclick = function(){obserse(labels[e], results)}
    checkSub(labels[e])
  })

  document.getElementById("save").onclick = _ => {
    let labels = document.getElementById("main-wraper").getElementsByTagName("label")
    let settings = {};
    Object.keys(labels).forEach(function(e){
      let input = labels[e].getElementsByTagName("input")[0]
      settings[input.id] = input.checked;
    })

    chrome.storage.sync.set(settings, _ => {
      // Reload extension to make opt-out change immediate. 
      chrome.runtime.reload();
      window.close();
    });
  };
});