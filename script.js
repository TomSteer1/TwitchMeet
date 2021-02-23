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

//#region Disabled emoteMenu

// const emoteMenu = document.createElement("div")
// emoteMenu.id = "emoteMenu"
// emoteMenu.innerHTML = `
//         <svg width="24" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class=" DPvwYc e3AdI Hdh4hc cIGbvc NMm5M hhikbc"><g><path d="M7 11a1 1 0 100-2 1 1 0 000 2zM14 10a1 1 0 11-2 0 1 1 0 012 0zM10 14a2 2 0 002-2H8a2 2 0 002 2z"></path><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" clip-rule="evenodd"></path></g></svg>
//     `;
// document.querySelector("[class='BC4V9b']").appendChild(emoteMenu);


// const emotes = document.createElement("div");
// emotes.id = "emotes";
// emotes.innerHTML = ""
// emoteIndex.forEach(function(url,name) {
//     emotes.innerHTML += `<span class="emote" onclick="sendEmote();"><img src="${url}" aria-label="${name}"></span>`;
// })

// function sendEmote(){
//     console.log("Clicked");
// }


// document.querySelector("[class='BC4V9b']").appendChild(emotes);

// const eventContract = new jsaction.EventContract();

// // Events will be handled for all elements under this container.
// eventContract.addContainer(document.getElementById('emotes'));

// // Register the event types we care about.
// eventContract.addEvent('click');

// const dispatcher = new jsaction.Dispatcher();
// eventContract.dispatchTo(dispatcher.dispatch.bind(dispatcher));

// // Register individual handlers

// const click = function(flow) {
//   // do stuff
//   alert('click event dispatched!');
// };

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

console.log("Twitch Meet has been loaded");