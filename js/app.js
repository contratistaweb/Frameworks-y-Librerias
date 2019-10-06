$(function(){
  //efecto titulo
  function Color1(titulo){
    $('.main-titulo').animate({
      color: "#DCFF0E",
    }, 1000,function(){
      Color2(titulo);
      
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
  //<---> funcion Limpiar
  function limpiar(){
    $( ".panel-tablero div" ).empty();
    $("#movimientos-text").text('0');
    $("#score-text").text('0');
  }
  //<--->  boton inicio reinicio
  $('.btn-reinicio').click(function (e) {
    e.preventDefault();
    if($(this).text() == 'Iniciar' ){
      $(this).text('Reiniciar');
      limpiar();
      Timer();
      crear();
      $( '.panel-tablero' ).show("drop", { direction: "left" }, "slow" , function(){
        if($('.panel-tablero').attr('style') == ''){
          $('.panel-score').animate({
            transform: 'width',
            width:'-=75%'
          },1000);
        }
      });
    }else{
      if($(this).text() == 'Reiniciar' ){
        $(this).text('Iniciar');
        estilos();
        $( '.panel-tablero' ).hide("drop", { direction: "left" }, "slow" , function(){
          if($('.panel-tablero').attr('style') !== ''){
            $('.panel-score').animate({
              transform: 'width',
              width:'+=43%'
            },1000);
          }
        });
      }
    }
  });
  //< ========= drag and drop  Next U ========>
  function crear() {
    var images = [
      "image/1.png",
      "image/2.png",
      "image/3.png",
      "image/4.png",
      "image/1.png",
      "image/2.png",
      "image/3.png"
    ]
    var columnas = $(".panel-tablero div");
  
    for (var i = 0; i < columnas.length; i++) {
      for (var j = 0; j < images.length; j++) {
        var img = Math.floor(Math.random() * (4 - 1 + 1));
        if($('img').length < 49){
          if($('[class="col-'+[i+1]+'"] img').length < 7){
            $('[class="col-'+[i+1]+'"]').append("<img src='" + images[img] +
          "' class='elemento' width='100px' height='100px' id='"+[i+1]+[j+1]+"'>");
          draganddrop();
          }
        }
      }
    }
  }
  
  function draganddrop(){
    var columnas = $(".panel-tablero div");
    for (var i = 0; i < columnas.length; i++) {
      elementos = $(columnas[i]).find("img");
  
      for (var j = 0; j < elementos.length; j++) {
        var start_left, stop_left, start_top, stop_top;
  
        $(elementos[j]).draggable({
          disabled: false,
          revert: "invalid",
          containment: ".panel-tablero",
          scroll: false,
          grid: [120, 90],
          start: function (event, ui) {
            start_left = ui.position.left;
            start_top = ui.position.top;
          },
          stop: function (event, ui) {
            stop_left = ui.position.left;
            stop_top = ui.position.top;
          },
        }, 2000);
        $(elementos[j]).droppable({
          disabled: false,
          classes: {
            "ui-droppable-hover": "ui-state-hover"
          },
          accept: function (ui) {
            if ((start_left < stop_left) || (start_left > stop_left) || (start_top < stop_top) || (
                start_top > stop_top)) {
              return true;
            }
            return false;
          },
          drop: function (event, ui) {
  
            $($(ui.draggable)).css({
              left: "auto",
              top: "auto"
            });
  
            validarMovimiento($(this), $(ui.draggable), start_left, stop_left, start_top, stop_top);
  
            var movimientos = parseInt($("#movimientos-text").text());
            $("#movimientos-text").text(movimientos + 1);
            $("#score-text").text((movimientos + 1)*100);
            
            eliminar();
            crear();
          }
        }, 2000);
      }
    }
  }
  
  function validarMovimiento(dropE, dragE, start_left, stop_left, start_top, stop_top) {
  
    if (start_top > stop_top) {
      cambiar($(dropE), $(dragE));
    } else if (start_top < stop_top) {
      cambiar($(dropE), $(dragE));
    } else if (start_left < stop_left) {
      cambiar($(dropE), $(dragE));
    } else if (start_left > stop_left) {
      cambiar($(dropE), $(dragE));
    }
  
  }
  
  function cambiar(dropE, dragE) {
    if ($(dropE).next().length != 0) {
      if ($(dragE).next().length != 0) {
        var nueP = $(dropE).next();
        var nueP2 = $(dragE).next();
        $(nueP).before($(dragE));
        $(nueP2).before($(dropE));
      } else {
        var nueP = $(dropE).prev();
        $(nueP).after($(dragE));
      }
    } else {
      var nueP = $(dropE).prev();
      var nueP2 = $(dragE).prev();
      $(nueP).after($(dragE));
      $(nueP2).after($(dropE));
    }
  }
  //<=========== fin Drag and Drop =========>
  
  function eliminar(){
    for(var i = 1; i<=7;i++){
      for(var z=1;z<=7;z++){
        if(($('.col-'+[i]+' img').eq(z).attr('src') == $('.col-'+[i+1]+' img').eq(z).attr('src')) && ($('.col-'+[i]+' img').eq(z).attr('src') == $('.col-'+[i+2]+' img').eq(z).attr('src'))){
          $('.col-'+[i]+' img').eq(z).effect('pulsate',2000).remove();
          $('.col-'+[i+1]+' img').eq(z).effect('pulsate',2000).remove();
          $('.col-'+[i+2]+' img').eq(z).effect('pulsate',2000).remove();
          crear();
          console.log($('.col-'+[i]+' img').eq(z).attr('src'));
        }
        
      }
      
    }
  }
  
  function estilos(){
    $('img').css({'height': '96px'});
  }
  //<---   fin funcion principal   --->
}());