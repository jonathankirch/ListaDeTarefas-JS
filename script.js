document.addEventListener('DOMContentLoaded', function() {
    const cookieData = getCookie('tarefas');
    if (cookieData) {
        tarefas = JSON.parse(cookieData);
    
        const localTarefa = document.querySelector('#localTarefas');

        for (const [index, tarefa] of tarefas.entries()) {
            if (!tarefa.excluido) { // Verifica se a tarefa não está marcada como excluída
                const newItem = document.createElement("li");
                newItem.className = "newitem";
                
                if (tarefa.concluida) {
                    newItem.classList.add("tarefaConcluida");
                }
                
                newItem.textContent = tarefa.texto;

                let img = document.createElement("img")
                img.classList.add("img-delete")
                img.src = "img/delete_FILL0_wght400_GRAD0_opsz40.svg"
                img.alt = "Deletar"

                const removeButton = document.createElement("button");
                removeButton.appendChild(img)
                removeButton.dataset.index = index; // Armazena o índice da tarefa como atributo
                removeButton.addEventListener("click", function(event) {
                    deletar(event.target.dataset.index);
                    atualizarTela(); // Atualiza a tela após a exclusão
                });
                
                newItem.appendChild(removeButton);
                localTarefa.appendChild(newItem);
                
                newItem.addEventListener("click", function() {
                    tarefaConcluida(index); // Passa o índice da tarefa
                });                
            }
        }
    } 
    const addButton = document.getElementById("addtarefa");
    addButton.addEventListener("click", addTarefa);   
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
    
    if (inputTarefa.value.trim() !== ''){ // Verifica se o valor não é apenas espaços em branco
        const novaTarefa = {
            texto: inputTarefa.value,
            concluida: false,
            excluido: false
        };
        tarefas.push(novaTarefa); 
        
        let newItem = document.createElement("li");
        newItem.className = "newitem";
        newItem.className = "slideAdd";
        newItem.textContent = novaTarefa.texto;
    
        let img = document.createElement("img");
        img.classList.add("img-delete");
        img.src = "img/delete_FILL0_wght400_GRAD0_opsz40.svg";
        img.alt = "Deletar";
    
        const removeButton = document.createElement("button");
        removeButton.appendChild(img);
        removeButton.addEventListener("click", function() {
            deletar(novaTarefa.texto);
            atualizarTela();
        });    
        newItem.appendChild(removeButton);
    
        localTarefa.appendChild(newItem);
    
        newItem.addEventListener("click", function() {
            tarefaConcluida(tarefas.length - 1); // Passa o índice da tarefa recém-adicionada
        });
    
        inputTarefa.value = "";
        inputTarefa.focus();
        updateCookie();
    
        atualizarTela(); // Chame a função para atualizar a tela e associar o event listener corretamente
    }
}



function tarefaConcluida(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
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

    for (const [index, tarefa] of tarefas.entries()) {
        if (!tarefa.excluido) {
            const newItem = document.createElement("li");
            newItem.className = "newitem";

            if (tarefa.concluida) {
                newItem.classList.add("tarefaConcluida");
            }

            newItem.textContent = tarefa.texto;

            let img = document.createElement("img");
            img.classList.add("img-delete");
            img.src = "img/delete_FILL0_wght400_GRAD0_opsz40.svg";
            img.alt = "Deletar";

            const removeButton = document.createElement("button");
            removeButton.appendChild(img);
            removeButton.addEventListener("click", function () {
                deletar(tarefa.texto);
                atualizarTela(); // Chame essa função para atualizar a tela após a remoção
            });

            newItem.appendChild(removeButton); // Adicione o botão ao elemento <li>
            localTarefa.appendChild(newItem); // Adicione o elemento <li> à lista

            newItem.addEventListener("click", function () {
                tarefaConcluida(index); // Passa o índice da tarefa
            });
        }
    }
}


function updateCookie() {
    document.cookie = `tarefas=${JSON.stringify(tarefas)}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
}
