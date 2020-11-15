class Content {
    constructor(id, text, board) {
        this.id = id
        this.text = text
        this.board = board
        this.container
        this.setContainer()
    }

    setContainer() {
        this.makeContainer()
        this.addText()
        this.textEvent()
    }

    textEvent() {
        this.container.querySelector(".text").addEventListener("click", () => {
            this.board.kanban.addHistory([this.restore, this])
            this.remove()
        })
    }

    restore(self = this) {
        self.setContainer()
        self.board.contents.splice(self.id, 0, self)
        self.board.renderContent(self.board)
    }

    remove() {
        console.log(this.board.contents)
        this.board.contents.splice(this.id, 1)
        console.log(this.board.contents)
        this.container.remove()
    }

    makeContainer() {
        this.container = document.createElement("div")
        this.container.classList.add("text-container")
    }

    addText() {
        console.log(this.board.id, this.board.kanban.boards.length)

        if (+this.board.id === 0) {
            this.container.innerHTML = `
            <p class="text">${this.text}</p> 
            <p class="arrow right"> > </p>`
            this.addRightArrowEvent()
            return
        }

        if (+this.board.id === this.board.kanban.boardNames.length - 1) {
            this.container.innerHTML = `
            <p class="arrow left"> < </p> 
            <p class="text">${this.text}</p>`
            this.addLeftArrowEvent()
            return
        }

        this.container.innerHTML = `
        <p class="arrow left"> < </p> 
        <p class="text">${this.text}</p> 
        <p class="arrow right"> > </p>`

        this.addRightArrowEvent()
        this.addLeftArrowEvent()
    }

    addRightArrowEvent() {
        this.container.querySelector(".right").addEventListener("click", (e) => {
            this.board.kanban.addHistory([this.transferLeft, this])
            this.transferRight()
        })
    }

    transferRight(self = this) {
        self.remove()
        self.board.kanban.transfer(self.board.id + 1, self)
    }

    addLeftArrowEvent() {
        this.container.querySelector(".left").addEventListener("click", (e) => {
            this.board.kanban.addHistory([this.transferRight, this])
            this.transferLeft()
        })
    }

    transferLeft(self = this) {
        self.remove()
        self.board.kanban.transfer(self.board.id - 1, self)
    }
}

class Board {
    constructor(boardName, kanban, id) {
        this.id = id
        this.name = boardName
        this.contents = []
        this.kanban = kanban
        this.boardNode;
        this.render()
    }
    render() {
        this.setBoardNode()
        this.addSubmitButtonEvent()
    }

    setBoardNode() {
        const boardNode = document.createElement("div")
        boardNode.classList.add("board")
        boardNode.innerHTML = `<h4 id=${this.name}>${this.name}</h4>
                               <div class="content-container"></div>
                               <div class="input-container">
                                  <textarea rows="3" cols="50" class="input-text"></textarea>
                                  <button class="submit">SUBMIT</button>
                                </div>`
        container.appendChild(boardNode)

        this.boardNode = boardNode
    }

    addSubmitButtonEvent() {
        this.boardNode.querySelector(".submit").addEventListener("click", () => {
            const inputText = this.boardNode.querySelector(".input-text")
            this.contents.push(new Content(this.contents.length, inputText.value, this))
            this.renderContent()
            this.kanban.addHistory([this.removeContent, this])

            inputText.value = ""
        })
    }

    removeContent(self = this) {
        self.contents.pop()
        self.renderContent()
    }

    renderContent(self = this) {
        self.boardNode.querySelector(".content-container").innerHTML = ''
        self.contents.forEach((content) => {
            self.boardNode.querySelector(".content-container").appendChild(content.container)
        })
    }
}

class Kanban {
    constructor(boardNames) {
        this.boardNames = boardNames
        this.boards = []
        this.history = []
    }

    addHistory(action) {
        this.history.push(action)
    }

    renderWithStoredContent(){
        JSON.parse(localStorage.getItem("boardsContents")).forEach((contents, idx) => {
            const board = new Board(this.boardNames[idx], this, idx)
            contents.forEach(text => board.contents.push(new Content(board.contents.length, text, board)))
            board.renderContent()
            this.boards.push(board)
        })
    }

    renderBoards() {
        if (localStorage.getItem("boardsContents")) {
            this.renderWithStoredContent()
            return
        }

        this.boardNames.forEach((name, idx) => {
            this.boards.push(new Board(name, this, idx))
        })
    }

    transfer(neighborBoardId, content) {
        let neighborBoard = this.boards.find((board) => board.id === +neighborBoardId)

        content.board = neighborBoard
        content.id = neighborBoard.contents.length

        neighborBoard.contents.push(content)
        content.setContainer()
        neighborBoard.renderContent()
    }

    undo() {
        // [function, object]
        const prevAction = this.history.pop()
        prevAction[0](prevAction[1])
    }

    storeText(board, boardsContents) {
        const texts = []

        board.contents.forEach(content => {
            if (content.container) texts.push(content.text)
        })

        boardsContents.push(texts)
    }

    storeBoardsContents() {
        const boardsContents = []

        this.boards.forEach(board => this.storeText(board, boardsContents))

        localStorage.setItem('boardsContents', JSON.stringify(boardsContents))
    }
}

const kanban = new Kanban(["To-do", "Doing", "Done", "Approved"])
kanban.renderBoards()

document.querySelector("#undo").addEventListener("click",()=>kanban.undo())

window.addEventListener('beforeunload',()=>kanban.storeBoardsContents())