const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
  document.body.className = "dark"
  theme = "dark"
}
else{
  theme = "light"
}

function obserse(element, arr){
  var els = document.getElementsByTagName("input")
  var enabled = false;
  for (let i = 0; i < els.length; i++){
    checkSub(els[i])
    if (els[i].checked != arr[els[i].id]){
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

function checkSub(element){
  let els_ = element.parentNode.getElementsByClassName("sub")
  if (element.checked){
    Object.keys(els_).forEach(function(e){
      els_[e].classList.remove("sub-disabled")
    })
  }
  else{
    Object.keys(els_).forEach(function(e){
      els_[e].classList.add("sub-disabled")
    })    
  }
}

chrome.storage.sync.get({ export: true, export_animation: true, hideVK: true }, results => {
  var els = document.getElementsByTagName("input")
  Object.keys(els).forEach(function(e){
    els[e].checked = results[els[e].id];
    els[e].onclick = function(){obserse(els[e], results)}
    checkSub(els[e])
  })

  document.getElementById("save").onclick = _ => {
    chrome.storage.sync.set({
      export: document.getElementById("export").checked,
      export_animation: document.getElementById("export_animation").checked,
      hideVK: document.getElementById("hideVK").checked,
    }, _ => {
      // Reload extension to make opt-out change immediate. 
      chrome.runtime.reload();
      window.close();
    });
  };
});
