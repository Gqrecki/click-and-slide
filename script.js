let obj={
    obraz: 1,
    wielkosc: 0,
    tab: [],
    tabb: [],
    klikalne: [],
    pusty: 0,
}

document.getElementById("up").onclick = up
document.getElementById("down").onclick = down

var o = 0

function down(){
    if(obj.obraz == 2){
        document.getElementById("up").onclick = null
        document.getElementById("down").onclick = null
        for(o=3;o<7;o++){
            document.getElementById("bt"+o).onclick = null;
        }
        let i = 105;
        const time = setInterval(() => {
            i--;
            document.getElementById("slider").scrollTo(0,i)
            if (i <= 0) {
                clearInterval(time);
                obj.obraz = 1
                document.getElementById("up").onclick = up
                document.getElementById("down").onclick = down
                for(i=3;i<7;i++){
                    document.getElementById("bt"+i).onclick = start
                }
            }
        }, 5);

    }else if(obj.obraz == 3){
        document.getElementById("up").onclick = null
        document.getElementById("down").onclick = null
        for(o=3;o<7;o++){
            document.getElementById("bt"+o).onclick = null;
        }
        let i = 210;
        const time = setInterval(() => {
            i--;
            document.getElementById("slider").scrollTo(0,i)
            if (i <= 105) {
                clearInterval(time);
                obj.obraz = 2
                document.getElementById("up").onclick = up
                document.getElementById("down").onclick = down
                for(i=3;i<7;i++){
                    document.getElementById("bt"+i).onclick = start
                }
            }
        }, 5);
    }else if(obj.obraz == 1){
        document.getElementById("up").onclick = null
        document.getElementById("down").onclick = null
        for(o=3;o<7;o++){
            document.getElementById("bt"+o).onclick = null;
        }
        let i = 315;
        const time = setInterval(() => {
            i--;
            document.getElementById("slider").scrollTo(0,i)
            if (i <= 210) {
                clearInterval(time);
                obj.obraz = 3
                document.getElementById("up").onclick = up
                document.getElementById("down").onclick = down
                for(i=3;i<7;i++){
                    document.getElementById("bt"+i).onclick = start
                }
            }
        }, 5);
    }
} 

function up(){
    document.getElementById("up").onclick = null
    document.getElementById("down").onclick = null
    for(o=3;o<7;o++){
        document.getElementById("bt"+o).onclick = null;
    }
    let i = 0 + 105*(obj.obraz-1);
    const time = setInterval(() => {
        i++;
        document.getElementById("slider").scrollTo(0,i)
        if (i >= 105*obj.obraz) {
            clearInterval(time);
            if(obj.obraz == 1){
                obj.obraz = 2
            }else if(obj.obraz == 2){
                obj.obraz = 3
            }else if(obj.obraz == 3){
                obj.obraz = 1
            }
            document.getElementById("up").onclick = up
            document.getElementById("down").onclick = down
            for(i=3;i<7;i++){
                document.getElementById("bt"+i).onclick = start
            }
        }
    }, 5);
}

for(i=3;i<7;i++){
    document.getElementById("bt"+i).onclick = start;
}

let c = 0

