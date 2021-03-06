const presupuestoContainerDom = document.querySelector(`.presupuesto`);
const restanteContainerDom = document.querySelector(`.restante`);

const presupuestoDOM = document.getElementById(`presupuestoDOM`);
const restanteDOM = document.getElementById(`restanteDOM`);

let restante;
export let presupuesto;


//validate presupuesto input
export function valdidatePresupuesto(pres){
    let modalContainer = document.getElementById(`modalContainer`);
    restante = pres;
    
    /*eror control*/
    if (isNaN(parseInt(pres))) {
        alert("Ingrese una cantidad valida")
    } else {
        //start all values
        presupuestoDOM.innerHTML = `&nbsp $${pres}`;
        restanteDOM.innerHTML = `&nbsp $${restante}`
        restanteContainerDom.style.background = "#CAFFBF"
        gastoInput.focus();
        modalContainer.remove();
        presupuesto = pres;
    }
}


//recalculate presupuesto
export function recalculatePresupuesto(amount,type) {
    
    //adition or substraction
    if (type == "remove") {
        restante -= amount;
    } else if (type == "add") {
        restante += parseInt(amount);
    }
    
    //set restante value
    restanteDOM.innerHTML = ` $${restante}`
    
    //set color
    if (restante >= presupuesto/2) {
        restanteContainerDom.style.background = "#CAFFBF"
    } else if (restante <= presupuesto/2 && restante >= presupuesto/3){
        restanteContainerDom.style.background = "#FDFFB6";
    } else if (restante <= presupuesto/3 && restante > 0) {
        restanteContainerDom.style.background = "#FFD6A5";
    } else if (restante <= 0) {
        restanteContainerDom.style.background = "#FFADAD";
    }
}

