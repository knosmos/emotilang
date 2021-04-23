let keys = {
    "🅰️":"🅰️🅱️©️↩️📧🎏⛽️♓️🕯️🗾🎋👢♏️♑️🅾️🅿️🧶®️💲✝️⛎♈️〰️❎💹⚡️✨❓❗🧿🧨",
    "🕓":"🕛🕐🕑🕒🕓🕔🕕🕖🕗🕘",
    "📜":"📜💯✉️🧮",
    "📦":"✏️📦🏺⚗️🧪🗃️🛍️🛒🧴🧺🛢️",
    "➕":"➕➖✖️➗🍇🎲",
    "⚖️":"⚖️🧲⛔🤝👐",
    "🖨️":"💬🖨️",
    "🏁":"🤔♾️🏁🛑✋"
}
tabDiv = document.getElementById("keyboard-tabs");
keyDiv = document.getElementById("keyboard-keys");
for (let category of Object.keys(keys)){
    tabDiv.innerHTML += `<button class="tab" id="${category}" onclick="displayKeys('${category}','${keys[category]}')">${category}</button>`;
}
function displayKeys(category,keyStr){
    for (let c of Object.keys(keys)){
        document.getElementById(c).classList.remove("selected-tab");        
    }
    keyDiv.innerHTML = "";
    for (let char of splitter.splitGraphemes(keyStr)){
        keyDiv.innerHTML += `<button class="key" onclick="keyClick('${char}')">${char}</button>`;
    }
    document.getElementById(category).classList.add("selected-tab");
}
displayKeys("🅰️",keys["🅰️"]);
/*
let lastCursorPosition = 0;
function cursorPosition() {
    var content = document.getElementById('code');
    if ((content.selectionStart!=null)&&(content.selectionStart!=undefined)){
        if (content.selectionStart != 0){
            lastCursorPosition = content.selectionStart;
        }

        return content.selectionStart;
    }
}
function keyClick(key){
    position = cursorPosition();
    let h = document.getElementById("code").value;
    if (position != 0){
        document.getElementById("code").value = h.slice(0,position)+key+h.slice(position);
    }
    else{
        document.getElementById("code").value = h.slice(0,lastCursorPosition)+key+h.slice(lastCursorPosition);
        lastCursorPosition ++;
        console.log(lastCursorPosition);
    }
}*/
function keyClick(key){
    document.getElementById("code").value += key;
}