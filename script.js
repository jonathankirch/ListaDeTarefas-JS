document.addEventListener('DOMContentLoaded', function() {
    const cookieData = getCookie('tarefas');
    if (cookieData) {
        tarefas = JSON.parse(cookieData);
    
        const localTarefa = document.querySelector('#localTarefas');

        for (const tarefa of tarefas) {
            const newItem = document.createElement("li");
            newItem.className = "newitem";
            newItem.addEventListener("click", tarefaConcluida);
            newItem.textContent = tarefa.texto;
            if (tarefa.concluida) {
                newItem.classList.add("tarefaConcluida");
            }
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

let inputTarefa = document.querySelector('#inputTarefa');
inputTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTarefa();
    }
});

function addTarefa() {
    let inputTarefa = document.querySelector('#inputTarefa');
    let localTarefa = document.querySelector('#localTarefas');
    
    const novaTarefa = {
        texto: inputTarefa.value,
        concluida: false
    };

    tarefas.push(novaTarefa);
    updateCookie();

    let newItem = document.createElement("li");
    newItem.className = "newitem";
    newItem.addEventListener("click", tarefaConcluida);
    newItem.textContent = novaTarefa.texto;
    localTarefa.appendChild(newItem);

    inputTarefa.value = "";
    inputTarefa.focus();
}

function tarefaConcluida(event) {
    event.target.classList.toggle("tarefaConcluida");
    
    const textoTarefa = event.target.textContent;
    const tarefaIndex = tarefas.findIndex(tarefa => tarefa.texto === textoTarefa);
    
    if (tarefaIndex !== -1) {
        tarefas[tarefaIndex].concluida = !tarefas[tarefaIndex].concluida;
        updateCookie();
    }
}

function updateCookie() {
    document.cookie = `tarefas=${JSON.stringify(tarefas)}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
}
