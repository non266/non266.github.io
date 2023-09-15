var box = document.getElementById("cplayerland")
var btn = document.getElementById("hide-cplayer-button")
var boxstate = true;
if(document.body.clientWidth < 600){
    box.style['right'] = -300 + "px";
    boxstate = false;
}
btn.onclick = function() {
    if (boxstate == true) {
        box.style['right'] = -300 + "px";
        boxstate = false;
    } else {
        box.style['right'] = 0 + "px";
        boxstate = true;
    }
}
