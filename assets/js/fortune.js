const cookie = require('fortune-cookie-ru');

(function fortuneCite() {
    function checkValidity(fortune) {
        function checkForCapitalLetters() {
            return fortune == (fortune[0] + fortune.substring(1).toLowerCase());
        }
        return fortune && fortune.length < 80 && checkForCapitalLetters();
    }

    var fortune = '';
    new Promise(function(res) {
        while(!checkValidity(fortune)) {
            fortune = cookie.get().split('--')[0];
            if(checkValidity(fortune)) res();
        }
    }).then(function() {
        document.querySelector('#citate').innerHTML = fortune;
    });
})();
