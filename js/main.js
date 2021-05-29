function stringToFloat() {
    let sayilar = document.getElementById("text1").value;

    let listeStr = sayilar.split(",");
    let liste = [];
    for (let i = 0; i < listeStr.length; i++) {
        if (listeStr[i] != "") {
            liste.push(parseFloat(listeStr[i]));
        }
    }
    localStorage.setItem("liste", JSON.stringify(liste));
    return liste
}
function Artortalama() {
    let liste = stringToFloat();
    let dizi = [];
    for (let i = 0; i < liste.length; i++)
        dizi.push(parseFloat(liste[i]));
    let total = 0;
    let uzunluk = dizi.length;
    for (let j = 0; j < dizi.length; j++)
        total += dizi[j];
    return total / uzunluk
}
function medyan() {
    let liste = stringToFloat();
    let dizi = [];
    for (let i = 0; i < liste.length; i++) {
        dizi.push(parseFloat(liste[i]));
    }
    let median = 0;
    dizi.sort(function (a, b) { return a - b });
    let uzunluk = dizi.length;
    if (uzunluk % 2 == 1)
        median = dizi[parseInt((uzunluk + 1) / 2) - 1]
    else
        median = (dizi[parseInt((uzunluk) / 2) - 1] + dizi[parseInt((uzunluk + 2) / 2) - 1]) / 2;
    return median
}
function mod() {
    let liste = stringToFloat();
    let liste2 = [];
    for (let i = 0; i < liste.length; i++) {
        if (!liste2.includes(liste[i])) {
            liste2.push(liste[i]);
        }
    }
    let adetList = [];
    for (let j = 0; j < liste2.length; j++) {
        let adet = 0;
        for (let k = 0; k < liste.length; k++) {
            if (liste[k] == liste2[j]) {
                adet++;
            }
        }
        adetList.push([liste2[j], adet]);
    }
    let frekans = -1;
    for (let i = 0; i < adetList.length; i++) {
        if (adetList[i][1] > frekans)
            frekans = adetList[i][1]
    }
    let sonuc = [];
    for (let i = 0; i < adetList.length; i++) {
        if (adetList[i][1] == frekans)
            sonuc.push(adetList[i][0])
    }
    return [sonuc, frekans, adetList];
}


function harmonicOrt() {
    let liste = stringToFloat();
    let sum = 0;
    for (let i = 0; i < liste.length; i++)
        sum = sum + (1 / liste[i]);

    return liste.length / sum;

}


function stantardDaviation() {
    let liste = stringToFloat();
    let ort = Artortalama();
    let result = 0;
    for (let i = 0; i < liste.length; i++) {
        result += (liste[i] - ort) ** 2
    }
    result = (result / (liste.length)) ** 0.5;
    return result;
}

function varyans() {
    let liste = stringToFloat();
    let ort = Artortalama();
    let result = 0;
    for (let i = 0; i < liste.length; i++) {
        result += (liste[i] - ort) ** 2
    }
    result = (result / (liste.length)) ** 0.5;
    return result ** 2;
}

function ortalamaSapma() {
    let liste = stringToFloat();

    let aritmetikOrt = Artortalama(liste);
    var parametreSayi = parseFloat(liste.length);
    var toplam = 0;
    liste.forEach(function (item, i) {
        toplam += Math.abs(parseFloat(item) - parseFloat(aritmetikOrt));
    });

    return toplam / parametreSayi;

}

function sayiAdedi() {
    let liste = stringToFloat();
    return liste.length;
}
function minmaks() {
    let liste = stringToFloat();
    let min = Math.min.apply(Math, liste)
    let maks = Math.max.apply(Math, liste)
    return [min, maks];
}
function toplam() {
    let liste = stringToFloat();
    let toplam = 0
    for (let i = 0; i < liste.length; i++)
        toplam += liste[i];

    return toplam;
}
function degisimKatsayısı() {
    let sd = stantardDaviation();
    let ort = Artortalama();
    return sd / ort * 100;
}

