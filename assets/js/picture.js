const presets = require('./presets.json');

(function setBodyPicture() {
    document.body.style.backgroundImage = presets[Math.round(Math.random() * (presets.length - 1))];
})();
