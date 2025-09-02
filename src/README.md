# 🎮 Juego Scrabble - Estructuras Discretas

Un juego educativo de Scrabble que combina la diversión del juego clásico con preguntas de matemáticas sobre estructuras discretas.

## 📁 Estructura del Proyecto

```
src/
├── index.html              # Página principal del juego
├── styles.css              # Estilos CSS del juego
├── README.md               # Este archivo de documentación
├── javaScript/             # Carpeta de archivos JavaScript
│   ├── config.js           # Configuración centralizada del juego
│   ├── script.js           # Lógica principal y configuración del juego
│   ├── game.js             # Lógica del juego y eventos
│   ├── gameLogic.js        # Lógica de jugadas y validaciones
│   └── questionCategories.js # Categorías y preguntas del juego
└── recursos/               # Carpeta de recursos del juego
    ├── INSTRUCCIONES.md    # Instrucciones detalladas del juego
    ├── Preguntas.txt       # Preguntas generales del juego
    ├── PreguntasConjuntos.txt # Preguntas sobre teoría de conjuntos
    ├── PreguntasGrupos.txt # Preguntas sobre estructuras algebraicas
    ├── TrueAnswer.mp3      # Sonido para respuestas correctas
    └── WrongAnswer.mp3     # Sonido para respuestas incorrectas
```

## 🚀 Características del Juego

### 🎯 Objetivo
- Formar palabras en el tablero de Scrabble
- Obtener **100 puntos** para ganar
- Responder preguntas de matemáticas para ganar puntos extra

### 🎮 Funcionalidades
- **Tablero de 15x15** con casillas especiales
- **Sistema de puntuación** con multiplicadores
- **Preguntas educativas** cada 2 rondas
- **Interfaz responsive** para dispositivos móviles
- **Sistema táctil** para arrastrar fichas en móviles

### 📱 Compatibilidad Móvil
- **Arrastre táctil** de fichas
- **Interfaz adaptativa** para pantallas pequeñas
- **Controles optimizados** para dispositivos táctiles

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura del juego
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Lógica del juego
- **Eventos táctiles** - Soporte móvil nativo

## 📚 Categorías de Preguntas

### 1. **Teoría de Conjuntos**
- Operaciones con conjuntos
- Propiedades de conjuntos
- Leyes de composición interna

### 2. **Estructuras Algebraicas**
- Grupos, semigrupos y monoides
- Homomorfismos
- Propiedades algebraicas

### 3. **Permutación y Combinatoria**
- Principios de conteo
- Permutaciones y combinaciones
- Problemas de probabilidad

## 🎵 Recursos de Audio

- **TrueAnswer.mp3** - Sonido para respuestas correctas
- **WrongAnswer.mp3** - Sonido para respuestas incorrectas

## 🔧 Configuración

El archivo `config.js` centraliza toda la configuración del juego:

```javascript
const GAME_CONFIG = {
    GAME: {
        BOARD_SIZE: 15,
        RACK_SIZE: 7,
        WINNING_SCORE: 100,
        QUESTIONS_INTERVAL: 2
    },
    UI: {
        ANIMATION_DURATION: 300,
        MESSAGE_DISPLAY_TIME: 3000,
        MOBILE_BREAKPOINT: 768
    }
};
```

## 🎯 Cómo Jugar

1. **Selecciona una categoría** de preguntas
2. **Coloca fichas** en el tablero formando palabras
3. **Responde preguntas** cada 2 rondas para ganar puntos
4. **Alcanza 100 puntos** para ganar

## 📱 Controles Móviles

- **Toca una ficha** para seleccionarla
- **Toca una celda** para colocarla
- **Toca el rack** para devolverla

## 🔄 Funcionalidades Avanzadas

- **Cambio de fichas** - Intercambia fichas no deseadas
- **Movimiento de fichas** - Ajusta posiciones antes de confirmar
- **Devolución al rack** - Regresa fichas no confirmadas
- **Sistema de confirmación** - Fichas confirmadas no se pueden mover

## 📖 Instrucciones Detalladas

Consulta el archivo `recursos/INSTRUCCIONES.md` para instrucciones completas del juego.

## 🎨 Personalización

- **Colores del tema** en `styles.css`
- **Configuración del juego** en `config.js`
- **Preguntas** en los archivos de texto de la carpeta `recursos`

## 🚀 Instalación y Uso

1. Abre `index.html` en tu navegador
2. Selecciona una categoría de preguntas
3. ¡Comienza a jugar!

## 📝 Notas de Desarrollo

- **Modularización** - Código organizado en archivos separados
- **Configuración centralizada** - Todas las constantes en un lugar
- **Recursos organizados** - Archivos de texto y audio en carpeta separada
- **Compatibilidad móvil** - Sistema táctil implementado

---

**Desarrollado para el aprendizaje de Estructuras Discretas** 🎓 