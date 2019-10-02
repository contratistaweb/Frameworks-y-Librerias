function Timer(){
var limite = new Date();
var end = limite.getTime()+120000;

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var ahora = new Date();
        var now = ahora.getTime();
        var distance = end - now;
        if (distance < 0 || $('.btn-reinicio').text() == 'Iniciar') {

			clearInterval(timer);
            document.getElementById('timer').innerHTML = '02:00';

            return;
        }

        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

		document.getElementById('timer').innerHTML = '';
        document.getElementById('timer').innerHTML += hours;
        document.getElementById('timer').innerHTML += minutes + ':';
        document.getElementById('timer').innerHTML += seconds;
    }

	timer = setInterval(showRemaining, 1000);
}