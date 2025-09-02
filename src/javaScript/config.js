// Configuración centralizada del juego Scrabble
// Este archivo contiene todas las rutas y configuraciones del juego

const GAME_CONFIG = {
    // Rutas de recursos
    RESOURCES_PATH: 'recursos/',
    
    // Archivos de audio
    AUDIO: {
        TRUE_ANSWER: 'recursos/TrueAnswer.mp3',
        WRONG_ANSWER: 'recursos/WrongAnswer.mp3',
        CONGRATS: 'recursos/Congrats.mp3',
        PUT_PIECE: 'recursos/PutPiece.mp3'
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
            default:
                console.warn('Tipo de audio no reconocido:', audioType);
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
    } catch (error) {
        console.error('💥 Error creando elemento de audio:', error);
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

// Verificación de configuración cuando se carga la página (SIN REPRODUCIR AUDIOS)
window.addEventListener('load', function() {
    console.log('=== CONFIGURACIÓN DE AUDIO VERIFICADA ===');
    console.log('GAME_CONFIG cargado:', GAME_CONFIG);
    console.log('Función playAudio disponible:', typeof playAudio);
    console.log('Ruta CONGRATS:', GAME_CONFIG.AUDIO.CONGRATS);
    console.log('Ruta TRUE_ANSWER:', GAME_CONFIG.AUDIO.TRUE_ANSWER);
    console.log('Ruta WRONG_ANSWER:', GAME_CONFIG.AUDIO.WRONG_ANSWER);
    console.log('✅ Los audios solo se reproducirán cuando los actives manualmente');
});
