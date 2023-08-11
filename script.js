document.addEventListener('DOMContentLoaded', function() {
    const cookieData = getCookie('tarefas');
    if (cookieData) {
        tarefas = JSON.parse(cookieData);
    
        // Selecionar a lista de tarefas
        const localTarefa = document.querySelector('#localTarefas');

        // Adicionar cada tarefa salva na lista
        for (const tarefa of tarefas) {
            const newItem = document.createElement("li");
            newItem.className = "newitem";
            newItem.addEventListener("click", tarefaConcluida);
            newItem.innerHTML = tarefa;
            localTarefa.appendChild(newItem);
        }
    }    
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

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

    // Armazenar a lista de tarefas em um cookie
    document.cookie = `tarefas=${JSON.stringify(tarefas)}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;

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