function start(){

    if(document.getElementById("tab") != null){
        document.getElementById("tab").remove()
    }

    for(i=3;i<7;i++){
        if(this.id == "bt"+i){
            obj.wielkosc = i;
        }
    }
    document.getElementById("plansza").remove();
    let plansza = document.createElement("div");
    plansza.setAttribute("id","plansza");
    document.getElementById("gra").appendChild(plansza)
    
    let q = 600 / obj.wielkosc;
    let x = 0
    let y = 0
    for(i=0;i<(obj.wielkosc*obj.wielkosc-1);i++){
        let div = document.createElement("div");
        div.setAttribute("class","kafel");
        div.setAttribute("id", "k"+i);
        document.getElementById("plansza").appendChild(div)
        document.getElementById("k"+i).style.width = q + "px"
        document.getElementById("k"+i).style.height = q + "px"
        if(i%obj.wielkosc == 0){
            y++
        }
        x = i % obj.wielkosc
        for(o=1;o<4;o++){
            if(obj.obraz == o){
                document.getElementById("k"+i).style.backgroundImage =  "url("+o+".png"
            }
        }
        document.getElementById("k"+i).style.backgroundPositionX = -x*q + "px";
        document.getElementById("k"+i).style.backgroundPositionY = -y*q+q + "px";
        document.getElementById("k"+i).style.left =  x * q + "px";
        document.getElementById("k"+i).style.top = (y * q) - q + "px";
    }
    let div = document.createElement("div");
    let a = (obj.wielkosc*obj.wielkosc)-1
    div.setAttribute("class","kafelczarny");
    div.setAttribute("id", "k"+a);
    document.getElementById("plansza").appendChild(div)
    document.getElementById("k"+a).style.width = q + "px"
    document.getElementById("k"+a).style.height = q + "px"
    document.getElementById("k"+a).style.backgroundColor = "black"
    document.getElementById("k"+i).style.left =  (obj.wielkosc - 1) * q + "px";
    document.getElementById("k"+i).style.top = (obj.wielkosc - 1) * q + "px";

    obj.tab = []
    let k = 0
    for(i=0;i<obj.wielkosc;i++){
        obj.tab.push([])
        for(o=0;o<obj.wielkosc;o++){
            obj.tab[i].push("k"+k)
            k++
        }
    }
    k = 0

    obj.tabb = []
    for(i=0;i<obj.wielkosc;i++){
        obj.tabb.push([])
        for(o=0;o<obj.wielkosc;o++){
            obj.tabb[i].push("k"+k)
            k++
        }
    }
    k = 0

    rozkładanie()

}

czas = 0

function rozkładanie(){
    clearInterval(czas)
    document.getElementById("up").onclick = null
    document.getElementById("down").onclick = null
    for(i=3;i<7;i++){
        document.getElementById("bt"+i).onclick = null;
    }
    let b = obj.wielkosc * obj.wielkosc * obj.wielkosc
    const skr = setInterval(() => {
        b--;
        obj.klikalne = []
        obj.pusty = "k" + ((obj.wielkosc*obj.wielkosc)-1)
        for (i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == obj.pusty){
                    if(i+1 < obj.wielkosc){
                        obj.klikalne.push(obj.tabb[i+1][o])   
                    }
                    if(i - 1 >= 0){
                        obj.klikalne.push(obj.tabb[i-1][o])
                    }
                    if(o+1 < obj.wielkosc){
                        obj.klikalne.push(obj.tabb[i][o+1]) 
                    }
                    if(o-1 >= 0){
                        obj.klikalne.push(obj.tabb[i][o-1])
                    }
                }
            }
        }
        let random = Math.floor(Math.random()*(obj.klikalne.length))
        let to = obj.klikalne[random]
        to = document.getElementById(to)
        kaftop = to.style.top
    kaftop = kaftop.replace("px","")
    kafleft = to.style.left
    kafleft = kafleft.replace("px","")
    pustytop = document.getElementById(obj.pusty).style.top
    pustytop = pustytop.replace("px","")
    pustyleft = document.getElementById(obj.pusty).style.left
    pustyleft = pustyleft.replace("px","")
    let vectorY = pustytop - kaftop
    let vectorX = pustyleft - kafleft
    if(vectorX != 0){
        to.style.left = pustyleft + "px"
        document.getElementById(obj.pusty).style.left = kafleft + "px"
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == obj.pusty){
                    obj.tabb[i][o] = "xd"
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == to.id){
                    obj.tabb[i][o] = obj.pusty
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == "xd"){
                    obj.tabb[i][o] = to.id
                }
            }
        }  
    }
    if(vectorY != 0){
        to.style.top = pustytop + "px"
        document.getElementById(obj.pusty).style.top = kaftop + "px"
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == obj.pusty){
                    obj.tabb[i][o] = "xd"
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == to.id){
                    obj.tabb[i][o] = obj.pusty
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == "xd"){
                    obj.tabb[i][o] = to.id
                }
            }
        }  
    }
        if (b <= 0) {
            clearInterval(skr)
            for(i=3;i<7;i++){
                document.getElementById("bt"+i).onclick = start;
            }
            document.getElementById("up").onclick = up
            document.getElementById("down").onclick = down
            timer.czasStart = new Date().getTime()
            czas = setInterval(timer.czas, 1)
            sprawdzanie()
        }
    }, 30);

}

