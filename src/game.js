// Elementos DOM
const boardElement = document.getElementById('scrabble-board');
const rackElement = document.getElementById('player-rack');
const playButton = document.getElementById('play-btn');
const passButton = document.getElementById('pass-btn');
const exchangeButton = document.getElementById('exchange-btn');
const newGameButton = document.getElementById('new-game-btn');
const confirmExchangeButton = document.getElementById('confirm-exchange-btn');
const cancelExchangeButton = document.getElementById('cancel-exchange-btn');
const exchangeControls = document.getElementById('exchange-controls');
const messageElement = document.getElementById('message');
const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');
const remainingTilesElement = document.getElementById('remaining-tiles');
const currentRoundElement = document.getElementById('current-round');
const firstMoveElement = document.getElementById('first-move');
const legendToggle = document.getElementById('legend-toggle');
const legendElement = document.getElementById('legend');

// Elementos del modal de preguntas
const questionModal = document.getElementById('question-modal');
const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const questionOptions = document.getElementById('question-options');
const questionResult = document.getElementById('question-result');
const questionContinue = document.getElementById('question-continue');

// Elementos del modal de victoria
const victoryModal = document.getElementById('victory-modal');
const victoryTitle = document.getElementById('victory-title');
const victoryText = document.getElementById('victory-text');
const victoryRestartBtn = document.getElementById('victory-restart-btn');

// Inicializar el juego
showCategorySelection();

// Toggle de la leyenda
legendToggle.addEventListener('click', () => {
    legendElement.classList.toggle('show');
    legendToggle.classList.toggle('active');
    
    if (legendElement.classList.contains('show')) {
        legendToggle.title = 'Ocultar Leyenda';
    } else {
        legendToggle.title = 'Mostrar Leyenda';
    }
});

// Event listener para continuar después de la pregunta
questionContinue.addEventListener('click', () => {
    questionModal.classList.remove('show');
    questionResult.classList.add('hidden');
    questionContinue.classList.add('hidden');
    
    // Verificar si hay más jugadores en la cola de preguntas
    if (gameState.questionQueue.length > 0) {
        // Mostrar pregunta para el siguiente jugador
        const nextPlayer = gameState.questionQueue.shift();
        showQuestion(nextPlayer);
    } else {
        // No hay más preguntas, continuar con el turno normal
        gameState.questionMode = false;
        gameState.currentQuestionPlayer = null;
        
        // Después de las preguntas, el turno pasa al Jugador 1
        gameState.currentPlayer = 0;
        
        // Actualizar interfaz
        updateRack();
        updateScores();
        updateGameInfo();
        setActivePlayer();
        updateBoard();
        
        // Ocultar mensaje después de un tiempo
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 3000);
    }
});

// Event listener para el botón de reiniciar juego desde el modal de victoria
victoryRestartBtn.addEventListener('click', () => {
    victoryModal.classList.remove('show');
    resetGame();
});

function initializeGame() {
    createBoard();
    initializeLetterBag();
    distributeTiles();
    updateRack();
    updateScores();
    updateGameInfo();
    setActivePlayer();
    
    // Asegurar que los controles de intercambio estén ocultos al inicio
    const exchangeControls = document.getElementById('exchange-controls');
    if (exchangeControls) {
        exchangeControls.classList.add('hidden');
        exchangeControls.style.display = 'none';
        exchangeControls.style.visibility = 'hidden';
    }
    
    gameState.gameStarted = true;
}

