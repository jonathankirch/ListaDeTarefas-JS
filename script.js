let tarefas = []

let inputTarefa = document.querySelector('#inputTarefa')
inputTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()

        addTarefa()
    }
})

function addTarefa(){
    let inputTarefa = document.querySelector('#inputTarefa')
    let localTarefa = document.querySelector('#localTarefas')
        
    tarefas.push(inputTarefa.value)

    // Novo item adicionado
    let NewItem = document.createElement("li")
    NewItem.className = "newitem"
    NewItem.addEventListener("click", tarefaConcluida)
    NewItem.innerHTML = `${inputTarefa.value}`
    localTarefa.appendChild(NewItem)

    inputTarefa.value = "" 
    inputTarefa.focus()
    
    console.log(tarefas)
    console.log(NewItem)
}

//para adicionar a opcao de tarefa riscada quando for concluida
function tarefaConcluida(event) {
    event.target.classList.toggle("tarefaConcluida");
}

// Carregar tarefas salvas do armazenamento local ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        for (const tarefa of tarefas) {
            const newItem = document.createElement("li");
            newItem.className = "newitem";
            newItem.addEventListener("click", tarefaConcluida);
            newItem.innerHTML = tarefa;
            localTarefas.appendChild(newItem);
        }
    }
});