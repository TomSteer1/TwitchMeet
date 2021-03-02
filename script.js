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

    .embedHidden{
        display: none;
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
scratchEmbeds.addEventListener("click", function(e){
    e.preventDefault();
    let states = ["Enable Scratch Embeds"," Disable Scratch Embeds"];
    let embeds = document.getElementsByClassName("scratchEmbed");
    if(scratchEmbedEnabled)
    {
        scratchEmbeds.getElementsByClassName("sPXonc")[0].innerHTML = states[0];
        scratchEmbedEnabled = false;
        if(!youtubeEmbedEnabled){
            document.getElementsByClassName("ZHdB2e")[0].style.width = "";
            document.getElementsByClassName("PBWx0c")[0].style.width = "";
        }
        for(let i = 0; i < embeds.length ; i++){
            embeds[i].classList.add("embedHidden")
        }
    }else{
        scratchEmbeds.getElementsByClassName("sPXonc")[0].innerHTML = states[1];
        scratchEmbedEnabled = true;
        document.getElementsByClassName("ZHdB2e")[0].style.width = "initial";
        document.getElementsByClassName("PBWx0c")[0].style.width = "initial";
        for(let i = 0; i < embeds.length ; i++){
            embeds[i].classList.remove("embedHidden");
        }
    }
    let messages = document.getElementsByClassName("oIy2qc");
    messages[messages.length -1].scrollIntoView();
});

document.getElementsByClassName("uD3s5c")[0].append(scratchEmbeds);

//#endregion

//#region youtubeEmbeds

let youtubeEmbedEnabled = false;

const youtubeEmbeds = document.createElement("div");
youtubeEmbeds.innerHTML = `
<div jsshadow="" role="button" class="uArJ5e UQuaGc kCyAyd QU4Gid favV4d M9Bg4d"aria-label="Scratch Embeds" aria-disabled="false" tabindex="0">
    <div class="Fvio9d MbhUzd" jsname="ksKsZd" style="top: 75px; left: 23px; width: 136px; height: 136px;"></div>
    <div class="e19J0b CeoRYc"></div>
        <span jsslot="" class="l4V7wb Fxmcue">
            <span class="NPEfkd RveJvd snByac"><div class="x4JyWe">
                <div class="OCZA0d">
                    <i class="google-material-icons" aria-hidden="true">border_outer</i>
                    </div>
                    <div class="sPXonc">Enable Youtube Embeds</div>
                </div>
            </span>
        </span>
    </div>

`;
youtubeEmbeds.addEventListener("click", function(e){
    e.preventDefault();
    let states = ["Enable Youtube Embeds"," Disable Youtube Embeds"]
    let embeds = document.getElementsByClassName("youtubeEmbed");
    if(youtubeEmbedEnabled)
    {
        youtubeEmbeds.getElementsByClassName("sPXonc")[0].innerHTML = states[0];
        youtubeEmbedEnabled = false;
        if(!scratchEmbedEnabled){
            document.getElementsByClassName("ZHdB2e")[0].style.width = "";
            document.getElementsByClassName("PBWx0c")[0].style.width = "";
        }
        for(let i = 0; i < embeds.length ; i++){
            embeds[i].classList.add("embedHidden")
        }
    }else{
        youtubeEmbeds.getElementsByClassName("sPXonc")[0].innerHTML = states[1];
        youtubeEmbedEnabled = true;
        document.getElementsByClassName("ZHdB2e")[0].style.width = "initial";
        document.getElementsByClassName("PBWx0c")[0].style.width = "initial";
        for(let i = 0; i < embeds.length ; i++){
            embeds[i].classList.remove("embedHidden");
        }
    }
    let messages = document.getElementsByClassName("oIy2qc");
    messages[messages.length -1].scrollIntoView();
});

document.getElementsByClassName("uD3s5c")[0].append(youtubeEmbeds);

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
                    }else if(text[x].includes("https://www.youtube.com/"))
                    {    
                        let iframeClass = "youtubeEmbed"
                        if(!youtubeEmbedEnabled)
                        {
                            iframeClass = "youtubeEmbed embedHidden"
                        }
                        let videoLink = text[x].split('"')[1];
                        let videoCode = videoLink.split("?")[1];
                        videoCode = videoCode.slice(2);
                        text.push("<br>");
                        text.push(`<iframe class='${iframeClass}' width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoCode}?controls=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`);
                    }else if(text[x].includes("https://scratch.mit.edu/"))
                    {   
                        let iframeClass = "scratchEmbed"
                        if(!scratchEmbedEnabled)
                        {
                            iframeClass = "scratchEmbed embedHidden"
                        }
                        let link = text[x].split('"')[1];
                        let components = link.split("/");
                        projectCode = components[4];
                        text.push("<br>");
                        text.push(`<iframe class='${iframeClass}' src="https://scratch.mit.edu/projects/${projectCode}/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>`);
                        
                    }
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
