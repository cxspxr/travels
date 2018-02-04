const presets = require('./presets.json');

(function setBodyPicture() {
    let preset = presets[+((new Date()).getHours() >= 12)];
    document.body.style.backgroundImage = preset.background;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', preset.statusBar);
    document.querySelector('meta[name="msapplication-navbutton-color"]').setAttribute('content', preset.statusBar);
})();
