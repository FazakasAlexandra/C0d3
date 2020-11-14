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
            this.board.kanban.addHistory()
            this.remove()
        })
    }

    remove() {
        this.board.contents.splice(this.id, 1)
        this.container.remove()
    }

    makeContainer() {
        this.container = document.createElement("div")
        this.container.classList.add("text-container")
    }

    addText() {
        if (+this.board.id === 0) {
            this.container.innerHTML = `
            <p class="text">${this.text}</p> 
            <p class="arrow right"> > </p>`
            this.addRightArrowEvent()
            return
        }

        if (+this.board.id === this.board.kanban.boards.length - 1) {
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
            this.remove()
            this.board.kanban.transfer(this.board.id + 1, this)
        })
    }

    addLeftArrowEvent() {
        this.container.querySelector(".left").addEventListener("click", (e) => {
            this.remove()
            this.board.kanban.transfer(this.board.id - 1, this)
        })
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

    removeBoadNode(){
        this.boardNode.remove()
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
            this.kanban.addHistory()
            this.contents.push(new Content(this.contents.length, inputText.value, this))
            this.renderContent() 

            inputText.value = ""
        })
    }

    renderContent() {
        this.boardNode.querySelector(".content-container").innerHTML = ''
        this.contents.forEach((content) => {
            this.boardNode.querySelector(".content-container").appendChild(content.container)
        })
    }
}

class Kanban {
    constructor(boardNames) {
        this.boardNames = boardNames
        this.boards = []
        this.history = []
    }

    getContentCopy(content) {
        return Object.create(
            Object.getPrototypeOf(content),
            Object.getOwnPropertyDescriptors(content)
        );
    }

    getBoadCopy(board) {
        const contentsCopy = board.contents.map(content => this.getContentCopy(content))
        board.contents = contentsCopy 
        board.node = board.boardNode.cloneNode(true)
        return Object.create(
            Object.getPrototypeOf(board),
            Object.getOwnPropertyDescriptors(board)
        );
    }

    addHistory() {
        const boardsCopy = this.boards.map(board => this.getBoadCopy(board))
        this.history.push(boardsCopy)
        console.log(this.history)
    }

    renderBoards() {
        this.boardNames.forEach((name, idx) => {
            //if (localStorage.getItem(`${name}`)) boardContent = JSON.parse(localStorage.getItem(`${name}`))
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

    }
}

const kanban = new Kanban(["To-do", "Doing", "Done", "Approved"])
kanban.renderBoards()

document.querySelector("#undo").addEventListener("click", () => {
    kanban.undo()
})