
let tarefas = []

function addTarefa(){
    let inputTarefa = document.querySelector('#inputTarefa')
    let localTarefa = document.querySelector('#localTarefas')
    let novoLi = document.createElement("li")
        
    tarefas.push(inputTarefa.value)
    novoLi = document.createTextNode(inputTarefa.value)
    localTarefa.appendChild(novoLi)

    inputTarefa.value = "" 
    inputTarefa.focus()
    
    console.log(tarefas)
    console.log(novoLi)

    // precisa fazer a quebra de linha em cada item ainda
}