function createBoard() {
    // Definir casillas especiales
    const specialCells = {
        // Triple palabra
        '0,0': 'triple-word', '0,7': 'triple-word', '0,14': 'triple-word',
        '7,0': 'triple-word', '7,14': 'triple-word',
        '14,0': 'triple-word', '14,7': 'triple-word', '14,14': 'triple-word',
        
        // Doble palabra
        '1,1': 'double-word', '2,2': 'double-word', '3,3': 'double-word', '4,4': 'double-word',
        '10,10': 'double-word', '11,11': 'double-word', '12,12': 'double-word', '13,13': 'double-word',
        '13,1': 'double-word', '12,2': 'double-word', '11,3': 'double-word', '10,4': 'double-word',
        '4,10': 'double-word', '3,11': 'double-word', '2,12': 'double-word', '1,13': 'double-word',
        
        // Triple letra
        '1,5': 'triple-letter', '1,9': 'triple-letter',
        '5,1': 'triple-letter', '5,5': 'triple-letter', '5,9': 'triple-letter', '5,13': 'triple-letter',
        '9,1': 'triple-letter', '9,5': 'triple-letter', '9,9': 'triple-letter', '9,13': 'triple-letter',
        '13,5': 'triple-letter', '13,9': 'triple-letter',
        
        // Doble letra
        '0,3': 'double-letter', '0,11': 'double-letter',
        '2,6': 'double-letter', '2,8': 'double-letter',
        '3,0': 'double-letter', '3,7': 'double-letter', '3,14': 'double-letter',
        '6,2': 'double-letter', '6,6': 'double-letter', '6,8': 'double-letter', '6,12': 'double-letter',
        '7,3': 'double-letter', '7,11': 'double-letter',
        '8,2': 'double-letter', '8,6': 'double-letter', '8,8': 'double-letter', '8,12': 'double-letter',
        '11,0': 'double-letter', '11,7': 'double-letter', '11,14': 'double-letter',
        '12,6': 'double-letter', '12,8': 'double-letter',
        '14,3': 'double-letter', '14,11': 'double-letter',
        
        // Centro
        '7,7': 'center'
    };
    
    // Crear el tablero
    boardElement.innerHTML = '';
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            const coord = `${row},${col}`;
            if (specialCells[coord]) {
                cell.classList.add(specialCells[coord]);
                
                // Añadir texto indicativo
                if (specialCells[coord] === 'triple-word') {
                    cell.textContent = 'P3';
                } else if (specialCells[coord] === 'double-word') {
                    cell.textContent = 'P2';
                } else if (specialCells[coord] === 'triple-letter') {
                    cell.textContent = 'L3';
                } else if (specialCells[coord] === 'double-letter') {
                    cell.textContent = 'L2';
                } else if (specialCells[coord] === 'center') {
                    cell.textContent = '★';
                }
            }
            
            // Hacer las celdas receptores de fichas
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('drop', handleDrop);
            
            boardElement.appendChild(cell);
        }
    }
}