function sprawdzanie(){
    obj.klikalne = []
    obj.pusty = "k" + ((obj.wielkosc*obj.wielkosc)-1)
    for (i=0;i<obj.wielkosc;i++){
        for(o=0;o<obj.wielkosc;o++){
            if(obj.tabb[i][o] == obj.pusty){
                if(i+1 < obj.wielkosc){
                    obj.klikalne.push(obj.tabb[i+1][o])   
                }
                if(i - 1 >= 0){
                    obj.klikalne.push(obj.tabb[i-1][o])
                }
                if(o+1 < obj.wielkosc){
                    obj.klikalne.push(obj.tabb[i][o+1]) 
                }
                if(o-1 >= 0){
                    obj.klikalne.push(obj.tabb[i][o-1])
                }
            }
        }
    }
    przypisanie()
}

function przypisanie(){
    for(i=0;i<obj.klikalne.length;i++){
        document.getElementById(obj.klikalne[i]).onclick = przesuwanie
    }
}

function przesuwanie(){
    for(i=0;i<obj.klikalne.length;i++){
        document.getElementById(obj.klikalne[i]).onclick = null
    }
    kaftop = this.style.top
    kaftop = kaftop.replace("px","")
    kafleft = this.style.left
    kafleft = kafleft.replace("px","")
    pustytop = document.getElementById(obj.pusty).style.top
    pustytop = pustytop.replace("px","")
    pustyleft = document.getElementById(obj.pusty).style.left
    pustyleft = pustyleft.replace("px","")
    let vectorY = pustytop - kaftop
    let vectorX = pustyleft - kafleft
    i = 0
    if(vectorX != 0){
        let vector = vectorX/100
        const time = setInterval(() => {
            i++;
            let xd = i*vector
            this.style.left = parseInt(kafleft) + xd + "px"
            if (i >= 100) {
                clearInterval(time);
                let check = []
                for (u = 0; u < obj.wielkosc; u++) {
                    for (i = 0; i < obj.wielkosc; i++) {
                        if (obj.tab[u][i] == obj.tabb[u][i]) {
                            check.push("1")
                        } else {
                            check.push("0")
                        }
                    }
                }
                if(!check.includes("0")){
                    clearInterval(czas)
                    timer.czas
                    setTimeout(win, 100)
                }else{
                    sprawdzanie()
                }
            } 
        }, 1);
        document.getElementById(obj.pusty).style.left = kafleft + "px"
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == obj.pusty){
                    obj.tabb[i][o] = "xd"
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == this.id){
                    obj.tabb[i][o] = obj.pusty
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == "xd"){
                    obj.tabb[i][o] = this.id
                }
            }
        }
        
    }
    if(vectorY != 0){
        let vector = vectorY/100
        const time = setInterval(() => {
            i++;
            let xd = i*vector
            this.style.top = parseInt(kaftop) + xd + "px"
            if (i >= 100) {
                clearInterval(time);
                let check = []
                for (u = 0; u < obj.wielkosc; u++) {
                    for (i = 0; i < obj.wielkosc; i++) {
                        if (obj.tab[u][i] == obj.tabb[u][i]) {
                            check.push("1")
                        } else {
                            check.push("0")
                        }
                    }
                }
                if(!check.includes("0")){
                    clearInterval(czas)
                    timer.czas
                    setTimeout(win, 500)
                }else{
                    sprawdzanie()
                }
            } 
        }, 1);
        document.getElementById(obj.pusty).style.top = kaftop + "px"
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == obj.pusty){
                    obj.tabb[i][o] = "xd"
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == this.id){
                    obj.tabb[i][o] = obj.pusty
                }
            }
        }
        for(i=0;i<obj.wielkosc;i++){
            for(o=0;o<obj.wielkosc;o++){
                if(obj.tabb[i][o] == "xd"){
                    obj.tabb[i][o] = this.id
                }
            }
        }
        
    }
}

