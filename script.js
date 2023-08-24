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

                let img = document.createElement("img")
                img.classList.add("img-delete")
                img.src = "../img/delete_FILL0_wght400_GRAD0_opsz40.svg"
                img.alt = "Deletar"
                
                const removeButton = document.createElement("button");
                removeButton.className = "removeButton"
                removeButton.appendChild(img)
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
    newItem.className = "slideAdd"
    newItem.addEventListener("click", tarefaConcluida);
    newItem.textContent = novaTarefa.texto;

    // imagem lixo

    let img = document.createElement("img")
    img.classList.add("img-delete")
    img.src = "../img/delete_FILL0_wght400_GRAD0_opsz48.png"
    img.alt = "Deletar"

    const removeButton = document.createElement("button");
    removeButton.appendChild(img)
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

function tarefaConcluida(tarefa) {
    tarefa.concluida = !tarefa.concluida;
    updateCookie();
    atualizarTela(); // Atualiza a tela após a alteração
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
            
            if (tarefa.concluida) {
                newItem.classList.add("tarefaConcluida");
            }
            
            newItem.addEventListener("click", function() {
                tarefaConcluida(tarefa); // Passa a tarefa diretamente
            });
            
            newItem.textContent = tarefa.texto;

            let img = document.createElement("img")
            img.classList.add("img-delete")
            img.src = "../img/delete_FILL0_wght400_GRAD0_opsz48.png"
            img.alt = "Deletar"

            const removeButton = document.createElement("button");
            removeButton.appendChild(img)
            removeButton.addEventListener("click", function() {
                deletar(tarefa.texto);
                atualizarTela(); // Chame essa função para atualizar a tela após a remoção
            });

            newItem.appendChild(removeButton); // Adicione o botão ao elemento <li>
            localTarefa.appendChild(newItem); // Adicione o elemento <li> à lista

        }
    }
}

function updateCookie() {
    document.cookie = `tarefas=${JSON.stringify(tarefas)}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
}
