document.addEventListener("DOMContentLoaded", function(){
    const dino = document.querySelector(".dino");
    const grid = document.querySelector(".grid");
    let gravitacija = 0.89;
    let skace = false;

    function control(e){
        if(e.code === "Space" || e.code === "ArrowUp"){
            if (!skace){
                skok();
            }
        }
    }

    let pozicija = 0;
    function skok(){
        skace = true;
        let br = 0;
        let timerId=setInterval(function(){
            //pad
            if (br === 15){
                clearInterval(timerId);
                let downTimerId = setInterval(function(){
                    if (pozicija <= 3){
                        clearInterval(downTimerId);
                        skace = false ;
                        pozicija = 3;

                    }
                    pozicija -= 3;
                    br--;
                    pozicija = pozicija*gravitacija;
                    dino.style.bottom = pozicija + "px";
                },20)
            }
            //skok 
            pozicija += 30;
            br++;
            pozicija = pozicija*gravitacija;
            dino.style.bottom = pozicija + "px";

        },20)

    }
    document.addEventListener("keydown", control);
 }) 