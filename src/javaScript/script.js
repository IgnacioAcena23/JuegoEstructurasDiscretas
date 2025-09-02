// Configuración del juego usando el archivo de configuración centralizada
const BOARD_SIZE = GAME_CONFIG.GAME.BOARD_SIZE;
const LETTER_DISTRIBUTION = {
    'A': { count: 12, value: 1 },
    'B': { count: 2, value: 3 },
    'C': { count: 4, value: 3 },
    'D': { count: 5, value: 2 },
    'E': { count: 12, value: 1 },
    'F': { count: 1, value: 4 },
    'G': { count: 2, value: 2 },
    'H': { count: 2, value: 4 },
    'I': { count: 6, value: 1 },
    'J': { count: 1, value: 8 },
    'L': { count: 4, value: 1 },
    'M': { count: 2, value: 3 },
    'N': { count: 5, value: 1 },
    'Ñ': { count: 1, value: 8 },
    'O': { count: 9, value: 1 },
    'P': { count: 2, value: 3 },
    'Q': { count: 1, value: 5 },
    'R': { count: 5, value: 1 },
    'S': { count: 6, value: 1 },
    'T': { count: 4, value: 1 },
    'U': { count: 5, value: 1 },
    'V': { count: 1, value: 4 },
    'X': { count: 1, value: 8 },
    'Y': { count: 1, value: 4 },
    'Z': { count: 1, value: 10 },
    '': { count: 2, value: 0 } // Comodines
};

const RACK_SIZE = GAME_CONFIG.GAME.RACK_SIZE;

