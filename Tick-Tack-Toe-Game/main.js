const selectionbox = document.querySelector(".selection__box"),
selectionbutton1 = selectionbox.querySelector(".options .player1"),
selectionbutton2 = selectionbox.querySelector(".options .player2"),
mainboard = document.querySelector(".main__board"),
users = document.querySelector(".users"),
boxes = document.querySelectorAll("section span"),
resultinfo = document.querySelector(".result__info"),
winmessage = resultinfo.querySelector(".win__message"),
replay = resultinfo.querySelector("button");

window.onload = ()=>{ 
    for (let i = 0; i < boxes.length; i++) { 
        boxes[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectionbutton1.onclick = ()=>{
    selectionbox.classList.add("hidden");
    mainboard.classList.add("shown");
}

selectionbutton2.onclick = ()=>{ 
    selectionbox.classList.add("hidden"); 
    mainboard.classList.add("shown"); 
    users.setAttribute("class", "users active player");
}

let player1Icon = "fas fa-times"; 
let player2Icon = "far fa-circle"; 
let usersign = "X";
let runai = true;

function clickedBox(element){
    if(users.classList.contains("player")){
        usersign = "O";
        element.innerHTML = `<i class="${player2Icon}"></i>`;
        users.classList.add("active");
        element.setAttribute("id", usersign);
    }else{
        element.innerHTML = `<i class="${player1Icon}"></i>`;
        users.classList.add("active"); 
        element.setAttribute("id", usersign); 
    }
    selectWinner();
    element.style.pointerEvents = "none";
    mainboard.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        ai(runai);
    }, randomTimeDelay);
}

function ai(){
    let array = [];
    if(runai){
        usersign = "O"; 
        for (let i = 0; i < boxes.length; i++) {
            if(boxes[i].childElementCount == 0){ //
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; 
        if(array.length > 0){
            if(users.classList.contains("player")){ 
                usersign = "X";
                boxes[randomBox].innerHTML = `<i class="${player1Icon}"></i>`;
                users.classList.remove("active");
                boxes[randomBox].setAttribute("id", usersign); 
            }else{
                boxes[randomBox].innerHTML = `<i class="${player2Icon}"></i>`;
                users.classList.remove("active");
                boxes[randomBox].setAttribute("id", usersign);
            }
            selectWinner();
        }
        boxes[randomBox].style.pointerEvents = "none";
        mainboard.style.pointerEvents = "auto"; 
        usersign = "X";
    }
}

function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign){
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkIdSign(1,2,3,usersign) || checkIdSign(4,5,6, usersign) || checkIdSign(7,8,9, usersign) || checkIdSign(1,4,7, usersign) || checkIdSign(2,5,8, usersign) || checkIdSign(3,6,9, usersign) || checkIdSign(1,5,9, usersign) || checkIdSign(3,5,7, usersign)){
        runai = false;
        ai(runai);
        setTimeout(()=>{ 
            resultinfo.classList.add("shown");
            mainboard.classList.remove("shown");
        }, 1000);
        winmessage.innerHTML = `Player <p>${usersign}</p> Wins!`; 
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runai = false;
            ai(runai);
            setTimeout(()=>{ 
                resultinfo.classList.add("shown");
                mainboard.classList.remove("shown");
            }, 1000);
            winmessage.textContent = "Match has been Drawn!";
        }
    }
}

replay.onclick = ()=>{
    window.location.reload();
}