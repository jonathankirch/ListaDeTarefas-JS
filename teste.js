document.addEventListener('DOMContentLoaded', function() {
    const cookieData = getCookie('tarefas');
    if (cookieData) {
        tarefas = JSON.parse(cookieData);
    
        const localTarefa = document.querySelector('#localTarefas');

        for (const [index, tarefa] of tarefas.entries()) {
            if (!tarefa.excluido) { // Verifica se a tarefa não está marcada como excluída
                const newItem = document.createElement("li");
                newItem.className = "newitem";
                newItem.addEventListener("click", tarefaConcluida);
                newItem.textContent = tarefa.texto;
                
                if (tarefa.concluida) {
                    newItem.classList.add("tarefaConcluida");
                }
                
                const removeButton = document.createElement("button");
                removeButton.textContent = "🗑️";
                removeButton.dataset.index = index; // Armazena o índice da tarefa como atributo
                removeButton.addEventListener("click", function(event) {
                    deletar(event.target.dataset.index);
                    atualizarTela(); // Atualiza a tela após a exclusão
                });
                
                newItem.appendChild(removeButton);
                localTarefa.appendChild(newItem);
            }
        }
    }    
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let tarefas = []
document.getElementById("addtarefa").addEventListener("click", addTarefa);


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
        concluida: false,
        excluido: false
    };

    tarefas.push(novaTarefa);
    
    let newItem = document.createElement("li");
    newItem.className = "newitem";
    newItem.addEventListener("click", tarefaConcluida);
    newItem.textContent = novaTarefa.texto;

    const removeButton = document.createElement("button");
    removeButton.textContent = "🗑️";
    removeButton.addEventListener("click", function() {
        deletar(novaTarefa.texto);
    });    
    newItem.appendChild(removeButton);

    localTarefa.appendChild(newItem);

    inputTarefa.value = "";
    inputTarefa.focus();
    updateCookie();
    //console.log(tarefas)
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


function deletar(textoTarefa) {
    const tarefaIndex = tarefas.findIndex(tarefa => tarefa.texto === textoTarefa);

    if (tarefaIndex !== -1) {
        tarefas.splice(tarefaIndex, 1);
        updateCookie();
        atualizarTela(); // Chame essa função para atualizar a tela após a remoção
    }
}

function atualizarTela() {
    const localTarefa = document.querySelector('#localTarefas');
    localTarefa.innerHTML = ''; // Limpa o conteúdo anterior

    for (const tarefa of tarefas) {
        if (!tarefa.excluido) {
            const newItem = document.createElement("li");
            newItem.className = "newitem";
            newItem.addEventListener("click", tarefaConcluida);
            newItem.textContent = tarefa.texto;

            if (tarefa.concluida) {
                newItem.classList.add("tarefaConcluida");
            }

            const removeButton = document.createElement("button");
            removeButton.textContent = "🗑️";
            removeButton.addEventListener("click", function() {
                deletar(tarefa.texto);
            });

            newItem.appendChild(removeButton);
            localTarefa.appendChild(newItem);
        }
    }
}

function updateCookie() {
    document.cookie = `tarefas=${JSON.stringify(tarefas)}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
}
