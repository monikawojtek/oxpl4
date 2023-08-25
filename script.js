//Przygotowywujemy sobie zmienną na planszę
var tablica;
var plansza;
var ruch_numer;
//Tworzymy zdarzenie które uruchomi sie jak strona zostanie załadowana
window.addEventListener("load", function(){
    //Po kliknięciu przycisku zaczynamy grę na nowo
    document.getElementById("przycisk").addEventListener("click", function(){
        document.getElementById("komunikat").setAttribute("hidden", "");
        nowa_gra("x");
    });
    //Przypisujemy sobie nasza zmienną do planszy żabyśmy nie musieli ciągle jej wyszukiwać
    plansza = document.getElementById("plansza");
    //dodajemy do plansz zdarzenie wywoływane przez kliknięcie myszki
    plansza.addEventListener("click", function(zdarzenie){
        //Element zdarzenie.target zawiera wskaźnik na polę na którym nastąpiło kliknięcie
        //Sprawdzamy czy user napewno klinką w pole a nie np. trafił na siatę, czy gdzieś obok.
        if(zdarzenie.target.nodeName != "TH" || zdarzenie.target.hasAttribute("pole"))
            return false;
        zdarzenie.target.setAttribute("pole", plansza.getAttribute("ruch"));
        var ruch = 1;
        if(plansza.getAttribute("ruch") == "x")
        {
            ruch = -1;
            plansza.setAttribute("ruch", "o");
        }
        else
            plansza.setAttribute("ruch", "x");
        //Dodaje kolejny ruch
        ruch_numer++;
        //Oznaczam pole w tablicy
        tablica[parseInt(zdarzenie.target.getAttribute("x"))][parseInt(zdarzenie.target.getAttribute("y"))] = ruch;
        switch(czy_koniec())
        {
            //najpopularniejsza opcja wiec na poczatek sprawdzamy i jak jest to przerywamy sprawdzanie
            case false: break;
            //Już wiemy że koniec więc blokujemy interfejs odbierając ruch
            case -1:
                wyswietl_komunikat("Wygrał krzyzyk");
                break;
            case 1:
                wyswietl_komunikat("Wygrało kólko");
                break;
            case -2:
                wyswietl_komunikat("Remis");
                break;
        }
    });
    nowa_gra("x");
});
//Funkcja do wyświetlania komunikatu na koniec gry
function wyswietl_komunikat(tresc)
{
    document.getElementById("tresc").innerHTML = tresc;
    plansza.removeAttribute("ruch");
    document.getElementById("komunikat").removeAttribute("hidden");
};
//Podajemy kto zaczyna x - krzyzyk, o - kolko
function nowa_gra(zaczyna)
{
    //Resetuje liczbę ruchów
    ruch_numer = 0;
    //Tworzymy tabelę jednowymiarową
    tablica = new Array(3);
    //Dodajemy drugi wymiar tworząc w każdym wierszi tabeli kolejną tabelę
    for(var i = 0; i < tablica.length;i++)
    {
        tablica[i] = new Array(tablica.length);
        for(var x = 0; x < tablica.length; x++)
        tablica[i][x] = 0;
    }
    //Sprawdzamy czy są atrybuty pola, jesli tak to je usuwamy 
    var zapelnione_pola = plansza.querySelectorAll("th[pole]");
    for(var i = 0; i < zapelnione_pola.length; i++)
        zapelnione_pola[i].removeAttribute("pole");
    plansza.setAttribute("ruch", zaczyna);
};
function czy_koniec()
{
    /*
        -1 - krzyzk
        1 - kolko,
        -2 - remis
        false/0 - jeszcze nie koniec
    */
    //Sprawdzam czy nie ma wygranej po prostej
    for(var i = 0; i < 3; i++)
    {
        //Sprawdzam w poziomie
        if(Math.abs(tablica[0][i] + tablica[1][i] + tablica[2][i]) == 3)
            return tablica[0][i];
        //Sprawdzam w pionie
        if(Math.abs(tablica[i][0] + tablica[i][1] + tablica[i][2]) == 3)
            return tablica[i][0];
    }
    //Sprawdzam skosy
    if(Math.abs(tablica[0][0] + tablica[1][1] + tablica[2][2]) == 3)
        return tablica[0][0];
    if(Math.abs(tablica[0][2] + tablica[1][1] + tablica[2][0]) == 3)
        return tablica[0][2];
    //Sprawdzam czy plansza nie jest zapelniona jak jest i nie ma nadal wygranej to remis
    if(ruch_numer >= 9)
        return -2;
   return false;
}
