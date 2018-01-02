var Sound = function () {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
};

Sound.prototype.play = function (arraybuffer, isLoop) {
    var me = this;
    me.audioContext.decodeAudioData(arraybuffer, function (buffer) {
        var bs = this.createBufferSource();
        bs.buffer = buffer;
        bs.connect(this.destination);
        bs.loop = !!isLoop;
        bs.start();
        bs = undefined;
    });
};

Sound.prototype.pause = function () {
    var me = this;
    me.audioContext.resume();
};

Sound.prototype.continue = function () {
    var me = this;
    me.audioContext.suspend();
};

Sound.prototype.stop = function () {
    var me = this;

};