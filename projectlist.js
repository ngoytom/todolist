const listContainer = document.querySelector("[data-project]")
const newProject = document.querySelector("[data-new-project]")
const newListInput = document.querySelector("[data-new-list-input]")
const deleteList = document.querySelector("[data-delete-list]")

const LOCAL_STORAGE_LIST_KEY = "task.list"
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId"

let list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "li"){
        selectedListId = e.target.dataset.listId
        saveList()
        create()
    }
})

deleteList.addEventListener("click", e =>{
    list = list.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveList()
    create()
})

newProject.addEventListener("submit", e => {
    e.preventDefault()
    const listName = newListInput.value //Words inputted
    if (listName == null){
        return
    }
    const newList = createList(listName)
    newListInput.value = null //Empties text field
    list.push(newList) //Appends newList into list
    saveList()
    create()
})

function saveList(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function createList(name){ 
    return{id: Date.now().toString(), name: name, tasks: []}
}

function create(){
    clearList(listContainer)
    list.forEach(list => {
        const listElement = document.createElement("li")
        listElement.classList.add("projects")
        listElement.dataset.listId = list.id
        listElement.innerText = list.name
        if (list.id === selectedListId){
            listElement.classList.add("activelist")
        }
        listContainer.appendChild(listElement)
    })
}

function clearList(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

create()