function geometrikOrt() {
    let liste = stringToFloat();

    var carpim = 1.0;
    var sayi = parseFloat(liste.length);

    liste.forEach(function (i) {
        carpim *= parseFloat(i);
    });
    if (carpim <= 0) {
        return 'Geometrik Ort. pozitif değerler için hesaplabilir.'
    }
    return Math.pow(carpim, parseFloat(1.0 / sayi));

}


function hesapla() {
    let ort = Artortalama();
    let minmax = minmaks();
    let total = toplam();
    let med = medyan();
    let mode = mod();
    let hOrt = harmonicOrt();
    let sd = stantardDaviation();
    let varyns = varyans();
    let Adet = sayiAdedi();
    let gOrt = geometrikOrt();
    let dKat = degisimKatsayısı();
    let ortSapma = ortalamaSapma();

    localStorage.setItem('varyns', varyns);
    localStorage.setItem('min', minmax[0]);
    localStorage.setItem('maks', minmax[1]);
    localStorage.setItem('total', total);
    localStorage.setItem('ort', ort);
    localStorage.setItem('mode', mode[0]);
    localStorage.setItem('frekans', mode[1]);
    localStorage.setItem('hOrt', hOrt);
    localStorage.setItem('sd', sd);
    localStorage.setItem('gOrt', gOrt);
    localStorage.setItem('ortSapma', ortSapma);
    localStorage.setItem('med', med);
    localStorage.setItem('dKat', dKat);
    localStorage.setItem('Adet', Adet);
    document.location = 'result.html';
}

function goster() {

    document.getElementById("minmaks").innerHTML = 'Minimum: ' + parseFloat(localStorage.getItem('min')).toFixed(1) + ' Maksimum: ' + parseFloat(localStorage.getItem('maks')).toFixed(1);
    document.getElementById("Varyans").innerHTML = parseFloat(localStorage.getItem('varyns')).toFixed(2);
    document.getElementById("ElemanlarToplami").innerHTML = parseFloat(localStorage.getItem('total')).toFixed(2);
    document.getElementById("SayiAdedi").innerHTML = localStorage.getItem('Adet');
    document.getElementById("AritmetikOrtalama").innerHTML = parseFloat(localStorage.getItem('ort')).toFixed(2);
    document.getElementById("Medyan").innerHTML = parseFloat(localStorage.getItem('med')).toFixed(2);
    document.getElementById("StandartSapma").innerHTML = parseFloat(localStorage.getItem('sd')).toFixed(2);
    document.getElementById("Mod").innerHTML = 'Mod: ' + localStorage.getItem('mode') + ' Frekans: ' + localStorage.getItem('frekans');
    document.getElementById("HarmonikOrtalama").innerHTML = parseFloat(localStorage.getItem('hOrt')).toFixed(2);
    document.getElementById("Geometrikortalama").innerHTML = parseFloat(localStorage.getItem('gOrt')).toFixed(2);
    document.getElementById("OrtalamaSapma").innerHTML = parseFloat(localStorage.getItem('ortSapma')).toFixed(2);
    document.getElementById("DegisimKatsayisi").innerHTML = '% ' + parseFloat(localStorage.getItem('dKat')).toFixed(2);
    show();

}


function show() {
    var liste = localStorage.getItem("liste");
    var datalist = JSON.parse(liste);
    const arr = ['histogram', 'box', 'line'];
    const layouts = ['Histogram grafiği', 'Kutu grafiği', 'Çizgi grafik'];
    for (let i = 0; i < arr.length; i++) {
        var chart = {
            y: datalist,
            type: arr[i],
            boxpoints: 'Only Wiskers',
            cumulative: { enabled: false },
            boxmean: true,
            fill: 'tozeroy',
            name: "",
            mode: 'lines+markers',
            marker: {
                color: 'rgb(158,202,225)',
                opacity: 0.6,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };
        var layout = {
            title: layouts[i],
            height: 350,
            width: 400
        };
        Plotly.newPlot('myDiv' + `${i}`, [chart], layout);
    }
}

