var list = document.getElementById("list");
var count = document.getElementById("linkcount");

var codes = []

function DownloadAsText (){
    if(!codes.length){ return false }
    var text = "Your nuke code collection\n\n"
    for(var a = 0; a < codes.length; a++){
        text += (a + 1)
        text += ") "
        text += codes[a]
        text += "\t\tLink: https://nhentai.net/g/"
        text += codes[a]
        text += "/\n"
    }
    Download("nukes.txt", text)
}

function Refresh(){
    chrome.runtime.sendMessage({
        type: "GETCODE"
    }, function(response) {
        UpdateList(response);
    });
}

function UpdateList(arr){
    if(!arr.length){ return false }
    list.innerHTML = "";
    codes = arr
    count.innerHTML = arr.length;
    for(var a = 0; a < arr.length; a++){
        var li = document.createElement("li");
        li.innerHTML = '<a href="https://nhentai.net/g/' + arr[a] + '" target="_blank">' + arr[a] + '</a>';
        list.appendChild(li);
    }
}
Refresh();

function Download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute("target", "_blank");
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

document.getElementById("downloadbutton").addEventListener("click", DownloadAsText);
document.getElementById("refreshbutton").addEventListener("click", Refresh);

console.log("Script: main.js Loaded");