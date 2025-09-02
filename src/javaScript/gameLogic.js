// Validar y jugar palabra
playButton.addEventListener('click', () => {
    if (gameState.exchangeMode) {
        showMessage('Termina el modo de cambio de fichas primero', 'error');
        return;
    }
    
    if (gameState.selectedTiles.length === 0) {
        showMessage('Debes colocar al menos una ficha', 'error');
        return;
    }
    
    // Verificar que todas las fichas están en la misma fila o columna
    const rows = new Set(gameState.selectedTiles.map(t => t.row));
    const cols = new Set(gameState.selectedTiles.map(t => t.col));
    
    let isValidPlacement = false;
    let direction = '';
    
    if (rows.size === 1 && cols.size > 1) {
        // Todas en la misma fila (palabra horizontal)
        isValidPlacement = true;
        direction = 'horizontal';
    } else if (cols.size === 1 && rows.size > 1) {
        // Todas en la misma columna (palabra vertical)
        isValidPlacement = true;
        direction = 'vertical';
    } else if (rows.size === 1 && cols.size === 1) {
        // Solo una ficha - buscar palabras adyacentes
        isValidPlacement = checkSingleTilePlacement(
            gameState.selectedTiles[0].row, 
            gameState.selectedTiles[0].col
        );
        direction = 'single';
    } else {
        showMessage('Las fichas deben estar en la misma fila o columna', 'error');
        return;
    }
    
    if (!isValidPlacement && gameState.firstMove) {
        // Para el primer movimiento, debe pasar por el centro
        const centerRow = Math.floor(BOARD_SIZE / 2);
        const centerCol = Math.floor(BOARD_SIZE / 2);
        
        let passesThroughCenter = false;
        for (const tile of gameState.selectedTiles) {
            if (tile.row === centerRow && tile.col === centerCol) {
                passesThroughCenter = true;
                break;
            }
        }
        
        if (!passesThroughCenter) {
            showMessage('La primera palabra debe pasar por el centro', 'error');
            return;
        }
        
        isValidPlacement = true;
    }
    
    if (isValidPlacement) {
        // Calcular puntuación
        const score = calculateScore(gameState.selectedTiles, direction);
        gameState.players[gameState.currentPlayer].score += score;
        
        // Marcar las fichas colocadas como confirmadas
        for (const tile of gameState.selectedTiles) {
            gameState.confirmedTiles.push({
                row: tile.row,
                col: tile.col,
                player: gameState.currentPlayer
            });
        }
        
        showMessage(`¡Palabra válida! +${score} puntos`, 'success');
        
        // Reponer fichas
        replenishTiles();
        
        // Pasar al siguiente jugador
        nextTurn();
    } else {
        showMessage('Colocación inválida - la palabra debe conectar con fichas existentes', 'error');
    }
});

function checkSingleTilePlacement(row, col) {
    // Verificar si la ficha está adyacente a alguna existente
    const adjacentPositions = [
        [row-1, col], [row+1, col], [row, col-1], [row, col+1]
    ];
    
    for (const [r, c] of adjacentPositions) {
        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
            if (gameState.board[r][c] !== null) {
                return true;
            }
        }
    }
    
    return false;
}

function calculateScore(selectedTiles, direction) {
    let totalScore = 0;
    let wordMultiplier = 1;
    
    // Para cada ficha colocada, calcular su contribución
    for (const tile of selectedTiles) {
        const cell = boardElement.querySelector(`.cell[data-row="${tile.row}"][data-col="${tile.col}"]`);
        let letterMultiplier = 1;
        
        // Verificar multiplicadores de letra
        if (cell.classList.contains('double-letter')) {
            letterMultiplier = 2;
        } else if (cell.classList.contains('triple-letter')) {
            letterMultiplier = 3;
        }
        
        // Verificar multiplicadores de palabra
        if (cell.classList.contains('double-word')) {
            wordMultiplier *= 2;
        } else if (cell.classList.contains('triple-word')) {
            wordMultiplier *= 3;
        }
        
        const tileValue = gameState.board[tile.row][tile.col].value;
        totalScore += tileValue * letterMultiplier;
    }
    
    // Aplicar multiplicador de palabra
    totalScore *= wordMultiplier;
    
    // Bono por usar todas las fichas (Scrabble)
    if (selectedTiles.length === RACK_SIZE) {
        totalScore += 50;
    }
    
    return totalScore;
}

function replenishTiles() {
    const currentPlayerRack = gameState.players[gameState.currentPlayer].rack;
    const tilesToDraw = RACK_SIZE - currentPlayerRack.length;
    
    for (let i = 0; i < tilesToDraw; i++) {
        if (gameState.letterBag.length > 0) {
            currentPlayerRack.push(gameState.letterBag.pop());
        }
    }
}

function nextTurn() {
    // Verificar si hay un ganador antes de continuar
    const winnerIndex = checkForVictory();
    if (winnerIndex !== null) {
        showVictoryModal(winnerIndex);
        return; // No continuar con el turno si hay un ganador
    }
    
    // Reiniciar selección de fichas
    gameState.selectedTiles = [];
    
    // Cambiar jugador
    gameState.currentPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
    gameState.firstMove = false;
    gameState.turnCount++;
    
    // Incrementar contador de rondas cuando vuelve al jugador 1
    if (gameState.currentPlayer === 0 && gameState.turnCount > 1) {
        gameState.roundCount++;
    }
    
    // Verificar si es momento de mostrar preguntas
    if (checkForQuestions()) {
        // Agregar ambos jugadores a la cola de preguntas
        gameState.questionQueue = [0, 1]; // Jugador 1 y Jugador 2
        gameState.questionMode = true;
        
        // Mostrar pregunta para el primer jugador en la cola
        const firstPlayer = gameState.questionQueue.shift();
        showQuestion(firstPlayer);
        return; // No continuar con el turno normal
    }
    
    // Actualizar interfaz
    updateRack();
    updateScores();
    updateGameInfo();
    setActivePlayer();
    updateBoard(); // Actualizar el tablero para reflejar fichas confirmadas
    
    // Ocultar mensaje después de un tiempo
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, GAME_CONFIG.UI.MESSAGE_DISPLAY_TIME);
}

