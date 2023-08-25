// Hello
var main=function(){
  $('input').focus(function(){

    $(this).css('background','#ddd');
  });



//zdarzenie on submit formularza do logowania
  $('form').on('submit', function(e){

     var kolkoImie=$('#kolko').val();
     console.log(kolkoImie);
     var krzyzykImie=$('#krzyzyk').val();
     console.log(krzyzykImie);
  	 
    var etykietaKolko= $('<p class="text-center" id=\'kolko\'></p>');
    var etykietaKrzyzyk= $('<p class="text-center" id=\'krzyzyk\'></p>');
     
    $('#gracz1').append(etykietaKolko );
    etykietaKolko.text('Gracz 1 '+kolkoImie+' - KÓŁKO - red');

    $('#gracz2').append(etykietaKrzyzyk );
    etykietaKrzyzyk.text('Gracz 2 '+krzyzykImie+' - KRZYŻYK - green');
  	
    //po wysłaniu formularza wyświetlane są dane graczy z przyporządkowanym kolorem
    //usuwany formularz, usuwana klasa blink tabell/planszy do gry - staje się widoczna
    $('form').remove()
    $('.blink').removeClass('blink');
    e.preventDefault();


  })

 //przed kolejną grą po wygranej, po kliknięciu napis dot. kontynuacji gry,
 // usuwane są zaznaczenia pól tabeli, usuwane pytanie o kontynuacji gry
   $('#pytanie').on('click', function(e){
     $('td').removeClass('red');
     $('td').removeClass('green');
     $('#pytanie p').remove();

     koniecGry=false;
     table=[
       [null,null,null],
       [null,null,null],
       [null,null,null],
     ];
     i=0;
   
    e.preventDefault();
  })

  
//sprawdzenie statusu gry, argumenty to tabela, która zawiera wstawione przez gracza pola
//oraz znak, którym posługuje się dany gracz
 function checkGame(tabela,znak){
  
  var tmp_prawyskos=[];
  var tmp_lewyskos=[];

  var dl=tabela.length;

  //badanie rzędów
  //sprawdzamy ilość rzędów w tabeli dwuwymiarowej
  for(var r=0; r<tabela.length;r++){
    //tmp - tabela pomocnicza do badania rzędów
    var tmp=[]; 
    //sprawdzamy po kolei każdy z rzędów, jeśli któryś z elemetów tabeli jest poszukiwanym znakiem,
    //to znak wstawiamy do tabeli pomocniczej
    //jeśli ilość elemntów tabeli pomocniczej będzie równa długości rzędu mamy wygraną
    for(var c=tabela[r].length;c>=0;c--){
       
       if(tabela[r][c]===znak){
        tmp.push(znak);
        if((tmp.length)===(tabela[r].length)){
          console.log('wygrana pozioma'+znak);
          return true;
        }
       }
     } 


      //skos prawy
      //prawy skos zawiera elementy, które mają taki sam x i y
      // ilość elementów skosu jest równa ilości rzędów w tabeli
       if(tabela[r][r]===znak){
         tmp_prawyskos.push(znak);
        if((tmp_prawyskos.length)===(tabela.length)){
          console.log('wygrana skos prawy'+znak);
          return true
        }
       }  

       //skos lewy
       //lewy skos , najniższy element ma współrzędne x=rząd, y=długość tabeli-1
       //zmienna dl oznacająca długośc tabeli jest po każdym przejściu rzędu zmiejszana o 1

         if(tabela[r][dl-1]===znak){
           tmp_lewyskos.push(znak);
           console.log(tmp_lewyskos);
         if((tmp_lewyskos.length)===(tabela.length)){
            console.log('wygrana skos lewy'+znak);
            return true
        }
       }  

       dl--;
  }


  //badanie kolumn
  //badanie pionów robimy analogicznie do poziomów
   for(var m=0; m<tabela[0].length;m++){
    var tmp_pion=[];
    for(var n=0;n<tabela.length;n++){
       
       if(tabela[n][m]===znak){
        tmp_pion.push(znak);
        if((tmp_pion.length)===(tabela[0].length)){
          console.log('wygrana pionowa'+znak);
          return true;
        }

       }
    }  
  }


 }
     
      

  
  var i=0;
  //definicja tabeli do gry
  var table=[
       [null,null,null],
       [null,null,null],
       [null,null,null],
     ];
  
 
  var koniecGry=false;


  //po kliknięciu w pole tabeli/planszy
  $('.klik').on('click',function(){
   
    //sprawdzamy, które to pole na podstawie atrybutu id komórki
    var field=($(this).attr('id'));
    console.log(field);
    
    //określamy współrzędne pola na podstawie atrybutu id
    var y=(field.slice(0,1)-1);
    var x=(field.slice(1,2)-1);

 
    var znak;

    //sprawdzamy, czy nie mamy już końca gry
    //sprawdzamy, czy pole w naszzej tabeli jest na pewno puste
     
     if(koniecGry===false)
     {
      if(table[y][x]===null){

           //jeśli kliknięcie jest parzyste to zaznaczamy pole kolorem czerwonym
           //jeśli nieparzyste to zielonym
            if(i%2===0){
              znak='red';
              table[y][x]='red';
              $(this).addClass('red');
            }
            else{
               znak='green';
               table[y][x]='green';
               $(this).addClass('green');
            }
  

            //po każdym kliknięciu sprawdzamy status gry
            //jesli funkcja zwraca wartośc true oznacza to wygraną jednego z graczy
            //zmienna koniecGry ustawiana jest na true
            if(checkGame(table,znak))
            {
              var wynikGry= $('<p class="text-center" id=\'wynikGry\'></p>');
                  $('#wynik').append(wynikGry);
                   wynikGry.text('WYGRANA: '+znak);

                   var pytanie= $('<p class="text-center"></p>');
                   $('#pytanie').append(pytanie);
                   pytanie.text('Zagraj ponownie.');

                   alert('Koniec');
                   koniecGry=true;
            }
            i++;
          }
      else{ 
           //nie wiem, czy da się sprawdzać ilość elementów w tabeli wielowymiarowej 
           if(i>8){
                   var pytanie= $('<p class="text-center"></p>');
                   $('#pytanie').append(pytanie);
                   pytanie.text('Brak wygranej! Zagraj ponownie.');

                   alert('Koniec');
                   koniecGry=true;

           }
           else
           {
           alert ('To zajęte pole!!! Wybierz inne.');
           }
          }
        }
        
        // else{ 
        //    var pytanie= $('<p class="text-center"></p>');
        //           $('#pytanie').append(pytanie);
        //            pytanie.text('Zagraj ponownie');
        //   alert('Koniec');

        // }
   
  
  });


}
$(document).ready(main);
