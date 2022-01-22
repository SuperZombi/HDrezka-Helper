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

chrome.storage.sync.get({ export: true, hideVK: true }, results => {
  var els = document.getElementsByTagName("input")
  Object.keys(els).forEach(function(e){
    els[e].checked = results[els[e].id];
    els[e].onclick = function(){obserse(els[e], results)}
  })

  document.getElementById("save").onclick = _ => {
    chrome.storage.sync.set({
      export: document.getElementById("export").checked,
      hideVK: document.getElementById("hideVK").checked,
    }, _ => {
      // Reload extension to make opt-out change immediate. 
      chrome.runtime.reload();
      window.close();
    });
  };
});