// Preguntas del juego
const QUESTIONS = [
    {
        question: "¿Cuál es la principal diferencia entre una permutación y una combinación?",
        options: [
            "La permutación se calcula con factoriales y la combinación con logaritmos.",
            "En una permutación, el orden de los elementos importa, mientras que en una combinación, el orden no importa.",
            "La permutación se aplica a conjuntos de números y la combinación a conjuntos de letras.",
            "La permutación se usa para eventos independientes y la combinación para eventos dependientes."
        ],
        correct: 1
    },
    {
        question: "¿Cuántos números de 4 dígitos se pueden formar con los dígitos 1, 2, 3, 4, 5, 6, si no se permite la repetición de los dígitos?",
        options: ["24", "1296", "15", "360"],
        correct: 3
    },
    {
        question: "En una caja hay 5 canicas rojas y 4 azules. ¿De cuántas maneras se pueden elegir 3 canicas de la caja?",
        options: ["3!=6", "53×43=8000", "C(9,3)= 84", "504"],
        correct: 2
    },
    {
        question: "¿De cuántas maneras se pueden sentar 5 personas en una fila de 5 asientos?",
        options: ["C(5,5)=1", "P(5,5)=120", "55=3125", "5×4=20"],
        correct: 1
    },
    {
        question: "Una moneda se lanza 3 veces. ¿Cuántos resultados posibles hay si el orden de los resultados importa?",
        options: ["P(3,3)=6", "C(3,2)=3", "3!=6", "2^3=8"],
        correct: 3
    },
    {
        question: "¿Cuál es el valor del término C(n,0)?",
        options: ["C(n,n)", "0", "1", "n"],
        correct: 2
    },
    {
        question: "Un estudiante puede elegir un deporte de una lista de 5 deportes de equipo o un deporte de una lista de 3 deportes individuales. ¿Cuántos deportes distintos puede elegir en total?",
        options: ["5×3=15", "5+3=8", "P(8,2)=56", "C(8,2)=28"],
        correct: 1
    },
    {
        question: "En una carrera hay 8 corredores. ¿De cuántas maneras se pueden otorgar los tres primeros lugares (oro, plata y bronce)?",
        options: ["83=512", "P(8,3)=336", "C(8,3)=56", "3!=6"],
        correct: 1
    },
    {
        question: "Se lanza un dado de 6 caras y se lanza una moneda al aire. ¿Cuántos resultados posibles se pueden obtener?",
        options: ["C(6,2)=15", "6×2=12", "P(8,2)=56", "6+2=8"],
        correct: 1
    },
    {
        question: "¿Cuál es la diferencia entre el Principio de la Suma y el Principio de la Multiplicación?",
        options: [
            "El Principio de la Suma se usa solo con números enteros, y la multiplicación con números racionales.",
            "La suma se relaciona con combinaciones, y la multiplicación con permutaciones.",
            "La suma se aplica a eventos mutuamente excluyentes ('o'), y la multiplicación a eventos consecutivos e independientes ('y').",
            "La suma se usa para ordenar elementos, y la multiplicación para seleccionarlos."
        ],
        correct: 2
    },
    {
        question: "Se desea formar un comité de 4 personas de un grupo de 10 hombres y 8 mujeres. ¿De cuántas maneras se puede formar el comité si debe haber exactamente 2 hombres y 2 mujeres?",
        options: ["P(10,2)×P(8,2)=90×56=5040", "C(18,4)=3060", "C(10,2)+C(8,2)=45+28=73", "C(10,2)×C(8,2)=45×28=1260"],
        correct: 3
    },
    {
        question: "En una caja hay 5 libros de matemáticas y 4 de física. ¿De cuántas maneras se puede elegir un libro de matemáticas o un libro de física?",
        options: ["P(9,2)=72", "5+4=9", "C(9,2)=36", "5×4=20"],
        correct: 1
    },
    {
        question: "¿De cuántas maneras pueden 6 personas sentarse alrededor de una mesa circular?",
        options: ["P(6,6)=720", "6×5=30", "C(6,6)=1", "(6−1)!=5!=120"],
        correct: 3
    },
    {
        question: "¿Qué propiedad define a un problema como una **permutación**?",
        options: [
            "Se seleccionan todos los elementos del conjunto y el orden no importa.",
            "El orden de los elementos seleccionados es crucial.",
            "Se seleccionan subconjuntos de elementos sin considerar su posición.",
            "Los elementos se pueden repetir infinitamente en cada selección."
        ],
        correct: 1
    },
    {
        question: "En la fórmula de la permutación P(n,k), ¿qué representa 'n' y qué representa 'k'?",
        options: [
            "n es el total de elementos y k es el número de elementos repetidos.",
            "n es el número de elementos seleccionados y k es el total de elementos.",
            "n es el total de elementos y k es el número de elementos que se toman para formar el arreglo.",
            "n es el número de combinaciones y k es el número de permutaciones."
        ],
        correct: 2
    },
    {
        question: "¿Cuál es la interpretación de C(n,n)?",
        options: [
            "El número de arreglos posibles de los elementos de un conjunto de 'n'.",
            "Cero, porque no tiene sentido elegir 'n' de 'n' elementos.",
            "El número de maneras de elegir 'n' elementos de un conjunto de 'n', sin que el orden importe.",
            "El número de maneras de elegir 'n' elementos de un conjunto de 'n', donde el orden importa."
        ],
        correct: 2
    },
    {
        question: "¿Qué representa la expresión Pk​(n) en el contexto de las permutaciones con repetición?",
        options: [
            "El número de formas de elegir 'k' elementos de un conjunto de 'n' elementos con repetición, donde el orden no importa.",
            "El número de permutaciones con elementos idénticos.",
            "El número de permutaciones de 'n' elementos de un conjunto de 'k' elementos.",
            "El número de arreglos ordenados de 'k' elementos tomados de un conjunto de 'n' elementos, donde la repetición está permitida."
        ],
        correct: 3
    },
    {
        question: "¿Cómo se define conceptualmente el **Principio de la Multiplicación**?",
        options: [
            "Como el producto de las opciones de una secuencia de eventos que ocurren de forma consecutiva o conjunta.",
            "Como la suma de las opciones de eventos que no pueden ocurrir al mismo tiempo.",
            "Como un método para encontrar la probabilidad de un evento.",
            "Como una manera de encontrar las permutaciones de un conjunto de elementos."
        ],
        correct: 0
    },
    {
        question: "Una **permutación circular** se diferencia de una lineal porque:",
        options: [
            "El punto de partida o de referencia no importa, lo que reduce las posibles ordenaciones.",
            "Se utiliza una fórmula diferente que no incluye factoriales.",
            "El número de permutaciones es mayor en la forma circular.",
            "En las circulares, se permite la repetición de elementos."
        ],
        correct: 0
    },
    {
        question: "¿Qué es la 'selección con reemplazo' en un problema de conteo?",
        options: [
            "Una selección donde se extraen todos los elementos del conjunto.",
            "Una vez que un elemento es seleccionado, no puede ser seleccionado de nuevo.",
            "Una selección donde el orden de los elementos no importa.",
            "El elemento seleccionado se devuelve al conjunto original antes de la siguiente selección."
        ],
        correct: 3
    },
    {
        question: "¿De cuántas maneras se puede elegir un equipo de 3 jugadores de un total de 10, si hay un capitán predeterminado?",
        options: ["C(10,3)", "P(9,2)", "C(9,2)", "P(10,3)"],
        correct: 2
    }
];

