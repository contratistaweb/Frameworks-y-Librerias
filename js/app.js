$(function(){
  function Color1(titulo){
    $('.main-titulo').animate({
      color: "#DCFF0E",
    }, 1000,function(){
      Color2(titulo);
      Mover();
      
    });
  }
	function Color2(titulo){
		$('.main-titulo').animate({
			color: "#FFF",
		}, 1000,function(){
			Color1(titulo);
    });
  }
  Color1();
  //<---   fin efecto titulo   --->

  //<---   Crear objetos - Dulces
  function crear(){
    var i = 1;
    while(i<=7){
      if($('.col-'+i+' img').length == 0 || $('.col-'+i+' img').length<=6 && $('img').length <= 48){
        $('.col-'+i).prepend('<img src="image/'+aleatorio(1, 5)+'.png" id=""></img>');
        
        continue;
      }
      imgid();
      estilos();
      i++;
    }
  }


  //<---> funcion Asignacion de id
  function imgid(){
    var $idel = $('.col-1 img');
    for(x=0;x<$idel.length;x++){
      if($($('.col-1 img')[x]).attr('id')==''){
        $($('.col-1 img')[x]).attr('id','img-1'+x);
      }else{
          if($($('.col-2 img')[x]).attr('id')==''){
            $($('.col-2 img')[x]).attr('id','img-2'+x);
          }else{
            if($($('.col-3 img')[x]).attr('id')==''){
              $($('.col-3 img')[x]).attr('id','img-3'+x);
            }else{
              if($($('.col-4 img')[x]).attr('id')==''){
                $($('.col-4 img')[x]).attr('id','img-4'+x);
              }else{
                if($($('.col-5 img')[x]).attr('id')==''){
                  $($('.col-5 img')[x]).attr('id','img-5'+x);
                }else{
                  if($($('.col-6 img')[x]).attr('id')==''){
                    $($('.col-6 img')[x]).attr('id','img-6'+x);
                  }else{
                    if($($('.col-7 img')[x]).attr('id')==''){
                      $($('.col-7 img')[x]).attr('id','img-7'+x);
                    };
                  }
                }
              }
            }
          }
      }
      $('.col-'+[x+1]).attr('id','sortable'+[x+1]).addClass('connectedSortable');
      $('img').addClass('ui-state-default');
    }
  };

  //<---   Numeros aleatorios
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //<---> funcion Limpiar
  function limpiar(){
    $( ".panel-tablero div" ).empty();
  }

  //<--->  boton inicio reinicio
  $('.btn-reinicio').click(function (e) {
    e.preventDefault();
    if($(this).text() == 'Iniciar' ){
      $(this).text('Reiniciar');
      Timer()
      estilos();
      crear();
      //arrastrable();
    }else{
      if($(this).text() == 'Reiniciar' ){
        $(this).text('Iniciar');
        estilos();
        clearInterval(timer);
        limpiar();
      }    
    }
  });

  //funcion contador de clicks --> no se visualiza a un en el panel, falta por asociar ;-)
  


 


function estilos(){
  $('img').css({'height': '96px'});
}

  // <--- draggable ---> condicionar para que se eliminen las necesarias
  function Mover() {
    $( "#img-10" ).draggable();
    $( "#img-20" ).droppable({
      accept: "#img-10",
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $("#img-20").attr('src',$("#img-10").attr('src'));
        $("#img-10").remove();
        crear();
        
      }
    });
  }

  function movimientos(){
  var i = 0;
  $('img').click(function(){ 
    if (i < 200 ) { /*Cambiar el >= 0 por < 10 si quieres limitar el incremento*/
      i++;
      } else if (i = i++) {
      i = 0;
      }
    $('#movimientos-text').data(i);
  }); movimientos();


  // $('#disminuye').click(function(){ 

  //  if (i > 0) {--i;} 
  //        document.getElementById("display").innerHTML = i;
  // })
  }

  //<---   fin funcion principal   --->
}());

//evento en al drop
//$('#img-14').detach()-->

//<---> efecto para desaparecer las imagenes al juntar
//$('img').hide('scale',{percent: 200, direction: 'vertical' },1000);

//<---> Para temporizador
//var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...]);
//var timeoutID = scope.setTimeout(function[, delay]);
//var timeoutID = scope.setTimeout(code[, delay]); 
//function explode(){ alert("Boom!"); } setTimeout(explode, 2000); 

// para cuadro elemento desplegable...
//$( ".elemento" ).toggle('scale')