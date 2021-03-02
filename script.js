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

//#region Scratch Embeds
let scratchEmbedEnabled = false;

const scratchEmbeds = document.createElement("div");
scratchEmbeds.innerHTML = `
<div jsshadow="" role="button" class="uArJ5e UQuaGc kCyAyd QU4Gid favV4d M9Bg4d"aria-label="Scratch Embeds" aria-disabled="false" tabindex="0">
    <div class="Fvio9d MbhUzd" jsname="ksKsZd" style="top: 75px; left: 23px; width: 136px; height: 136px;"></div>
    <div class="e19J0b CeoRYc"></div>
        <span jsslot="" class="l4V7wb Fxmcue">
            <span class="NPEfkd RveJvd snByac"><div class="x4JyWe">
                <div class="OCZA0d">
                    <i class="google-material-icons" aria-hidden="true">border_outer</i>
                    </div>
                    <div class="sPXonc">Enable Scratch Embeds</div>
                </div>
            </span>
        </span>
    </div>

`;
scratchEmbeds.classList = ["scratchEmbed"];
scratchEmbeds.addEventListener("click", function(e){
    e.preventDefault();
    let states = ["Enable Scratch Embeds"," Disable Scratch Embeds"]
    if(scratchEmbedEnabled)
    {
        scratchEmbeds.getElementsByClassName("sPXonc")[0].innerHTML = states[0];
        scratchEmbedEnabled = false;
        document.getElementsByClassName("ZHdB2e")[0].style.width = "";
        document.getElementsByClassName("PBWx0c")[0].style.width = "";
    }else{
        scratchEmbeds.getElementsByClassName("sPXonc")[0].innerHTML = states[1];
        scratchEmbedEnabled = true;
        document.getElementsByClassName("ZHdB2e")[0].style.width = "initial";
        document.getElementsByClassName("PBWx0c")[0].style.width = "initial";
    }
});

document.getElementsByClassName("uD3s5c")[0].append(scratchEmbeds);

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
            if(text[0] != "!scr"){
                for(x in text){
                    if(emoteIndex.get(text[x])){
                        text[x] = `<span class="emote-container"><img src="${emoteIndex.get(text[x])}"/><span>${text[x]}</span></span>`;
                    }
                }
            }else if(scratchEmbedEnabled){
                text = [`<iframe src="https://scratch.mit.edu/projects/${text[1]}/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>`];
            }
            console.log(text);
            targetElement.innerHTML = text.join(" ");
        }
    }
    return originalAppendChild.call(this, element);
}

console.log("Twitch Meet has been loaded");
// Checks for new emotes every 5 minutes
let autoCheck = setInterval(getCustomEmotes,300000);
