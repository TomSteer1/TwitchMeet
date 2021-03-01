//#region Styling
const styleElement = document.createElement("style");
styleElement.innerHTML = `
    .emote-container {
        height: 40px;
        display: inline-block;
        top: 5px;
        position: relative;
    }
    .emote-container img {
        height: 100%;
        position: relative;
        z-index: 0;
    }
    .emote-container span {
        position: absolute;
        z-index: 1;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        top: 110%;
        left: -50%;
        border-radius: 3px;
        padding: 3px;
        transition-duration: 0.2s;
        opacity: 0;
        display: none;
    }
    .emote-container:hover span {
        opacity: 1;
        display: inline;
    }

    div#emoteMenu {
        -webkit-user-select: none;
        transition: background .3s;
        border: 0;
        border-radius: 50%;
        cursor: pointer;
        display: inline-block;
        flex-shrink: 0;
        height: 48px;
        outline: none;
        overflow: hidden;
        position: relative;
        text-align: center;
        -webkit-tap-highlight-color: transparent;
        width: 48px;
        z-index: 0;
        margin-bottom: 12px;
        margin-right: 12px;
    }

    div#emotes {
        position: absolute;
        height: 40px;
        bottom: 100%;
        left:0;
    }
    
    .emote img{
        height:24px;
    }

    `;
document.head.appendChild(styleElement);

//#endregion

//#region  twitchEmotes

let emoteIndex = new Map();

// Better TTV Top 100 Emotes

fetch("https://api.betterttv.net/3/emotes/shared/top?offset=0&limit=100").then(response => response.json()).then(data => {
    data.forEach(element => {
        let src = "https://cdn.betterttv.net/emote/" + element.emote.id + "/3x";
        let name = element.emote.code;
        emoteIndex.set(name,src)
    })
})

// Custom Emotes Api

function getCustomEmotes(){
    fetch("https://twitchmeet.tomsteer.me/emotes").then(response => response.json()).then(data => {
        console.log("Emotes collected");
        data.forEach(element => {
            let src = element.emote.src;
            let name = element.emote.code;
            emoteIndex.set(name,src)
        })
    })
}


getCustomEmotes();
//#endregion


let originalAppendChild = Element.prototype.appendChild;
Element.prototype.appendChild = function(element){
    if (element.classList) {
        if(element.classList.contains("oIy2qc") || element.classList.contains("ZNiiKc") || element.classList.contains("GDhqjd")){
            let targetElement = element;
            if (element.classList.contains("GDhqjd")) {
                targetElement = element.getElementsByClassName("oIy2qc")[0];
            }
            let text = targetElement.innerHTML.split(" ");
            for(x in text){
                if(emoteIndex.get(text[x])){
                    text[x] = `<span class="emote-container"><img src="${emoteIndex.get(text[x])}"/><span>${text[x]}</span></span>`;
                }
            }
            targetElement.innerHTML = text.join(" ");
        }
    }
    return originalAppendChild.call(this, element);
}

console.log("Twitch Meet has been loaded");
// Checks for new emotes every 5 minutes
let autoCheck = setInterval(getCustomEmotes,300000);
