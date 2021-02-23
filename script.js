
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
    `;
document.head.appendChild(styleElement);

//#region  twitchEmotes

let emoteIndex = new Map([
    // ["emote name", "emote image url"]

    // Twitch Emotes
    ["KappaPride", "https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0"],
    ["Kappa", "https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0"],
    ["4Head", "https://static-cdn.jtvnw.net/emoticons/v1/354/1.0"],
    ["BOP", "https://static-cdn.jtvnw.net/emoticons/v1/301428702/1.0"],
    ["BabyRage", "https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0"],
    ["BibleThump", "https://static-cdn.jtvnw.net/emoticons/v1/86/1.0"],
    ["DarkMode", "https://static-cdn.jtvnw.net/emoticons/v1/461298/1.0"],
    ["HeyGuys", "https://static-cdn.jtvnw.net/emoticons/v1/30259/1.0"],
    ["Keepo", "https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0"],
    ["KonCha", "https://static-cdn.jtvnw.net/emoticons/v1/160400/1.0"],
    ["LUL", "https://static-cdn.jtvnw.net/emoticons/v1/425618/1.0"],
    ["NotLikeThis", "https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0"],
    ["ResidentSleeper", "https://static-cdn.jtvnw.net/emoticons/v1/245/1.0"],
    ["SMOrc", "https://static-cdn.jtvnw.net/emoticons/v1/52/1.0"],
    ["SSSsss", "https://static-cdn.jtvnw.net/emoticons/v1/46/1.0"],

    // BTTV emotes
    ["monkaS", "https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/3x"],
    ["POGGERS", "https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/3x"],
    ["PepeHands", "https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/3x"],
    ["Pepega", "https://cdn.betterttv.net/emote/5aca62163e290877a25481ad/3x"],
    ["KEKW", "https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/3x"],
    ["5Head", "https://cdn.betterttv.net/emote/5d6096974932b21d9c332904/3x"],
    ["AYAYA", "https://cdn.betterttv.net/emote/58493695987aab42df852e0f/3x"],
    ["Sadge", "https://cdn.betterttv.net/emote/5e0fa9d40550d42106b8a489/3x"],
    ["peepoHappy", "https://cdn.betterttv.net/emote/5a16ee718c22a247ead62d4a/3x"],
    ["weSmart", "https://cdn.betterttv.net/emote/589771dc10c0975495c578d1/3x"],
    ["POGSLIDE", "https://cdn.betterttv.net/emote/5aea37908f767c42ce1e0293/3x"],

    // FFZ Emotes
    ["Pog", "https://cdn.frankerfacez.com/emoticon/210748/2"],
    ["pog", "https://cdn.frankerfacez.com/emoticon/210748/2"],
    ["REEeee", "https://cdn.frankerfacez.com/emoticon/116831/1"],
    ["Thonk", "https://cdn.frankerfacez.com/emoticon/191246/2"],
    ["Stonks", "https://cdn.frankerfacez.com/emoticon/428011/2"],

]);

fetch("https://api.betterttv.net/3/emotes/shared/top?offset=0&limit=100").then(response => response.json()).then(data => {
    data.forEach(element => {
        let src = "https://cdn.betterttv.net/emote/" + element.emote.id + "/3x";
        let name = element.emote.code;
        emoteIndex.set(name,src)
    })
})



//#endregion

let originalAppendChild = Element.prototype.appendChild;
Element.prototype.appendChild = function(element){
    if (element.classList) {
        if(element.classList.contains("oIy2qc") || element.classList.contains("ZNiiKc") || element.classList.contains("GDhqjd")){
            let targetElement = element;
            if (element.classList.contains("GDhqjd")) {
                targetElement = element.getElementsByClassName("oIy2qc")[0];
            }
            emoteIndex.forEach(function(url, name) {
                targetElement.innerHTML =
                    targetElement.innerHTML.replaceAll(name,
                    `<span class="emote-container"><img src="${url}"/><span>${name}</span></span>`);
            });
        }
    }
    return originalAppendChild.call(this, element);
}