// Pasar turno
passButton.addEventListener('click', () => {
    if (gameState.exchangeMode) {
        showMessage('Termina el modo de cambio de fichas primero', 'error');
        return;
    }
    
    // Devolver las fichas seleccionadas al rack
    const currentPlayerRack = gameState.players[gameState.currentPlayer].rack;
    
    for (const selectedTile of gameState.selectedTiles) {
        const tile = gameState.board[selectedTile.row][selectedTile.col];
        currentPlayerRack.splice(selectedTile.tileIndex, 0, tile);
        gameState.board[selectedTile.row][selectedTile.col] = null;
    }
    
    gameState.selectedTiles = [];
    
    updateBoard();
    updateRack();
    
    // Pasar al siguiente jugador
    nextTurn();
    showMessage('Turno pasado', 'success');
});

// Cambiar fichas - activar modo selección
exchangeButton.addEventListener('click', () => {
    if (gameState.selectedTiles.length > 0) {
        showMessage('Primero confirma o cancela las fichas en el tablero', 'error');
        return;
    }
    
    // Activar modo de intercambio
    gameState.exchangeMode = true;
    gameState.tilesToExchange = [];
    
    // Actualizar interfaz
    updateRack();
    
    // Mostrar controles de intercambio
    exchangeControls.classList.remove('hidden');
    exchangeControls.style.display = 'flex';
    exchangeControls.style.visibility = 'visible';
    
    // Deshabilitar otros botones
    playButton.disabled = true;
    passButton.disabled = true;
    exchangeButton.disabled = true;
    
    showMessage('Selecciona las fichas que deseas cambiar', 'success');
});

// Confirmar cambio de fichas
confirmExchangeButton.addEventListener('click', () => {
    if (gameState.tilesToExchange.length === 0) {
        showMessage('Debes seleccionar al menos una ficha para cambiar', 'error');
        return;
    }
    
    if (gameState.letterBag.length < gameState.tilesToExchange.length) {
        showMessage('No hay suficientes fichas en la bolsa', 'error');
        return;
    }
    
    const currentPlayerRack = gameState.players[gameState.currentPlayer].rack;
    
    // Ordenar índices de mayor a menor para evitar problemas al eliminar
    const sortedIndices = [...gameState.tilesToExchange].sort((a, b) => b - a);
    
    // Devolver fichas seleccionadas a la bolsa
    for (const index of sortedIndices) {
        const tile = currentPlayerRack[index];
        gameState.letterBag.push(tile);
        currentPlayerRack.splice(index, 1);
    }
    
    // Barajar la bolsa
    shuffleArray(gameState.letterBag);
    
    // Tomar nuevas fichas
    for (let i = 0; i < sortedIndices.length; i++) {
        currentPlayerRack.push(gameState.letterBag.pop());
    }
    
    // Salir del modo de intercambio
    gameState.exchangeMode = false;
    gameState.tilesToExchange = [];
    
    // Actualizar interfaz
    updateRack();
    
    // Ocultar controles de intercambio
    exchangeControls.classList.add('hidden');
    exchangeControls.style.display = 'none';
    exchangeControls.style.visibility = 'hidden';
    
    // Habilitar otros botones
    playButton.disabled = false;
    passButton.disabled = false;
    exchangeButton.disabled = false;
    
    // Pasar al siguiente jugador
    nextTurn();
    showMessage('Fichas cambiadas', 'success');
});

// Cancelar cambio de fichas
cancelExchangeButton.addEventListener('click', () => {
    // Salir del modo de intercambio
    gameState.exchangeMode = false;
    gameState.tilesToExchange = [];
    
    // Actualizar interfaz
    updateRack();
    
    // Ocultar controles de intercambio
    exchangeControls.classList.add('hidden');
    exchangeControls.style.display = 'none';
    exchangeControls.style.visibility = 'hidden';
    
    // Habilitar otros botones
    playButton.disabled = false;
    passButton.disabled = false;
    exchangeButton.disabled = false;
    
    showMessage('Cambio de fichas cancelado', 'success');
});

// Nuevo juego
newGameButton.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres iniciar un nuevo juego?')) {
        resetGame();
    }
});

function resetGame() {
    // Reiniciar estado del juego
    gameState = {
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
        confirmedTiles: [],
        roundCount: 0,
        questionMode: false,
        usedQuestions: [],
        questionQueue: [],
        currentQuestionPlayer: null,
        selectedCategory: null
    };
    
    // Ocultar ventana del turno si está visible
    const turnModal = document.getElementById('turn-modal');
    if (turnModal) {
        turnModal.classList.remove('show', 'hiding');
    }
    
    // Mostrar selección de categorías para el nuevo juego
    showCategorySelection();
    
    // Limpiar mensajes
    messageElement.classList.add('hidden');
    exchangeControls.classList.add('hidden');
}