// Configuración centralizada del juego Scrabble
// Este archivo contiene todas las rutas y configuraciones del juego

const GAME_CONFIG = {
    // Rutas de recursos
    RESOURCES_PATH: 'recursos/',
    
    // Estado del audio (silenciado o no)
    AUDIO_MUTED: false,
    
    // Archivos de audio
    AUDIO: {
        TRUE_ANSWER: 'recursos/TrueAnswer.mp3',
        WRONG_ANSWER: 'recursos/WrongAnswer.mp3',
        CONGRATS: 'recursos/Congrats.mp3',
        PUT_PIECE: 'recursos/PutPiece.mp3',
        PLAYER_TURN: 'recursos/PlayerTurn.mp3',
        CORRECT_WORD: 'recursos/CorrectWord.mp3',
        TIMER_TICKS: 'recursos/TimerTicks.mp3'
    },
    
    // Archivos de texto
    TEXT_FILES: {
        INSTRUCTIONS: 'recursos/INSTRUCCIONES.md',
        QUESTIONS: 'recursos/Preguntas.txt',
        QUESTIONS_CONJUNTOS: 'recursos/PreguntasConjuntos.txt',
        QUESTIONS_GRUPOS: 'recursos/PreguntasGrupos.txt'
    },
    
    // Configuración del juego
    GAME: {
        BOARD_SIZE: 15,
        RACK_SIZE: 7,
        WINNING_SCORE: 100,
        QUESTIONS_INTERVAL: 2 // Cada cuántas rondas aparecen preguntas
    },
    
    // Configuración de la interfaz
    UI: {
        ANIMATION_DURATION: 300,
        MESSAGE_DISPLAY_TIME: 3000,
        MOBILE_BREAKPOINT: 768
    }
};

// Función para obtener la ruta completa de un recurso
function getResourcePath(resourceType, resourceName) {
    const basePath = GAME_CONFIG.RESOURCES_PATH;
    
    switch(resourceType) {
        case 'audio':
            return basePath + resourceName;
        case 'text':
            return basePath + resourceName;
        case 'markdown':
            return basePath + resourceName;
        default:
            return basePath + resourceName;
    }
}

// Función para reproducir audio
function playAudio(audioType) {
    // Verificar si el audio está silenciado
    if (GAME_CONFIG.AUDIO_MUTED) {
        console.log('🔇 Audio silenciado, no se reproduce:', audioType);
        return;
    }
    
    try {
        console.log('🎵 Reproduciendo audio:', audioType);
        const audio = new Audio();
        
        let audioSrc = '';
        switch(audioType) {
            case 'correct':
                audioSrc = GAME_CONFIG.AUDIO.TRUE_ANSWER;
                break;
            case 'incorrect':
                audioSrc = GAME_CONFIG.AUDIO.WRONG_ANSWER;
                break;
            case 'congrats':
                audioSrc = GAME_CONFIG.AUDIO.CONGRATS;
                break;
            case 'put_piece':
                audioSrc = GAME_CONFIG.AUDIO.PUT_PIECE;
                break;
            case 'player_turn':
                audioSrc = GAME_CONFIG.AUDIO.PLAYER_TURN;
                break;
            case 'correct_word':
                audioSrc = GAME_CONFIG.AUDIO.CORRECT_WORD;
                break;
            case 'timer_ticks':
                audioSrc = GAME_CONFIG.AUDIO.TIMER_TICKS;
                break;
            default:
                console.log('Tipo de audio no reconocido:', audioType);
                return;
        }
        
        console.log('📁 Ruta del audio:', audioSrc);
        audio.src = audioSrc;
        
        // Agregar event listeners para debug
        audio.addEventListener('loadstart', () => console.log('🎵 Audio: loadstart'));
        audio.addEventListener('durationchange', () => console.log('🎵 Audio: durationchange, duración:', audio.duration));
        audio.addEventListener('loadedmetadata', () => console.log('🎵 Audio: loadedmetadata'));
        audio.addEventListener('loadeddata', () => console.log('🎵 Audio: loadeddata'));
        audio.addEventListener('canplay', () => console.log('🎵 Audio: canplay'));
        audio.addEventListener('canplaythrough', () => console.log('🎵 Audio: canplaythrough'));
        audio.addEventListener('error', (e) => console.error('❌ Audio error:', e));
        audio.addEventListener('abort', () => console.warn('⚠️ Audio: abort'));
        audio.addEventListener('stalled', () => console.warn('⚠️ Audio: stalled'));
        audio.addEventListener('suspend', () => console.warn('⚠️ Audio: suspend'));
        
        console.log('▶️ Intentando reproducir audio:', audioType);
        
        audio.play().then(() => {
            console.log('✅ Audio reproducido exitosamente:', audioType);
        }).catch(error => {
            console.error('❌ Error reproduciendo audio:', error);
        });
        
        // Si es el audio del timer, guardarlo para poder detenerlo después
        if (audioType === 'timer_ticks') {
            GAME_CONFIG.currentTimerAudio = audio;
            console.log('⏰ Audio del timer guardado para control de detención');
        }
    } catch (error) {
        console.error('💥 Error creando elemento de audio:', error);
    }
}

