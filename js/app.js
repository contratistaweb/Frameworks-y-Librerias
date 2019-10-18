$(function () {
  //efecto titulo
  function Color1(titulo) {
    $('.main-titulo').animate({
      color: "#DCFF0E",
    }, 1000, function () {
      Color2(titulo);

    });

  }
  function Color2(titulo) {
    $('.main-titulo').animate({
      color: "#FFF",
    }, 1000, function () {
      Color1(titulo);
    });
  }
  Color1();
  //<---> funcion Limpiar
  function limpiar() {
    $(".panel-tablero div").empty();
    $("#movimientos-text").text('0');
    $("#score-text").text('0');
  }
  //<--->  boton inicio reinicio
  $('.btn-reinicio').click(function (e) {
    e.preventDefault();
    if ($(this).text() == 'Iniciar') {
      $(this).text('Reiniciar');
      limpiar();
      Timer();
      crear();
      $('.panel-tablero').show("drop", { direction: "left" }, "slow", function () {
        if ($('.panel-tablero').attr('style') == '') {
          $('.panel-score').animate({
            transform: 'width',
            width: '-=75%'
          }, 1000);
        }
      });
      eliminar() /* agregado este llamado */
    } else {
      if ($(this).text() == 'Reiniciar') {
        $(this).text('Iniciar');
        estilos();
        $('.panel-tablero').hide("drop", { direction: "left" }, "slow", function () {
          if ($('.panel-tablero').attr('style') !== '') {
            $('.panel-score').animate({
              transform: 'width',
              width: '+=43%'
            }, 1000);
          }
        });
      }
    }
  });

  //< ========= drag and drop  Next U ========>
  function crear() {
    if ($('.btn-reinicio').text() != 'Iniciar') {
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
          if ($('[class="col-' + [i] + '"] img').length < 7) {
            $('[class="col-' + [i] + '"]').prepend("<img src='" + images[img] +
              "' class='elemento' width='100px' height='100px' id='" + [i + 1] + [j + 1] + "'>");

            draganddrop();

          }
        }
      }
    }
  }

  function draganddrop() {
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

            return true;
          },
          drop: function (event, ui) {

            $($(ui.draggable)).css({
              left: "auto",
              top: "auto"
            });

            validarMovimiento($(this), $(ui.draggable), start_left, stop_left, start_top, stop_top);

            var movimientos = parseInt($("#movimientos-text").text());
            $("#movimientos-text").text(movimientos + 1);
            $("#score-text").text((movimientos + 1) * 100);

            eliminar();
          }
        });
      }
    }
  }


  function validarMovimiento(drop, drag, start_left, stop_left, start_top, stop_top) {
    var coldp = drop.parent().index();
    var coldg = drag.parent().index();
    var res = (coldg - coldp);
    var res2 = drag.index() - drop.index();
    var flag = true;
    if (coldp == coldg) {
      if (drop.index() > drag.index()) {
        var pasa = 0;
        var p1 = drag.parent().children()[drop.index() + 1];
        var p2 = drag.parent().children()[drop.index() + 2];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }


        p1 = $(drop.parent().parent().children()[coldp + 1]).children()[drop.index()];
        p2 = $(drop.parent().parent().children()[coldp - 1]).children()[drop.index()];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }

        p1 = $(drop.parent().parent().children()[coldp + 1]).children()[drop.index()];
        p2 = $(drop.parent().parent().children()[coldp + 2]).children()[drop.index()];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }

        p1 = $(drop.parent().parent().children()[coldp - 1]).children()[drop.index()];
        p2 = $(drop.parent().parent().children()[coldp - 2]).children()[drop.index()];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }

        if (pasa == 0) {
          return;
        }
      } else {
        var pasa = 0;
        var p1 = drag.parent().children()[drop.index() - 1];
        var p2 = drag.parent().children()[drop.index() - 2];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }

        p1 = $(drop.parent().parent().children()[coldp + 1]).children()[drop.index()];
        p2 = $(drop.parent().parent().children()[coldp - 1]).children()[drop.index()];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }

        p1 = $(drop.parent().parent().children()[coldp + 1]).children()[drop.index()];
        p2 = $(drop.parent().parent().children()[coldp + 2]).children()[drop.index()];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }

        p1 = $(drop.parent().parent().children()[coldp - 1]).children()[drop.index()];
        p2 = $(drop.parent().parent().children()[coldp - 2]).children()[drop.index()];
        if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
          pasa += 1;
        }

        if (pasa == 0) {
          return;
        }
      }
    }

    if (coldp > coldg) {
      var pasa = 0;
      var p1 = $(drop.parent().parent().children()[coldp + 1]).children()[drop.index()];//[drop.index() + 1];
      var p2 = $(drop.parent().parent().children()[coldp + 2]).children()[drop.index()];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }
      p1 = $(drop.parent().parent().children()[coldp]).children()[drop.index() + 1];
      p2 = $(drop.parent().parent().children()[coldp]).children()[drop.index() + 2];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }
      p1 = $(drop.parent().parent().children()[coldp]).children()[drop.index() - 1];
      p2 = $(drop.parent().parent().children()[coldp]).children()[drop.index() - 2];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }
      p1 = $(drop.parent().parent().children()[coldp]).children()[drop.index() - 1];
      p2 = $(drop.parent().parent().children()[coldp]).children()[drop.index() + 1];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }

      if (pasa == 0) {
        return;
      }
    }

    if (coldp < coldg) {
      var pasa = 0;
      var p1 = $(drop.parent().parent().children()[coldp - 1]).children()[drop.index()];//[drop.index() + 1];
      var p2 = $(drop.parent().parent().children()[coldp - 2]).children()[drop.index()];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }
      p1 = $(drop.parent().parent().children()[coldp]).children()[drop.index() + 1];
      p2 = $(drop.parent().parent().children()[coldp]).children()[drop.index() + 2];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }
      p1 = $(drop.parent().parent().children()[coldp]).children()[drop.index() - 1];
      p2 = $(drop.parent().parent().children()[coldp]).children()[drop.index() - 2];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }
      p1 = $(drop.parent().parent().children()[coldp]).children()[drop.index() - 1];
      p2 = $(drop.parent().parent().children()[coldp]).children()[drop.index() + 1];
      if ($(p1).attr("src") == drag.attr("src") && $(p2).attr("src") == drag.attr("src")) {
        pasa += 1;
      }

      if (pasa == 0) {
        return;
      }
    }




    if (res == 0 || res == 1 || res == -1) {
      if (res2 == 0 || res2 == 1 || res2 == -1) {
        cambiar(drop, drag);
      }
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
        /* Valida Columnas */
        var dulcec1 = $($('.col-' + [i]).find("img")[z]);
        var dulcec2 = $($('.col-' + [i]).find("img")[z + 1]);
        var dulcec3 = $($('.col-' + [i]).find("img")[z + 2]);
        if (dulcec1.attr('src') == dulcec2.attr('src')
          && dulcec2.attr('src') == dulcec3.attr('src')) {
          dulcec1.addClass("eliminar");
          dulcec2.addClass("eliminar");
          dulcec3.addClass("eliminar");
        }
        /* Valida Filas */
        var dulcef1 = $($('.col-' + [i]).find("img")[z]);
        var dulcef2 = $($('.col-' + [i + 1]).find("img")[z]);
        var dulcef3 = $($('.col-' + [i + 2]).find("img")[z]);
        if (dulcef1.attr('src') == dulcef2.attr('src')
          && dulcef2.attr('src') == dulcef3.attr('src')) {
          dulcef1.addClass("eliminar");
          dulcef2.addClass("eliminar");
          dulcef3.addClass("eliminar");
        }
      }

    }
    /* Elimina todos los dulces */
    $(".eliminar").effect('pulsate', function () {
      $(this).remove();
      crear();
    });

  }

  /*
    function estilos() {
      $('img').css({ 'height': '96px' });
    }
  */
  //<---   fin funcion principal   --->
}());