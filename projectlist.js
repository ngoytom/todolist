const listContainer = document.querySelector("[data-project]")
const newProject = document.querySelector("[data-new-project]")
const newListInput = document.querySelector("[data-new-list-input]")

let list = [{
    id: 1,
    name: "Project 1"
}, {
    id: 2,
    name: "Project 2"
}]

newProject.addEventListener("submit", e => {
    e.preventDefault()
    const listName = newListInput.value //Words inputted
    if (listName == null){
        return
    }
    const newList = createList(listName)
    newListInput.value = null //Empties text field
    list.push(newList) //Appends newList into list
    create()
})

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
        listContainer.appendChild(listElement)
    })
}

function clearList(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

create()