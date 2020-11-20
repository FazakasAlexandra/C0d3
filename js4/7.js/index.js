class Tile {
    constructor(rowNode, isMine, game) {
        this.rowNode = rowNode
        this.isMine = isMine
        this.game = game
        this.mineNeighbors = this.isMine ? null : 0
        this.node = this.setNode()
        this.neighbors
    }

    setNode() {
        const tile = document.createElement('div')
        tile.classList.add('tile')
        this.rowNode.appendChild(tile)

        this.addClickEvent(tile)
        this.addRightClickEvent(tile)

        return tile
    }

    addClickEvent(tile) {
        tile.addEventListener('click', () => {
            if (!this.game.isGameOver(this)) {
                this.reveal()
                this.game.isWinner()
            }
        })
    }

    addRightClickEvent(tile) {
        tile.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            if (!this.node.classList.contains('mine') && !this.node.classList.contains('revealed'))
                this.node.classList.add('mine', 'grey-mine')
        })
    }

    reveal() {
        if (this.node.classList.contains('revealed')) return
        if (this.node.classList.contains('mine', 'grey-mine')) this.node.classList.remove('mine', 'grey-mine')

        this.game.score++
        this.countMineNeighbors()

        if (this.mineNeighbors > 0) {
            this.node.innerHTML = `<h1 class="h1-${this.mineNeighbors}">${this.mineNeighbors}<h1>`
            this.node.classList.add('revealed')
            return
        }

        this.node.classList.add('revealed')
        this.revealNeighbors()
    }

    revealNeighbors() {
        this.neighbors.forEach(neighborRow => {
            neighborRow.forEach(neighborTile => {
                neighborTile.reveal()
            });
        })
    }

    countMineNeighbors() {
        this.neighbors.forEach(neighborRow => {
            neighborRow.forEach(neighborTile => {
                if (neighborTile.isMine) this.mineNeighbors++
            });
        })
    }
}

class MineSweeper {
    constructor(rowsNr, colsNr, minesNr, game) {
        this.rows = rowsNr
        this.cols = colsNr
        this.mines = minesNr
        this.game = game
        this.tilesMap = []
    }

    generateRows(idx = 0) {
        if (idx === this.rows) return

        let rowNode = document.createElement('div')
        rowNode.classList.add('row')
        container.appendChild(rowNode)

        let tileRow = []

        this.generateCols(rowNode, idx, tileRow)

        this.tilesMap.push(tileRow)

        return this.generateRows(idx + 1)
    }

    generateCols(rowNode, rowIdx, tileRow, colIdx = 0) {
        if (colIdx === this.cols) return

        tileRow.push(new Tile(rowNode, false, this.game))

        return this.generateCols(rowNode, rowIdx, tileRow, colIdx + 1)
    }

    addMines() {
        this.tilesMap.forEach(tileRow => {
            tileRow.forEach(tile => {
                if (Math.random() < 0.10 && this.mines > 0) {
                    this.mines--
                    tile.isMine = true
                    tile.node.classList.add('mine', 'grey-mine')
                }
            })
        });
        if (this.mines > 0) return this.addMines()
    }

    addTileNeighbors() {
        this.tilesMap.forEach((tileRow, currentRow) => {
            tileRow.forEach((tile, currentCol) => {
                tile.neighbors = [
                    this.getTopRowNeighbors(currentRow, currentCol),
                    this.getCurrentRowNeighbors(currentRow, currentCol),
                    this.getBottomRowNeighbors(currentRow, currentCol)
                ]
            });
        })
    }

    getTopRowNeighbors(currentRow, currentCol, topRowNeighbors = []) {
        if (this.tilesMap[currentRow - 1]) {
            topRowNeighbors.push(this.tilesMap[currentRow - 1][currentCol])
            if (this.tilesMap[currentRow - 1][currentCol - 1]) topRowNeighbors.push(this.tilesMap[currentRow - 1][currentCol - 1])
            if (this.tilesMap[currentRow - 1][currentCol + 1]) topRowNeighbors.push(this.tilesMap[currentRow - 1][currentCol + 1])
        }

        return topRowNeighbors
    }

    getCurrentRowNeighbors(currentRow, currentCol, currentRowNeighbors = []) {
        if (this.tilesMap[currentRow][currentCol + 1]) currentRowNeighbors.push(this.tilesMap[currentRow][currentCol + 1])
        if (this.tilesMap[currentRow][currentCol - 1]) currentRowNeighbors.push(this.tilesMap[currentRow][currentCol - 1])

        return currentRowNeighbors
    }

    getBottomRowNeighbors(currentRow, currentCol, bottomRowNeighbors = []) {
        if (this.tilesMap[currentRow + 1]) {
            bottomRowNeighbors.push(this.tilesMap[currentRow + 1][currentCol])
            if (this.tilesMap[currentRow + 1][currentCol - 1]) bottomRowNeighbors.push(this.tilesMap[currentRow + 1][currentCol - 1])
            if (this.tilesMap[currentRow + 1][currentCol + 1]) bottomRowNeighbors.push(this.tilesMap[currentRow + 1][currentCol + 1])
        }

        return bottomRowNeighbors
    }
}

class Game {
    constructor() {
        this.mineSweeper = new MineSweeper(10, 10, 10, this)
        this.score = 0
        this.start()
    }

    start() {
        this.mineSweeper.generateRows()
        this.mineSweeper.addMines()
        this.mineSweeper.addTileNeighbors()
    }

    stop(message) {
        const restart = confirm(message);
        container.innerHTML = ''
        if (restart) {
            this.score = 0
            this.mineSweeper = new MineSweeper(10, 10, 10, this)
            this.start()
        }
    }

    isWinner() {
        if (this.score === (10 * 10) - 10) {
            setTimeout(() => this.stop("YOU WON ! \nOK - restart \nCancel - exit"), 200)
            return true
        }
    }

    isGameOver(tile) {
        if (tile.isMine) {
            tile.node.classList.add('mine', 'red-mine')
            setTimeout(() => this.stop("GAME OVER ! \nOK - restart \nCancel - exit"), 200)
            return true
        }
    }
}

const game = new Game()