const content = document.getElementById('content')
const input = document.getElementById('input')
class TodoList {
    constructor() {
        this.todoListArray = []
    }
    addItemToList() {
        this.todoListArray.push({
            id: new Date().getMilliseconds(),
            value: input.value,
            isEdit: false
        })
        input.value = ''
        this.renderList()
    }
    removeItem(e) {
        const id = Number(e.target.dataset.id)
        console.log(this.todoListArray)
        this.todoListArray = this.todoListArray.filter((item) => {
            return item.id !== id
        })
        this.renderList()
    }
    editItem(e) {
        const id = Number(e.target.dataset.id)
        const liContainer = document.getElementById(`${id}`)
        const spanText = liContainer.querySelector('.item-text')
        const checkIcon = liContainer.querySelector('.fa-check')
        const editIcon = liContainer.querySelector('.fa-pen-to-square')
        spanText.contentEditable = 'true'
        checkIcon.classList.remove('hide')
        editIcon.classList.add('hide')
    }
    saveItem(e) {
        const id = Number(e.target.dataset.id)
        const liContainer = document.getElementById(`${id}`)
        const spanText = liContainer.querySelector('.item-text').innerText
        this.todoListArray = this.todoListArray.map((item) => {
            return item.id === id ? {...item, value: spanText} : item
        })
        this.renderList()
    }
    submitForm() {
    }
    renderList() {
        content.innerHTML = `${
            this.todoListArray.map((item) => `<li id="${item.id}" class="list-item">
                <span class="item-text" contenteditable="false">${item.value}</span> 
                <span class="item-action">
                    <i class="fa-solid fa-check hide" data-id="${item.id}" onclick="todoList.saveItem(event)"></i>
                    <i class="fa-solid fa-pen-to-square" data-id="${item.id}" onclick="todoList.editItem(event)"></i> 
                    <i class="fa-solid fa-xmark" data-id="${item.id}" onclick="todoList.removeItem(event)"></i>
                </span>
                </li>`).join('')
        }`
    }
}
const todoList = new TodoList()