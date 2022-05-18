var list = new Map()

setInterval(() => {
    // bubble-content
    var messages = document.getElementsByClassName("message")

    console.log(messages.length)
    if(messages.length > 0){
        var changed = 0;
        for(var a = 0; a < messages.length; a ++){
            var text = messages[a].innerHTML.split("<span")[0]
            text = text.replace(/<\/?[^>]+(>|$)/g, "")
            text = text.replace(/[^a-zA-Z0-9 ]/g, " ")
            text = " " + text + " " // The worst possible way of doing it cuz I can't do regex that good
            
            var codes = text.match(/\s[0-9]{6}\s/g)
            if(!codes){
                codes = []
            }
            for(var b = 0; b < codes.length; b ++){
                if(!list.get(codes[b].trim())){
                    changed = changed + 1
                    list.set(codes[b].trim(), true)
                }
            }
        }
        if(changed > 0){
            chrome.runtime.sendMessage({
                type: "NEWCODE",
                content: Array.from(list.keys())
            });
        }
    }
}, 3000);


console.log("Script: content.js Loaded")