function initializeLetterBag() {
    gameState.letterBag = [];
    
    for (const [letter, data] of Object.entries(LETTER_DISTRIBUTION)) {
        for (let i = 0; i < data.count; i++) {
            gameState.letterBag.push({
                letter: letter,
                value: data.value
            });
        }
    }
    
    // Barajar las fichas
    shuffleArray(gameState.letterBag);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function distributeTiles() {
    // Repartir fichas a ambos jugadores
    for (let i = 0; i < gameState.players.length; i++) {
        gameState.players[i].rack = [];
        for (let j = 0; j < RACK_SIZE; j++) {
            if (gameState.letterBag.length > 0) {
                gameState.players[i].rack.push(gameState.letterBag.pop());
            }
        }
    }
}

function updateRack() {
    rackElement.innerHTML = '';
    const currentPlayerRack = gameState.players[gameState.currentPlayer].rack;
    
    currentPlayerRack.forEach((tile, index) => {
        const tileElement = createTileElement(tile, index);
        rackElement.appendChild(tileElement);
    });
    
    // Hacer el rack receptor de drop para devolver fichas
    rackElement.addEventListener('dragover', handleDragOver);
    rackElement.addEventListener('drop', handleDrop);
}

function createTileElement(tile, index) {
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    tileElement.textContent = tile.letter === '' ? '?' : tile.letter;
    tileElement.draggable = !gameState.exchangeMode;
    tileElement.dataset.index = index;
    
    const valueElement = document.createElement('div');
    valueElement.className = 'tile-value';
    valueElement.textContent = tile.value;
    tileElement.appendChild(valueElement);
    
    // Marcar si está seleccionado para intercambio
    if (gameState.tilesToExchange.includes(index)) {
        tileElement.classList.add('selected');
    }
    
    if (gameState.exchangeMode) {
        tileElement.addEventListener('click', () => handleTileSelection(index));
    } else {
        // Eventos de arrastre para escritorio
        tileElement.addEventListener('dragstart', handleDragStart);
        tileElement.addEventListener('dragend', handleDragEnd);
        
        // Eventos táctiles para móviles
        tileElement.addEventListener('touchstart', handleTouchStart);
        tileElement.addEventListener('touchmove', handleTouchMove);
        tileElement.addEventListener('touchend', handleTouchEnd);
        
        // Eventos de clic como fallback para móviles
        tileElement.addEventListener('click', (e) => handleTileClick(e, index));
    }
    
    return tileElement;
}

function handleTileSelection(index) {
    const currentPlayerRack = gameState.players[gameState.currentPlayer].rack;
    
    if (gameState.tilesToExchange.includes(index)) {
        // Deseleccionar
        gameState.tilesToExchange = gameState.tilesToExchange.filter(i => i !== index);
    } else {
        // Seleccionar
        gameState.tilesToExchange.push(index);
    }
    
    updateRack();
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

// Variables para el sistema táctil
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let currentTouchTile = null;
let touchOffsetX = 0;
let touchOffsetY = 0;

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
    currentTouchTile = e.target;
    
    console.log('Touch start en ficha:', currentTouchTile.dataset.index, 'en posición:', touchStartX, touchStartY);
    
    // Calcular offset desde el centro de la ficha
    const rect = currentTouchTile.getBoundingClientRect();
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;
    
    currentTouchTile.classList.add('dragging');
    currentTouchTile.style.zIndex = '1000';
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!currentTouchTile) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    
    // Solo mover si el desplazamiento es significativo
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        currentTouchTile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        console.log('Touch move:', deltaX, deltaY);
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (!currentTouchTile) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const touchDuration = Date.now() - touchStartTime;
    
    // Resetear transformación
    currentTouchTile.style.transform = '';
    currentTouchTile.style.zIndex = '';
    currentTouchTile.classList.remove('dragging');
    
    // Si fue un toque corto y sin movimiento, no hacer nada
    if (touchDuration < 200 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        return;
    }
    
    // Buscar el elemento objetivo usando las coordenadas del toque
    let targetElement = null;
    
    // Primero intentar con elementFromPoint
    try {
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        if (elementBelow) {
            targetElement = elementBelow.closest('.cell') || elementBelow.closest('.rack');
        }
    } catch (error) {
        console.log('elementFromPoint falló, usando método alternativo');
    }
    
    // Si elementFromPoint falló, usar búsqueda manual
    if (!targetElement) {
        const touchX = touch.clientX;
        const touchY = touch.clientY;
        
        // Buscar celdas del tablero
        const cells = document.querySelectorAll('.cell');
        for (let cell of cells) {
            const rect = cell.getBoundingClientRect();
            if (touchX >= rect.left && touchX <= rect.right && 
                touchY >= rect.top && touchY <= rect.bottom) {
                targetElement = cell;
                break;
            }
        }
        
        // Si no se encontró celda, buscar rack
        if (!targetElement) {
            const rack = document.querySelector('.rack');
            if (rack) {
                const rect = rack.getBoundingClientRect();
                if (touchX >= rect.left && touchX <= rect.right && 
                    touchY >= rect.top && touchY <= rect.bottom) {
                    targetElement = rack;
                }
            }
        }
    }
    
    if (targetElement) {
        // Simular un drop
        const tileIndex = currentTouchTile.dataset.index;
        const fakeEvent = {
            target: targetElement,
            preventDefault: () => {},
            dataTransfer: {
                getData: () => tileIndex
            }
        };
        
        console.log('Drop simulado:', tileIndex, 'en', targetElement.className);
        handleDrop(fakeEvent);
    } else {
        console.log('No se encontró objetivo para el drop');
    }
    
    currentTouchTile = null;
}

