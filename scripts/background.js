var codes = new Map()
LoadCodes()

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if(message.type === "NEWCODE"){
            AddNewCode(message.content)
        } else if(message.type === "GETCODE"){
            sendResponse(Array.from(codes.keys()))
        }
    }
);

function LoadCodes() {
    chrome.storage.sync.get(['codes'], function(result) {
        console.log(result)
    });
}


function SetCodes(){
    chrome.storage.sync.set({
        codes: Array.from(codes.keys())
    }, function() {
        console.log("Codes Updated");
    });
}

function AddNewCode(arr){
    var a = Array.from(codes.keys())
    var d = arr.filter(function(x){
        return !a.includes(x);
    });
    if(d.length){
        d.forEach(function(elem){
            codes.set(elem, true)
        })
        SetCodes()
    }
}



console.log("Script: background.js Loaded")