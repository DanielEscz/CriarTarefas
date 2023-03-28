const inputTexto = document.querySelector('.input');
const adicionarItens = document.querySelector('.adicionar');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

inputTexto.addEventListener('keypress', function(e){
    if(e.keyCode === 13) {
        if (!inputTexto.value) return;
    criaTarefa(inputTexto.value);
    }
    
});

function limpaInput(){
    inputTexto.value ='';
    inputTexto.focus();
}

function criaButton(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

function criaTarefa(inputTexto){
    const li = criaLi();
    li.innerText = inputTexto
    tarefas.appendChild(li)
    criaButton(li);
    limpaInput();
    salvarTarefa();
}

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for (let tarefas of liTarefas){
        let tarefaTexto = tarefas.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaTarefas.push(tarefaTexto);
    }
    const tarefasJson = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

function backTarefas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas);
    console.log (listaTarefas);

    for(let tarefas of listaTarefas){
        criaTarefa(tarefas);
    }
}
backTarefas();

adicionarItens.addEventListener('click', function(){
    if (!inputTexto.value) return;
    criaTarefa(inputTexto.value);
});

document.addEventListener('click', function(e){
    const el = e.target

    if (el.classList.contains('apagar')){
        el.parentElement.remove();
    }
    salvarTarefa();
});