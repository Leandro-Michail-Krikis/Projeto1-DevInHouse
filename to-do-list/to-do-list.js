const userInput = document.querySelector("#userInput")

let arrTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];

const saveArray = (array) =>{
    localStorage.setItem('savedTasks', JSON.stringify(array))
}

const displayTask = document.querySelector("#main")

const changeChildBcg = (i, color) =>{ 
    let child = document.querySelector(`#child${[i]}`)
    child.style.backgroundColor=`${[color]}`
}
const emptyFormAlert = document.querySelector("#emptyFormAlert")
//1 adicionando task no arrTasks
userInput.addEventListener('submit', function(event){
    event.preventDefault();
    //1.1 Criando o objeto do task
    let task = {}
    task.valueOfTask = document.querySelector("#valueOfTask").value
    task.checkStatus = "unchecked"
    //1.2 Testando se o formulario esta vazio 
    if (task.valueOfTask.length >= 1) {
        //1.3 Se não estiver vazio salva no local storage
        arrTasks.push(task)
        saveArray(arrTasks)
        printToHtml()
        userInput.querySelector("#valueOfTask").value = ""
        emptyFormAlert.innerHTML = ""
    } else{
        //1.4 Se tiver vazio mostrar uma alert para o usuario
        emptyFormAlert.innerHTML = ""
        emptyFormAlert.insertAdjacentHTML("beforeend",
        `
        <h3>Preencha o campo com uma tarefa<h3>
        <button id="submitButton" onclick="emptyFormAlert.innerHTML = ''">Ok</button>
        
        `)
    }  
})

    //2 Imprimindo no HTML
    const printToHtml = () =>{
    displayTask.innerHTML = ""    
    if (arrTasks.length == 0) {
        //2.1 se não tiver nada no localStorage imprimir lista vazia
        displayTask.insertAdjacentHTML("beforeend", 
            `
            <div class="children">
                <h2 id="emptyList" >A lista esta vazia</h2>
            </div>
            `)
    } else {
        //2.2 se tiver algo no local storage imprimir ele no HTML
            
            for (let i = 0; i < arrTasks.length; i++) {
                //2.3 criando o container da tarefa
                displayTask.insertAdjacentHTML("beforeend", 
                `
                <div class="children" id="child${[i]}">
                      
                </div>
                `)

                //2.3 criando o botão de mudar o status da tarefa
                let child = document.querySelector(`#child${[i]}`) 
                    if (arrTasks[i].checkStatus == "checked" ) {
                        //2.3.1 se for checked
                        child.insertAdjacentHTML("beforeend", 
                            `
                            <button 
                                    class="statusButtons"
                                    onmouseover="changeChildBcg('${[i]}','rgba(1, 3, 0, 0.37)')"
                                    onmouseout="changeChildBcg('${[i]}','rgba(255, 255, 255, 0.5)')" 
                                    onclick="changeTaskStatus(${[i]})" >
                                    <img src="img/checked.png" id="status${[i]}" alt="checkStatus" class="icons" >
                            </button>
                        `)
                    } else {
                        //2.3.2 se for unchecked
                        child.insertAdjacentHTML("beforeend", 
                        `
                        <button 
                                class="statusButtons" 
                                onmouseover="changeChildBcg('${[i]}','rgba(45, 247, 4, 0.466)')"
                                onmouseout="changeChildBcg('${[i]}','rgba(255, 255, 255, 0.5)')"
                                onclick="changeTaskStatus(${[i]})" >
                                <img src="img/unchecked.png" id="status${[i]}" alt="checkStatus" class="icons" >
                        </button>
                        `)
                    }

                

                //2.4 adicionando o contedudo da tarefa
                child.insertAdjacentHTML("beforeend",
                    `
                    <div class="${arrTasks[i].checkStatus}" >${arrTasks[i].valueOfTask}</div>
                    `)

                //2.5 adicionando o botão de apagar a tarefa
                child.insertAdjacentHTML("beforeend",
                    `
                    <button 
                            class="deleteButtons"
                            onmouseover="changeChildBcg('${[i]}','rgba(255, 0, 0, 0.5)')"
                            onmouseout="changeChildBcg('${i}','rgba(255, 255, 255, 0.5)')" 
                            onclick="displayDeleteConfirmation(${[i]},)">
                            <img src="img/delete.png" alt="deleteButton" class="icons">
                    </button>
                    `)
            }   
    }
}   
    
    //3.função do botão de apagar uma task
    const displayDeleteConfirmation = (i) =>{
        let child = document.querySelector(`#child${[i]}`)
        child.style = ("flex-wrap: wrap ;")
        child.innerHTML = 
        `
        <div style="flex-basis: 100%">Tem certeza que quer apagar essa tarefa?</div>
        
        <button 
                style="margin-left: 150px;"
                class="confirmationButtons" 
                onclick="deleteTask(${[i]})">sim</button>
        <button 
                style="margin-right: 150px;"
                class="confirmationButtons" 
                onclick="location.reload()">não</button>
        `
    }
    const deleteTask = (i) =>{
        arrTasks.splice(i, 1);
        saveArray(arrTasks)
        printToHtml()
    }
    //4.função do botão de mudar o estado do check
    const changeTaskStatus = (i) =>{
        switch (arrTasks[i].checkStatus) {
            case "checked":
                arrTasks[i].checkStatus = "unchecked"   
                break;
            
            case "unchecked":
                arrTasks[i].checkStatus = "checked"   
                break;
        }    
        saveArray(arrTasks)
        printToHtml()
    }


