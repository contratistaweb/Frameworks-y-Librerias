$(function(){
	function Color1(titulo){
        $( ".main-titulo" ).animate({
          color: "#DCFF0E",
        }, 1000,function(){
					Color2(titulo);
				}
	);}
		function Color2(titulo){
        $( ".main-titulo" ).animate({
          color: "#FFF",
        }, 1000,function(){
					Color1(titulo);
				}
	);}
Color1();
        
      

	
});	