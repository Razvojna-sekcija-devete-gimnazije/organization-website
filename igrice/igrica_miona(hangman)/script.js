const canvas1 = document.getElementById('canvas1');
const c = canvas1.getContext('2d');
canvas1.height = window.innerHeight/3;
canvas1.width = window.innerWidth;

c.strokeStyle = 'black';
c.lineWidth = 2;

c.beginPath();
c.moveTo(100, 20);
c.lineTo(100, 200);

c.moveTo(100, 20);
c.lineTo(200, 20);

c.moveTo(200, 20);
c.lineTo(200, 50);

c.moveTo(80, 200);
c.lineTo(120, 200);
c.stroke();

const rec = "žabac";
c.font = "40px Arial";
c.fillText("_ ".repeat(rec.length),200,200);
let greske = 0;
let pogodjeno = 0;
let gubi = false;
let pobedjuje = false;

c.font = "30px Arial";
let slovaD = ['a','b','v','g','d','đ','e','ž','z','i','j','k','l','lj','m','n','nj','o','p','r','s','t','ć','u','f','h','c','č','dž','š'];
for(let slovo of slovaD){
	let dugme = document.getElementById(slovo);
	dugme.addEventListener("click", function(event){
		if(gubi || pobedjuje) return;
		if (dugme.classList.contains("clicked")) return;

		dugme.classList.add("clicked");

		if(!rec.includes(slovo)){
			greske++;
			DeoTela(greske);
		}
		else{
			for (let j = 0; j < rec.length; j++) {
				if (rec[j] == slovo) {
					c.fillText(slovo.toUpperCase(),200+33.4*j,200);
					pogodjeno++;
				}	
			}
		}
		if(greske==6){
			c.fillStyle = 'red';
			c.font = "180px Arial";
			c.fillText("YOU LOSE!",300,150);
			gubi =true;
		}
		if(pogodjeno==rec.length){
			c.fillStyle = 'green';
			c.font = "180px Arial";
			c.fillText("POBEDA!",300,150);
			pobedjuje = true;
		}
	});
}

function DeoTela(i){
	switch(i){
		case 1:
			c.beginPath();
			c.arc(200, 70, 20, 0, Math.PI * 2);
			c.stroke();
			break;
		case 2:
			c.moveTo(200,90);
			c.lineTo(200,140);
			c.stroke();
			break;
		case 3:
			c.moveTo(200,140);
			c.lineTo(180,175);
			c.stroke();
			break;
		case 4:
			c.moveTo(200,140);
			c.lineTo(220,175);
			c.stroke();
			break;
		case 5:
			c.moveTo(200,100);
			c.lineTo(175,125);
			c.stroke();
			break;
		case 6:
			c.moveTo(200,100);
			c.lineTo(225,125);
			c.stroke();
			break;
	}
}