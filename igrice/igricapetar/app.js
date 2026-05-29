document.addEventListener("DOMContentLoaded", function(){
    const dino = document.querySelector(".dino");
    const grid = document.querySelector(".grid");
    const krajTekst = document.getElementById("kraj");
    const skorTekst = document.getElementById("skor");
    const igrajPonovo = document.getElementById("igrajPonovo");
    let gravitacija = 0.89;
    let skace = false;
    let kraj = false;
    let pozicija = 0;
    let skor = 0;

    function updateSkor(){
        skorTekst.innerHTML = "Skor: " + skor;
    }

    function control(e){
        if (kraj) return;
        if(e.code === "Space" || e.code === "ArrowUp"){
            if (!skace){
                skok();
            }
        }
    }
    function skok(){
        skace = true;
        let br = 0;
        let timerId = setInterval(function(){
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
    function napraviKaktus(){
        let randomvreme = Math.random() * 1500+1000;
        let kaktusPozicija = 1900;
        const kaktus = document.createElement("div");
        kaktus.classList.add("kaktus");
        kaktus.style.left = kaktusPozicija + "px";
        grid.appendChild(kaktus);

        let timerId = setInterval(function(){
            if (kaktusPozicija > 0 && kaktusPozicija < 90 && pozicija < 90){
                clearInterval(timerId);
                krajTekst.innerHTML = "Kraj igre!";
                igrajPonovo.removeAttribute('hidden');
                kraj = true;

                document.querySelectorAll('.kaktus').forEach(function(kaktus){
                    kaktus.remove();
                });
                return;
            }

            kaktusPozicija -= 5;
            kaktus.style.left = kaktusPozicija + "px";

            if (kaktusPozicija < -50){
                clearInterval(timerId);
                kaktus.remove();
                if (!kraj){
                    skor += 1;
                    updateSkor();
                }
                return;
            }
        },10)
        if (!kraj) setTimeout(napraviKaktus, randomvreme);
    }

    function resetGame(){
        kraj = false;
        skace = false;
        pozicija = 3;
        skor = 0;
        updateSkor();
        dino.style.bottom = pozicija + "px";
        krajTekst.innerHTML = "";
        igrajPonovo.setAttribute('hidden', '');

        document.querySelectorAll('.kaktus').forEach(function(kaktus){
            kaktus.remove();
        });

        napraviKaktus();
    }
    igrajPonovo.addEventListener('click', resetGame);
    updateSkor();
    napraviKaktus();
    document.addEventListener("keydown", control);
 }) 