// Estado del juego
let gameState = {
    board: Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)),
    players: [
        { id: 1, score: 0, rack: [] },
        { id: 2, score: 0, rack: [] }
    ],
    currentPlayer: 0,
    letterBag: [],
    gameStarted: false,
    selectedTiles: [],
    firstMove: true,
    exchangeMode: false,
    tilesToExchange: [],
    turnCount: 1,
    confirmedTiles: [], // Fichas confirmadas que no se pueden mover
    roundCount: 0, // Contador de rondas completas
    questionMode: false, // Modo pregunta activo
    usedQuestions: [], // Preguntas ya utilizadas
    questionQueue: [], // Cola de jugadores que deben responder preguntas
    currentQuestionPlayer: null, // Jugador actual respondiendo pregunta
    selectedCategory: null // Categoría de preguntas seleccionada
};

// Funcionalidad para el modal de instrucciones
document.addEventListener('DOMContentLoaded', function() {
    const instructionsBtn = document.getElementById('instructions-btn');
    const instructionsModal = document.getElementById('instructions-modal');
    const closeInstructionsBtn = document.getElementById('close-instructions-btn');
    const mobileHelp = document.getElementById('mobile-help');

    // Detectar si es un dispositivo móvil
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= GAME_CONFIG.UI.MOBILE_BREAKPOINT);
    }

    // Mostrar/ocultar mensaje de ayuda móvil
    if (mobileHelp) {
        if (isMobileDevice()) {
            mobileHelp.style.display = 'block';
        } else {
            mobileHelp.style.display = 'none';
        }
    }

    // Abrir modal de instrucciones
    instructionsBtn.addEventListener('click', function() {
        instructionsModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    });

    // Cerrar modal de instrucciones
    closeInstructionsBtn.addEventListener('click', function() {
        instructionsModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    });

    // Cerrar modal al hacer clic fuera de él
    instructionsModal.addEventListener('click', function(event) {
        if (event.target === instructionsModal) {
            instructionsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && instructionsModal.style.display === 'block') {
            instructionsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Debug: verificar que los eventos táctiles estén disponibles
    console.log('Touch events disponibles:', 'ontouchstart' in window);
    console.log('User agent:', navigator.userAgent);
    
    // Verificar que las fichas tengan eventos táctiles después de un tiempo
    setTimeout(() => {
        const tiles = document.querySelectorAll('.tile');
        console.log('Fichas encontradas:', tiles.length);
        tiles.forEach((tile, index) => {
            console.log(`Ficha ${index}:`, tile.dataset.index, 'touchstart:', tile.ontouchstart !== undefined);
        });
    }, GAME_CONFIG.UI.ANIMATION_DURATION * 2);
}); 