// Función de fallback para clics en móviles
function handleTileClick(e, tileIndex) {
    // Solo procesar si no estamos en modo intercambio y es un dispositivo móvil
    if (gameState.exchangeMode || !('ontouchstart' in window)) {
        return;
    }
    
    console.log('Clic en ficha móvil:', tileIndex);
    
    // Crear un indicador visual de selección
    const tile = e.target;
    tile.classList.add('selected');
    
    // Mostrar mensaje de ayuda
    showMessage('Toca una celda del tablero para colocar la ficha', 'success');
    
    // Agregar listener temporal para el siguiente clic en el tablero
    const handleBoardClick = (boardEvent) => {
        const targetCell = boardEvent.target.closest('.cell');
        if (targetCell) {
            // Simular drop
            const fakeEvent = {
                target: targetCell,
                preventDefault: () => {},
                dataTransfer: {
                    getData: () => tileIndex
                }
            };
            
            console.log('Drop simulado por clic:', tileIndex, 'en celda');
            handleDrop(fakeEvent);
            
            // Limpiar
            tile.classList.remove('selected');
            document.removeEventListener('click', handleBoardClick);
            return;
        }
        
        // Si se hace clic en el rack, devolver la ficha
        const targetRack = boardEvent.target.closest('.rack');
        if (targetRack) {
            const fakeEvent = {
                target: targetRack,
                preventDefault: () => {},
                dataTransfer: {
                    getData: () => tileIndex
                }
            };
            
            console.log('Devolución simulado por clic:', tileIndex, 'al rack');
            handleDrop(fakeEvent);
            
            // Limpiar
            tile.classList.remove('selected');
            document.removeEventListener('click', handleBoardClick);
            return;
        }
    };
    
    // Agregar listener temporal
    document.addEventListener('click', handleBoardClick);
    
    // Remover listener después de 5 segundos si no se usó
    setTimeout(() => {
        tile.classList.remove('selected');
        document.removeEventListener('click', handleBoardClick);
        showMessage('Selección de ficha cancelada', 'error');
    }, 5000);
}

function handleBoardTileDragStart(e) {
    e.dataTransfer.setData('text/plain', `board:${e.target.dataset.row}:${e.target.dataset.col}`);
    e.target.classList.add('dragging');
}

function handleBoardTileDragEnd(e) {
    e.target.classList.remove('dragging');
}

// Variables para el sistema táctil del tablero
let boardTouchStartX = 0;
let boardTouchStartY = 0;
let boardTouchStartTime = 0;
let currentBoardTouchTile = null;
let boardTouchSourceRow = 0;
let boardTouchSourceCol = 0;

function handleBoardTileTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    boardTouchStartX = touch.clientX;
    boardTouchStartY = touch.clientY;
    boardTouchStartTime = Date.now();
    currentBoardTouchTile = e.target;
    
    // Obtener la posición de la ficha en el tablero
    boardTouchSourceRow = parseInt(currentBoardTouchTile.dataset.row);
    boardTouchSourceCol = parseInt(currentBoardTouchTile.dataset.col);
    
    currentBoardTouchTile.classList.add('dragging');
    currentBoardTouchTile.style.zIndex = '1000';
}

function handleBoardTileTouchMove(e) {
    e.preventDefault();
    if (!currentBoardTouchTile) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - boardTouchStartX;
    const deltaY = touch.clientY - boardTouchStartY;
    
    // Solo mover si el desplazamiento es significativo
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        currentBoardTouchTile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
}