function win(){
    alert(timer.leci)
    let time = new Date()
    time.setTime(time.getTime()+1000*60*60*24*30)
    let name = obj.wielkosc
    let nick = encodeURIComponent(prompt("Podaj nick braholu"))
    document.cookie = name + "= " + timer.leci + " - " + nick + ";expires="+time.toUTCString();
    top10()
}

function top10(){
    let time = new Date()
    time.setTime(time.getTime()+1000*60*60*24*30)
    let ctab = []
    let ctabb = []
    if(obj.wielkosc == 3){
        ctabb.push(getCookie(3))
        for(i=0;i<10;i++){
            if(getCookie("3"+i) == 0){
                ctabb.push("xx:xx:xx.xxx - nick")
            }else{
                ctabb.push(getCookie("3"+i))
            }
        }
    }else if(obj.wielkosc == 4){
        ctabb.push(getCookie(4))
        for(i=0;i<10;i++){
            if(getCookie("4"+i) == 0){
                ctabb.push("xx:xx:xx.xxx - nick")
            }else{
                ctabb.push(getCookie("4"+i))
            }
        }
    }else if(obj.wielkosc == 5){
        ctabb.push(getCookie(5))
        for(i=0;i<10;i++){
            if(getCookie("5"+i) == 0){
                ctabb.push("xx:xx:xx.xxx - nick")
            }else{
                ctabb.push(getCookie("5"+i))
            }
        }
    }else if(obj.wielkosc == 6){
        ctabb.push(getCookie(6))
        for(i=0;i<10;i++){
            if(getCookie("6"+i) == 0){
                ctabb.push("xx:xx:xx.xxx - nick")
            }else{
                ctabb.push(getCookie("6"+i))
            }
        }
    }
    
    ctabb.sort()
    
    for(i=0;i<10;i++){
        ctab.push(ctabb[i])
    }

    for(i=0;i<10;i++){
        let xd = ctab[i]
        if(obj.wielkosc == 3){
            document.cookie = ("3" + i) + "= " + xd + ";expires="+time.toUTCString();
        }else if(obj.wielkosc == 4){
            document.cookie = ("4" + i) + "= " + xd + ";expires="+time.toUTCString();
        }else if(obj.wielkosc == 5){
            document.cookie = ("5" + i) + "= " + xd + ";expires="+time.toUTCString();
        }else if(obj.wielkosc == 6){
            document.cookie = ("6" + i) + "= " + xd + ";expires="+time.toUTCString();
        }
    } 

    let q = document.createElement("div")
    q.setAttribute("id","tab")
    document.body.appendChild(q)
    let w = document.createElement("table")
    w.setAttribute("id","tabb")
    document.getElementById("tab").appendChild(w)
    let t = document.createElement("tr")
    t.setAttribute("id","tr")
    document.getElementById("tabb").appendChild(t)
    let y = document.createElement("td")
    y.innerText= "TOP 10 - " + obj.wielkosc + "x" + obj.wielkosc
    document.getElementById("tr").appendChild(y)
    for(i=0; i<10; i++){
        let e = document.createElement("tr")
        e.setAttribute("id","tr"+i)
        document.getElementById("tabb").appendChild(e)
        let r = document.createElement("td")
        r.innerText=ctab[i]
        document.getElementById("tr"+i).appendChild(r)
    }
    let yy = document.body.clientHeight
    let xx = document.body.clientWidth
    let yyel = document.getElementById("tab").clientHeight
    let xxel = document.getElementById("tab").clientWidth
    document.getElementById("tab").style.top = (yy-yyel)/2 + yyel/2 + "px"
    document.getElementById("tab").style.left = (xx-xxel)/2 + xxel/10 + "px"
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

let timer = {
    czasStart: new Date().getTime(),
    leci: "",
    tab: document.getElementById("timer").children,

    czas : function(){
        let czasNow = new Date().getTime()
        let czas = new Date(czasNow - timer.czasStart)
        let milisekundy = czas.getMilliseconds()
        let sekundy = czas.getSeconds()
        let minuty = czas.getMinutes()
        let godziny = czas.getHours() - 1
        if(godziny<10 &&
            minuty<10 &&
            sekundy<10 &&
            milisekundy<10){
            timer.leci = godziny + ":" + 0 + minuty + ":" + 0 + sekundy + "." + 0 + 0 + milisekundy
        }else if(godziny<10 &&
            minuty<10 &&
            sekundy<10 &&
            milisekundy<100){
                timer.leci = godziny + ":" + 0 + minuty + ":" + 0 + sekundy + "." + 0 + milisekundy
        }else if(godziny<10 &&
            minuty<10 &&
            sekundy<10 &&
            milisekundy >=100){
                timer.leci = godziny + ":" + 0 + minuty + ":" + 0 + sekundy + "." + milisekundy
        }else if(godziny<10 &&
            minuty<10 &&
            sekundy >= 10 &&
            milisekundy<10){
            timer.leci = godziny + ":" + 0 + minuty + ":" + sekundy + "." + 0 + 0 + milisekundy
        }else if(godziny<10 &&
            minuty<10 &&
            sekundy >= 10 &&
            milisekundy<100){
                timer.leci = godziny + ":" + 0 + minuty + ":" + sekundy + "." + 0 + milisekundy
        }else if(godziny<10 &&
            minuty<10 &&
            sekundy >= 10 &&
            milisekundy >=100){
                timer.leci = godziny + ":" + 0 + minuty + ":" + sekundy + "." + milisekundy
        }else if(godziny<10 &&
            minuty >= 10 &&
            sekundy<10 &&
            milisekundy<10){
            timer.leci = godziny + ":" + minuty + ":" + 0 + sekundy + "." + 0 + 0 + milisekundy
        }else if(godziny<10 &&
            minuty >= 10 &&
            sekundy<10 &&
            milisekundy<100){
                timer.leci = godziny + ":"+ minuty + ":" + 0 + sekundy + "." + 0 + milisekundy
        }else if(godziny<10 &&
            minuty >= 10 &&
            sekundy<10 &&
            milisekundy >=100){
                timer.leci = godziny + ":" + minuty + ":" + 0 + sekundy + "." + milisekundy
        }else if(godziny<10 &&
            minuty >= 10 &&
            sekundy >= 10 &&
            milisekundy<10){
            timer.leci = godziny + ":" + minuty + ":" + sekundy + "." + 0 + 0 + milisekundy
        }else if(godziny<10 &&
            minuty >= 10 &&
            sekundy >= 10 &&
            milisekundy<100){
                timer.leci = godziny + ":" + minuty + ":" + sekundy + "." + 0 + milisekundy
        }else if(godziny<10 &&
            minuty >= 10 &&
            sekundy >= 10 &&
            milisekundy >=100){
                timer.leci = godziny + ":" + minuty + ":" + sekundy + "." + milisekundy
        }
        timer.leci = 0 + timer.leci
        timer.tab[2].style.backgroundImage = 'url(cyferki/dwakropka.png)'
        timer.tab[5].style.backgroundImage = 'url(cyferki/dwakropka.png)'
        timer.tab[8].style.backgroundImage = 'url(cyferki/kropka.png)'
        timer.tab[0].style.backgroundImage = 'url(cyferki/'+timer.leci[0]+'.png)'
        timer.tab[1].style.backgroundImage = 'url(cyferki/'+timer.leci[1]+'.png)'
        timer.tab[3].style.backgroundImage = 'url(cyferki/'+timer.leci[3]+'.png)'
        timer.tab[4].style.backgroundImage = 'url(cyferki/'+timer.leci[4]+'.png)'
        timer.tab[6].style.backgroundImage = 'url(cyferki/'+timer.leci[6]+'.png)'
        timer.tab[7].style.backgroundImage = 'url(cyferki/'+timer.leci[7]+'.png)'
        timer.tab[9].style.backgroundImage = 'url(cyferki/'+timer.leci[9]+'.png)'
        timer.tab[10].style.backgroundImage = 'url(cyferki/'+timer.leci[10]+'.png)'
        timer.tab[11].style.backgroundImage = 'url(cyferki/'+timer.leci[11]+'.png)'
    },
}
