let keys = {
    "๐ฐ๏ธ":"๐ฐ๏ธ๐ฑ๏ธยฉ๏ธโฉ๏ธ๐ง๐โฝ๏ธโ๏ธ๐ฏ๏ธ๐พ๐๐ขโ๏ธโ๏ธ๐พ๏ธ๐ฟ๏ธ๐งถยฎ๏ธ๐ฒโ๏ธโโ๏ธใฐ๏ธโ๐นโก๏ธโจโโ๐งฟ๐งจ",
    "๐":"๐๐๐๐๐๐๐๐๐๐",
    "๐":"๐๐ฏโ๏ธ๐งฎ",
    "๐ฆ":"โ๏ธ๐ฆ๐บโ๏ธ๐งช๐๏ธ๐๏ธ๐๐งด๐งบ๐ข๏ธ",
    "โ":"โโโ๏ธโ๐๐ฒ",
    "โ๏ธ":"โ๏ธ๐งฒโ๐ค๐",
    "๐จ๏ธ":"๐ฌ๐จ๏ธ",
    "๐":"๐คโพ๏ธ๐๐โ"
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
displayKeys("๐ฐ๏ธ",keys["๐ฐ๏ธ"]);
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