function handleBoardTileTouchEnd(e) {
    e.preventDefault();
    if (!currentBoardTouchTile) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - boardTouchStartX;
    const deltaY = touch.clientY - boardTouchStartY;
    const touchDuration = Date.now() - boardTouchStartTime;
    
    // Resetear transformación
    currentBoardTouchTile.style.transform = '';
    currentBoardTouchTile.style.zIndex = '';
    currentBoardTouchTile.classList.remove('dragging');
    
    // Si fue un toque corto y sin movimiento, no hacer nada
    if (touchDuration < 200 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        return;
    }
    
    // Buscar el elemento objetivo usando las coordenadas del toque
    let targetElement = null;
    
    // Primero intentar con elementFromPoint
    try {
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        if (elementBelow) {
            targetElement = elementBelow.closest('.cell') || elementBelow.closest('.rack');
        }
    } catch (error) {
        console.log('elementFromPoint falló para ficha del tablero, usando método alternativo');
    }
    
    // Si elementFromPoint falló, usar búsqueda manual
    if (!targetElement) {
        const touchX = touch.clientX;
        const touchY = touch.clientY;
        
        // Buscar celdas del tablero
        const cells = document.querySelectorAll('.cell');
        for (let cell of cells) {
            const rect = cell.getBoundingClientRect();
            if (touchX >= rect.left && touchX <= rect.right && 
                touchY >= rect.top && touchY <= rect.bottom) {
                targetElement = cell;
                break;
            }
        }
        
        // Si no se encontró celda, buscar rack
        if (!targetElement) {
            const rack = document.querySelector('.rack');
            if (rack) {
                const rect = rack.getBoundingClientRect();
                if (touchX >= rect.left && touchX <= rect.right && 
                    touchY >= rect.top && touchY <= rect.bottom) {
                    targetElement = rack;
                }
            }
        }
    }
    
    if (targetElement) {
        // Simular un drop de ficha del tablero
        const fakeEvent = {
            target: targetElement,
            preventDefault: () => {},
            dataTransfer: {
                getData: () => `board:${boardTouchSourceRow}:${boardTouchSourceCol}`
            }
        };
        
        console.log('Drop simulado de ficha del tablero:', `board:${boardTouchSourceRow}:${boardTouchSourceCol}`, 'en', targetElement.className);
        handleDrop(fakeEvent);
    } else {
        console.log('No se encontró objetivo para el drop de ficha del tablero');
    }
    
    currentBoardTouchTile = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const cell = e.target.closest('.cell');
    const rack = e.target.closest('.rack');
    
    if (data.startsWith('board:')) {
        // Moviendo ficha del tablero
        const [, sourceRow, sourceCol] = data.split(':');
        const sourceTile = gameState.board[sourceRow][sourceCol];
        
        if (rack) {
            // Devolviendo ficha al rack
            if (sourceTile.player !== gameState.currentPlayer) {
                showMessage('Solo puedes devolver tus propias fichas', 'error');
                return;
            }
            
            // Verificar que la ficha no está confirmada
            const isConfirmed = gameState.confirmedTiles.some(confirmed => 
                confirmed.row === parseInt(sourceRow) && confirmed.col === parseInt(sourceCol)
            );
            
            if (isConfirmed) {
                showMessage('No puedes devolver fichas confirmadas', 'error');
                return;
            }
            
            // Verificar que hay espacio en el rack
            const currentPlayerRack = gameState.players[gameState.currentPlayer].rack;
            if (currentPlayerRack.length >= RACK_SIZE) {
                showMessage('Tu rack está lleno, no puedes devolver más fichas', 'error');
                return;
            }
            
            // Remover la ficha del tablero
            gameState.board[sourceRow][sourceCol] = null;
            
            // Remover de las fichas seleccionadas si está ahí
            gameState.selectedTiles = gameState.selectedTiles.filter(t => 
                !(t.row === parseInt(sourceRow) && t.col === parseInt(sourceCol))
            );
            
            // Agregar la ficha al rack del jugador
            currentPlayerRack.push({
                letter: sourceTile.letter,
                value: sourceTile.value
            });
            
            // Actualizar la visualización
            updateBoard();
            updateRack();
            
            showMessage(`Ficha "${sourceTile.letter}" devuelta al rack`, 'success');
        } else if (cell) {
            // Moviendo ficha a otra posición del tablero
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            // Verificar si la celda está ocupada
            if (gameState.board[row][col] !== null) return;
            
            // Mover la ficha a la nueva posición
            gameState.board[row][col] = sourceTile;
            gameState.board[sourceRow][sourceCol] = null;
            
            // Actualizar la visualización
            updateBoard();
        }
    } else if (cell) {
        // Colocando ficha del rack
        const tileIndex = data;
        const currentPlayerRack = gameState.players[gameState.currentPlayer].rack;
        const tile = currentPlayerRack[tileIndex];
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        // Verificar si la celda está ocupada
        if (gameState.board[row][col] !== null) return;
        
        // Colocar la ficha en el tablero
        gameState.board[row][col] = {
            letter: tile.letter,
            value: tile.value,
            player: gameState.currentPlayer
        };
        
        // Añadir a las fichas seleccionadas en este turno
        gameState.selectedTiles.push({ row, col, tileIndex });
        
        // Remover la ficha del rack
        currentPlayerRack.splice(tileIndex, 1);
        
        // Actualizar la visualización
        updateBoard();
        updateRack();
    }
}

