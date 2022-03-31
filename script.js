let kadinUrunleri=["Fondoten","80","Ruj","65","Allık","55","Oje","15","Aseton","10","Coco Chanel Parfüm","500","Yüz Maskesi","15"];
let erkekUrunleri=["Blue and Chanel Parfümü","450","Traş Bıçağı","10","Nivea Erkek Cilt Bakım Seti","200","Traş Köpüğü","20","Traş Makinesi","300"];
let i;
let urunAciklama,urunSecenek;
let eklenecekler=[];
let fiyatlar=[];
let listeSepet=document.getElementById("sepetGratis");
let toplamTutar=0;
let kod="NSCÖ4BH";

for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   

function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}

function urunleriGetir(){
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }

    if(document.getElementById("kategoriKadin").checked)
    {
        for(i=0;i<kadinUrunleri.length;i=i+2)
        {
            olustur();
            urunSecenek.value=kadinUrunleri[i+1];
            urunAciklama.innerHTML=kadinUrunleri[i]; 
        }
    }
    else if(document.getElementById("kategoriErkek").checked)
    {
        for(i=0;i<erkekUrunleri.length;i=i+2)
        {
        olustur();
        urunSecenek.value=erkekUrunleri[i+1];
        urunAciklama.innerHTML=erkekUrunleri[i];
        }
    }
}

function sepeteEkle(){
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");

    let adet=document.getElementById("urunAdet").value;

        eklenecekler=[];
        fiyatlar=[];

        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
                toplamTutar+=(Number(listeUrunlerFiyat[i].value)*adet);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }

        console.log(eklenecekler);
        console.log(fiyatlar);

    for(i=0;i<adet;i++)
    {
        let sepeteEklenecekUrun;
        for(let j=0;j<eklenecekler.length;j++){
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            sepeteEklenecekUrun.text=eklenecekler[j];
            sepeteEklenecekUrun.value=fiyatlar[j];
        }
    }

    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

function sepettenCikar(){

    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);
    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

function sepetiBosalt(){
    document.querySelectorAll('#sepetGratis option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}
function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod == kod)
    {
        if(toplamTutar>=50)
        {
            toplamTutar=toplamTutar-10;
            
            document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
            document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
            document.getElementById("txtIndirim").disabled=true;
            document.getElementById("txtIndirim").value="";
        }
        else{
            document.getElementById("sonuc").innerHTML="Girdiğiniz kod için minimum sepet tutarı 50 TL olmalıdır!";
        }
    }
    else{
        document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}