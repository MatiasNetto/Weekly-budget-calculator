import {recalculatePresupuesto, valdidatePresupuesto, presupuesto} from "./presupuesto.js";

//identificate dom elements
const modalBTN = document.getElementById(`modalBTN`);
const presupuestoInput = document.getElementById(`presupuestoInput`);
const gastoInput = document.getElementById(`gastoInput`);
const cantidadInput = document.getElementById(`cantidadInput`);
const addBTN = document.getElementById(`addBTN`);
const listContainer = document.getElementById(`listContainer`);
//set variables
let gastoID = 1;

/*Set the initials*/
resetInputs();
presupuestoInput.focus();

function createItem(name,amount) {
    //validate inputs
    if (name != "" && amount != "") {
        
        //Make first letter toUpperCase
        name = name[0].toUpperCase() + name.slice(1);
        
        //create new element
        let newElement = document.createElement(`DIV`);
        
        //add clases and inner HTML
        newElement.classList.add(`gasto-container`);
        //add new ID
        newElement.id = `gastoN${gastoID}`
        //add content
        newElement.innerHTML = `
            <p class="gasto-name">${name}</p>
            <div class="amount-delBTN-container">
                <p class="gasto-amount">${amount}$</p>
                <button id="delBtnN${gastoID}" class="deleteBTN">X</button>
            </div> 
        `;
        
        //inset element into the dom
        listContainer.insertBefore(newElement,listContainer.childNodes[0]);
        
        //add remove function
        document.getElementById(`delBtnN${gastoID}`).addEventListener(`click`,(e)=>{
            if (confirm(`Estas seguro que deseas eliminar este elemento?`)){
                e.path[2].remove();
                recalculatePresupuesto(amount,"add");   
            }
        })
        
        //add one to id
        gastoID++

        
        //Call functions
        recalculatePresupuesto(amount,"remove");
        resetInputs();
        
    } else {
        /*Error managment*/
        if (name == "") {
            alert("Ingrese el nombre del gasto");
            gastoInput.focus();
        } else if (amount == ""){
            alert("Ingrese una cantidad valida");
            cantidadInput.focus();
        }
    }
}

//reset all inputs
function resetInputs() {
    gastoInput.value = "";
    cantidadInput.value = null;
    gastoInput.focus();
}

/*All Event Listeners*/

/*When clickn ok modal btn*/
modalBTN.addEventListener(`click`,()=>{
    valdidatePresupuesto(presupuestoInput.value)
    setTimeout(()=>{gastoInput.focus();},100);
});

/*When enter on the modal input*/
presupuestoInput.addEventListener(`keyup`,(e)=>{
    if (e.keyCode == 13) {
        valdidatePresupuesto(presupuestoInput.value)
        gastoInput.focus(); 
    }
})

/*When click on add BTN*/
addBTN.addEventListener(`click`,()=>{
    if (presupuesto != undefined) {
        createItem(gastoInput.value,cantidadInput.value);
        setTimeout(()=>{gastoInput.focus();},50);
    } else {
        presupuestoInput.focus();
    }
});

/*When enter on cantidad input*/
cantidadInput.addEventListener(`keyup`,(e)=>{
    if (e.keyCode == 13 && presupuesto != undefined) {
        createItem(gastoInput.value,cantidadInput.value);
    }
});

/*When enter on gasto input*/
gastoInput.addEventListener(`keyup`,(e)=>{
    if (e.keyCode == 13) {
        cantidadInput.focus();
    }
})