function updateBoard() {
    const cells = boardElement.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const tile = gameState.board[row][col];
        
        // Limpiar la celda
        cell.innerHTML = '';
        
        // Restaurar clases especiales
        const specialCells = ['center', 'double-letter', 'triple-letter', 'double-word', 'triple-word'];
        specialCells.forEach(cls => {
            if (cell.classList.contains(cls)) {
                cell.textContent = cls === 'center' ? '★' : 
                                cls === 'double-word' ? 'P2' :
                                cls === 'triple-word' ? 'P3' :
                                cls === 'double-letter' ? 'L2' : 'L3';
            }
        });
        
        // Si hay una ficha, mostrarla
        if (tile) {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile on-board';
            tileElement.textContent = tile.letter === '' ? '?' : tile.letter;
            tileElement.dataset.row = row;
            tileElement.dataset.col = col;
            
            const valueElement = document.createElement('div');
            valueElement.className = 'tile-value';
            valueElement.textContent = tile.value;
            tileElement.appendChild(valueElement);
            
            // Verificar si la ficha está confirmada (no se puede mover)
            const isConfirmed = gameState.confirmedTiles.some(confirmed => 
                confirmed.row === row && confirmed.col === col
            );
            
            if (!isConfirmed) {
                // Solo hacer arrastrables las fichas no confirmadas
                tileElement.draggable = true;
                tileElement.addEventListener('dragstart', handleBoardTileDragStart);
                tileElement.addEventListener('dragend', handleBoardTileDragEnd);
                
                // Eventos táctiles para móviles
                tileElement.addEventListener('touchstart', handleBoardTileTouchStart);
                tileElement.addEventListener('touchmove', handleBoardTileTouchMove);
                tileElement.addEventListener('touchend', handleBoardTileTouchEnd);
            } else {
                // Fichas confirmadas no son arrastrables
                tileElement.draggable = false;
                tileElement.style.cursor = 'default';
            }
            
            cell.appendChild(tileElement);
        }
    });
}

function updateScores() {
    player1Element.querySelector('.score').textContent = `${gameState.players[0].score} puntos`;
    player2Element.querySelector('.score').textContent = `${gameState.players[1].score} puntos`;
}

function updateGameInfo() {
    remainingTilesElement.textContent = gameState.letterBag.length;
    currentRoundElement.textContent = gameState.roundCount + 1;
    firstMoveElement.textContent = gameState.firstMove ? 'Sí' : 'No';
}

function setActivePlayer() {
    if (gameState.currentPlayer === 0) {
        player1Element.classList.add('active');
        player2Element.classList.remove('active');
    } else {
        player1Element.classList.remove('active');
        player2Element.classList.add('active');
    }
}

function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    messageElement.classList.remove('hidden');
}

// Función para obtener una pregunta aleatoria no utilizada
function getRandomQuestion() {
    // Obtener las preguntas de la categoría seleccionada
    const selectedCategory = gameState.selectedCategory;
    if (!selectedCategory || !window.QUESTION_CATEGORIES[selectedCategory]) {
        // Si no hay categoría seleccionada, usar las preguntas por defecto
        const availableQuestions = QUESTIONS.filter((_, index) => !gameState.usedQuestions.includes(index));
        
        if (availableQuestions.length === 0) {
            // Si se han usado todas las preguntas, resetear
            gameState.usedQuestions = [];
            return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        }
        
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const questionIndex = QUESTIONS.indexOf(availableQuestions[randomIndex]);
        gameState.usedQuestions.push(questionIndex);
        
        return availableQuestions[randomIndex];
    }
    
    // Usar las preguntas de la categoría seleccionada
    const categoryQuestions = window.QUESTION_CATEGORIES[selectedCategory].questions;
    const availableQuestions = categoryQuestions.filter((_, index) => !gameState.usedQuestions.includes(index));
    
    if (availableQuestions.length === 0) {
        // Si se han usado todas las preguntas de la categoría, resetear
        gameState.usedQuestions = [];
        return categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = categoryQuestions.indexOf(availableQuestions[randomIndex]);
    gameState.usedQuestions.push(questionIndex);
    
    return availableQuestions[randomIndex];
}

// Función para mostrar una pregunta
function showQuestion(playerIndex) {
    const question = getRandomQuestion();
    const playerName = `Jugador ${playerIndex + 1}`;
    
    questionTitle.textContent = `Pregunta para ${playerName}`;
    questionText.textContent = question.question;
    
    // Limpiar opciones anteriores
    questionOptions.innerHTML = '';
    
    // Crear opciones
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'question-option';
        optionElement.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => handleQuestionAnswer(index, question.correct, playerIndex));
        
        questionOptions.appendChild(optionElement);
    });
    
    // Mostrar modal
    questionModal.classList.add('show');
    gameState.questionMode = true;
    gameState.currentQuestionPlayer = playerIndex;
}

