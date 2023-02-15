let audio = document.getElementById("audio-fondo");


audio.volume = 0.1;

// Crear un objeto de contexto de audio
var audioContext = new AudioContext();

// Crear un objeto de fuente de audio
var audioSource = audioContext.createBufferSource();

// Cargar el archivo de audio
fetch('./assets/audio/song.mp3')
  .then(response => response.arrayBuffer())
  .then(buffer => audioContext.decodeAudioData(buffer))
  .then(decodedData => {
    audioSource.buffer = decodedData;
    // Empezar a reproducir el audio
    audioSource.start(0);
  });
