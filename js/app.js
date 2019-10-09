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
    if($('.btn-reinicio').text() != 'Iniciar' ){
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
  
    for (var i = 0; i <= columnas.length; i++) {
      for (var j = 0; j < images.length; j++) {
        var img = Math.floor(Math.random() * (4 - 1 + 1));
        if($('[class="col-'+[i]+'"] img').length < 7){
          $('[class="col-'+[i]+'"]').prepend("<img src='" + images[img] +
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
          grid: [160, 100],
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
          }
        });
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
  
  function eliminar() {
    for (var i = 1; i <= 7; i++) {
      for (var z = 0; z <= 6; z++) {
        var dulce1 = $($('.col-' + [i]).find("img")[z]);
        var dulce2 = $($('.col-' + [i]).find("img")[z + 1]);
        var dulce3 = $($('.col-' + [i]).find("img")[z + 2]);
        var dulce4 = $($('.col-' + [i + 1]).find("img")[z]);
        var dulce5 = $($('.col-' + [i + 2]).find("img")[z]);
        if (dulce1.attr('src') == dulce2.attr('src')
          && dulce2.attr('src') == dulce3.attr('src')) {
          dulce1.effect('pulsate',function(){
            $(this).remove();
            crear();
          });
          dulce2.effect('pulsate',function(){
            $(this).remove();
            crear();
          });
          dulce3.effect('pulsate',function(){
            $(this).remove();
            crear();
          });
          
          console.log(dulce1.attr('src'), dulce2.attr('src'),dulce3.attr('src'));
          
          
        }else if(dulce1.attr('src') == dulce4.attr('src')
          && dulce4.attr('src') == dulce5.attr('src')){
            dulce1.effect('pulsate',function(){
              $(this).remove();
              crear();
            });
            dulce4.effect('pulsate',function(){
              $(this).remove();
              crear();
            });
            dulce5.effect('pulsate',function(){
              $(this).remove();
              crear();
            });
            
              console.log(dulce1.attr('src'), dulce4.attr('src'),dulce5.attr('src'));
            
          
        }
    
      }
    
    }
    
  }


  function estilos(){
    $('img').css({'height': '96px'});
  }
  //<---   fin funcion principal   --->
}());