// Función para manejar la respuesta de la pregunta
function handleQuestionAnswer(selectedIndex, correctIndex, playerIndex) {
    const options = questionOptions.querySelectorAll('.question-option');
    
    // Deshabilitar todas las opciones
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Marcar la respuesta correcta
    options[correctIndex].classList.add('correct');
    
    // Marcar la respuesta seleccionada si es incorrecta
    if (selectedIndex !== correctIndex) {
        options[selectedIndex].classList.add('incorrect');
    }
    
    // Mostrar resultado
    if (selectedIndex === correctIndex) {
        questionResult.textContent = '¡Correcto! +10 puntos';
        questionResult.className = 'question-result correct';
        gameState.players[playerIndex].score += 10;
        updateScores();
        
        // Verificar si el jugador ha ganado después de recibir puntos
        const winnerIndex = checkForVictory();
        if (winnerIndex !== null) {
            // Si hay un ganador, mostrar el modal de victoria después de un breve delay
            setTimeout(() => {
                questionModal.classList.remove('show');
                questionResult.classList.add('hidden');
                questionContinue.classList.add('hidden');
                showVictoryModal(winnerIndex);
            }, 2000);
            return;
        }
    } else {
        questionResult.textContent = 'Incorrecto. La respuesta correcta está marcada en verde.';
        questionResult.className = 'question-result incorrect';
    }
    
    questionResult.classList.remove('hidden');
    questionContinue.classList.remove('hidden');
}

// Función para verificar si es momento de mostrar preguntas
function checkForQuestions() {
    // Una ronda se completa cuando ambos jugadores han jugado
    if (gameState.currentPlayer === 0 && gameState.turnCount > 1) {
        // Mostrar preguntas cada 2 rondas
        if (gameState.roundCount % 2 === 0) {
            return true;
        }
    }
    return false;
}

// Función para verificar si un jugador ha ganado (llegado a 100 puntos)
function checkForVictory() {
    for (let i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].score >= 100) {
            return i;
        }
    }
    return null;
}

// Función para mostrar el modal de victoria
function showVictoryModal(winnerIndex) {
    const winnerName = `Jugador ${winnerIndex + 1}`;
    const winnerScore = gameState.players[winnerIndex].score;
    
    victoryTitle.textContent = `¡Felicitaciones, ${winnerName}!`;
    victoryText.textContent = `Has ganado el juego con ${winnerScore} puntos. ¡Excelente trabajo!`;
    
    victoryModal.classList.add('show');
}

// Función para mostrar la selección de categorías
function showCategorySelection() {
    const categoryModal = document.getElementById('category-modal');
    categoryModal.classList.add('show');
}

// Función para manejar la selección de categoría
function selectCategory(categoryKey) {
    gameState.selectedCategory = categoryKey;
    
    // Ocultar modal de categorías
    const categoryModal = document.getElementById('category-modal');
    categoryModal.classList.remove('show');
    
    // Inicializar el juego con la categoría seleccionada
    initializeGame();
}

// Event listeners para las opciones de categoría
document.addEventListener('DOMContentLoaded', function() {
    const categoryOptions = document.querySelectorAll('.category-option');
    
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            selectCategory(category);
        });
    });
});