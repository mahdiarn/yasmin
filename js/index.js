var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var notes = [
{ f: 262, d: .5, t: "Hap", p: p1 },
{ f: 262, d: .5, t: "py&nbsp;", p: p1 },
{ f: 294, d: 1, t: "Birth", p: p1 },
{ f: 262, d: 1, t: "day&nbsp;", p: p1 },
{ f: 349, d: 1, t: "To&nbsp;", p: p1 },
{ f: 330, d: 2, t: "You", p: p1 },

{ f: 262, d: .5, t: "Hap", p: p2 },
{ f: 262, d: .5, t: "py&nbsp;", p: p2 },
{ f: 294, d: 1, t: "Birth", p: p2 },
{ f: 262, d: 1, t: "day&nbsp;", p: p2 },
{ f: 392, d: 1, t: "To&nbsp;", p: p2 },
{ f: 349, d: 2, t: "You", p: p2 },

{ f: 262, d: .5, t: "Hap", p: p3 },
{ f: 262, d: .5, t: "py&nbsp;", p: p3 },
{ f: 523, d: 1, t: "Birth", p: p3 },
{ f: 440, d: 1, t: "day&nbsp;", p: p3 },
{ f: 349, d: 1, t: "Dear&nbsp;", p: p3 },
{ f: 330, d: 1, t: "Yas", p: p3 },
{ f: 294, d: 3, t: "min", p: p3 },

{ f: 466, d: .5, t: "Hap", p: p4 },
{ f: 466, d: .5, t: "py&nbsp;", p: p4 },
{ f: 440, d: 1, t: "Birth", p: p4 },
{ f: 349, d: 1, t: "day&nbsp;", p: p4 },
{ f: 392, d: 1, t: "To&nbsp;", p: p4 },
{ f: 349, d: 2, t: "You", p: p4 }];


//DOM
notes.map(function (n) {return createSpan(n);});

function createSpan(n) {
  n.sp = document.createElement("span");
  n.sp.innerHTML = n.t;
  n.p.appendChild(n.sp);
}

// SOUND
var speed = inputSpeed.value;
var flag = false;
var sounds = [];var

Sound = function () {
  function Sound(freq, dur, i) {_classCallCheck(this, Sound);
    this.stop = true;
    this.frequency = freq; // la frecuencia
    this.waveform = "triangle"; // la forma de onda
    this.dur = dur; // la duración en segundos
    this.speed = this.dur * speed;
    this.initialGain = .15;
    this.index = i;
    this.sp = notes[i].sp;
  }_createClass(Sound, [{ key: "cease", value: function cease()

    {
      this.stop = true;
      this.sp.classList.remove("jump");
      //this.sp.style.animationDuration = `${this.speed}s`;
      if (this.index < sounds.length - 1) {sounds[this.index + 1].play();}
      if (this.index == sounds.length - 1) {flag = false;}
    } }, { key: "play", value: function play()

    {var _this = this;
      // crea un nuevo oscillator
      this.oscillator = audioCtx.createOscillator();
      // crea un nuevo nodo de ganancia 
      this.gain = audioCtx.createGain();
      // establece el valor inicial del volumen del sonido 
      this.gain.gain.value = this.initialGain;
      // establece el tipo de oscillator  
      this.oscillator.type = this.waveform;
      // y el valor de la frecuencia 
      this.oscillator.frequency.value = this.frequency;
      // el volumen del sonido baja exponencialmente     
      this.gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + this.speed);
      // conecta el oscillator con el nodo de ganancia 
      this.oscillator.connect(this.gain);
      // y la ganancia con el dispositivo de destino
      this.gain.connect(audioCtx.destination);
      // inicia el oscillator 
      this.oscillator.start(audioCtx.currentTime);
      this.sp.setAttribute("class", "jump");
      this.stop = false;
      // para el oscillator después de un tiempo (this.speed) 
      this.oscillator.stop(audioCtx.currentTime + this.speed);
      this.oscillator.onended = function () {_this.cease();};
    } }]);return Sound;}();


for (var i = 0; i < notes.length; i++) {
  var sound = new Sound(notes[i].f, notes[i].d, i);
  sounds.push(sound);
}


// EVENTS

pleaseClick.addEventListener("click", function (e) {
  if (e.target.id != "inputSpeed" && !flag) {
    sounds[0].play();
    flag = true;}
  if (flag) {
    document.getElementById("emin").style.display = "block";
    document.getElementById("pleaseClick").style.display = "none";
  }
}, false);


inputSpeed.addEventListener("input", function (e) {
  speed = this.value;
  sounds.map(function (s) {
    s.speed = s.dur * speed;
  });
}, false);