// Función para detener el audio del timer
function stopTimerAudio() {
    if (GAME_CONFIG.currentTimerAudio) {
        try {
            GAME_CONFIG.currentTimerAudio.pause();
            GAME_CONFIG.currentTimerAudio.currentTime = 0;
            console.log('🔇 Audio del timer detenido y reiniciado');
        } catch (error) {
            console.error('❌ Error deteniendo audio del timer:', error);
        }
        GAME_CONFIG.currentTimerAudio = null;
    }
}

// Función para cargar archivos de texto
async function loadTextFile(fileType) {
    try {
        let filePath;
        
        switch(fileType) {
            case 'instructions':
                filePath = GAME_CONFIG.TEXT_FILES.INSTRUCTIONS;
                break;
            case 'questions':
                filePath = GAME_CONFIG.TEXT_FILES.QUESTIONS;
                break;
            case 'questions_conjuntos':
                filePath = GAME_CONFIG.TEXT_FILES.QUESTIONS_CONJUNTOS;
                break;
            case 'questions_grupos':
                filePath = GAME_CONFIG.TEXT_FILES.QUESTIONS_GRUPOS;
                break;
            default:
                throw new Error('Tipo de archivo no reconocido: ' + fileType);
        }
        
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.text();
    } catch (error) {
        console.error('Error cargando archivo de texto:', error);
        return null;
    }
}

// Exportar configuración para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAME_CONFIG, getResourcePath, playAudio, loadTextFile };
}

// Función para alternar el estado de silencio
function toggleMute() {
    GAME_CONFIG.AUDIO_MUTED = !GAME_CONFIG.AUDIO_MUTED;
    
    const muteBtn = document.getElementById('mute-btn');
    const muteIcon = muteBtn.querySelector('.mute-icon');
    
    if (GAME_CONFIG.AUDIO_MUTED) {
        muteBtn.classList.add('muted');
        muteIcon.textContent = '🔇';
        console.log('🔇 Audio silenciado');
    } else {
        muteBtn.classList.remove('muted');
        muteIcon.textContent = '🔊';
        console.log('🔊 Audio activado');
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('scrabble_audio_muted', GAME_CONFIG.AUDIO_MUTED);
}

// Función para establecer el estado de silencio
function setMuteState(muted) {
    GAME_CONFIG.AUDIO_MUTED = muted;
    
    const muteBtn = document.getElementById('mute-btn');
    const muteIcon = muteBtn.querySelector('.mute-icon');
    
    if (muted) {
        muteBtn.classList.add('muted');
        muteIcon.textContent = '🔇';
    } else {
        muteBtn.classList.remove('muted');
        muteIcon.textContent = '🔊';
    }
}

// Función para cargar preferencia de silencio desde localStorage
function loadMutePreference() {
    const savedMuteState = localStorage.getItem('scrabble_audio_muted');
    if (savedMuteState !== null) {
        const muted = savedMuteState === 'true';
        setMuteState(muted);
        console.log('🔊 Preferencia de audio cargada:', muted ? 'Silenciado' : 'Activado');
    }
}

// Verificación de configuración cuando se carga la página (SIN REPRODUCIR AUDIOS)
window.addEventListener('load', function() {
    console.log('=== CONFIGURACIÓN DE AUDIO VERIFICADA ===');
    console.log('GAME_CONFIG cargado:', GAME_CONFIG);
    console.log('Función playAudio disponible:', typeof playAudio);
    console.log('Ruta CONGRATS:', GAME_CONFIG.AUDIO.CONGRATS);
    console.log('Ruta TRUE_ANSWER:', GAME_CONFIG.AUDIO.TRUE_ANSWER);
    console.log('Ruta WRONG_ANSWER:', GAME_CONFIG.AUDIO.WRONG_ANSWER);
    console.log('✅ Los audios solo se reproducirán cuando los actives manualmente');
    
    // Cargar preferencia de silencio
    loadMutePreference();
});
