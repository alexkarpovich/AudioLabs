var AudioContext = window.AudioContext || window.webkitAudioContext;
var BUFFER_SIZE = 2048,
    WIDTH = window.innerWidth - 100,
    HEIGHT = 400;

var canvas = document.getElementById('canvas');
var canvasCtx = canvas.getContext('2d');
var source;

function resizeHandler() {
    WIDTH = window.innerWidth - 100;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.

function autoCorrelate( buf, sampleRate ) {
    var SIZE = buf.length;
    var MAX_SAMPLES = Math.floor(SIZE/2);
    var best_offset = -1;
    var best_correlation = 0;
    var rms = 0;
    var foundGoodCorrelation = false;
    var correlations = new Array(MAX_SAMPLES);

    for (var i=0;i<SIZE;i++) {
        var val = buf[i];
        rms += val*val;
    }
    rms = Math.sqrt(rms/SIZE);
    if (rms<0.01) // not enough signal
        return -1;

    var lastCorrelation=1;
    for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
        var correlation = 0;

        for (var i=0; i<MAX_SAMPLES; i++) {
            correlation += Math.abs((buf[i])-(buf[i+offset]));
        }
        correlation = 1 - (correlation/MAX_SAMPLES);
        correlations[offset] = correlation; // store it, for the tweaking we need to do below.
        if ((correlation>0.9) && (correlation > lastCorrelation)) {
            foundGoodCorrelation = true;
            if (correlation > best_correlation) {
                best_correlation = correlation;
                best_offset = offset;
            }
        } else if (foundGoodCorrelation) {
            var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];
            return sampleRate/(best_offset+(8*shift));
        }
        lastCorrelation = correlation;
    }
    if (best_correlation > 0.01) {
        // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
        return sampleRate/best_offset;
    }
    return -1;
//	var best_frequency = sampleRate/best_offset;
}

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
    return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
    return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));
}

function updatePitch( audioContext, analyser ) {
    var buf = new Float32Array(BUFFER_SIZE);
    analyser.getFloatTimeDomainData( buf );
    var ac = autoCorrelate( buf, audioContext.sampleRate );

    if (ac == -1) {
        console.log('Detection: ---');
    } else {
        var pitch = ac;
        console.log('Detection:\nPitch - ', pitch);
        var note =  noteFromPitch( pitch );
        console.log('\nNote - ', noteStrings[note%12]);
        var detune = centsOffFromPitch( pitch, note );
        if (detune == 0 ) {
            console.log('\nDetune --- ');
        } else {
            if (detune < 0)
                detuneElem.className = "flat";
            else
                detuneElem.className = "sharp";
            console.log('\nDetune - ', Math.abs( detune ));
        }
    }
}

function success(stream, frequencyValue) {
    var context = new AudioContext();
    var gain = context.createGain();
    var analyser = context.createAnalyser();
    var source = context.createMediaStreamSource(stream);

    source.connect(gain);
    source.connect(analyser);
    gain.connect(context.destination);

    analyser.fftSize = BUFFER_SIZE;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    function renderFrame() {
        requestAnimationFrame(renderFrame);

        //analyser.getByteFrequencyData(dataArray);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;
        for(var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = -v * HEIGHT/2 + HEIGHT;

            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
        updatePitch(context, analyser);
    }

    renderFrame();
}

if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

if (navigator.getUserMedia) {
    console.log('Success: UserMedia');

    navigator.getUserMedia({audio: true}, success, function () {
        console.log('Error connecting userMedia');
    })
} else {
    alert('Browser not support UserMedia');
}

window.onresize = resizeHandler;
resizeHandler();


