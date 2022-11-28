const add = document.querySelector("[data-add]");
const reset = document.querySelector("[data-reset]");
const tabla = document.querySelector("[data-tabla]");
const btnCalc  = document.querySelector("[data-btncalc]");
const btnSave = document.querySelector("[data-btnsave]");
const results = document.querySelector("[data-papa]");
let listaid = [];
let listaDematerias = JSON.parse(sessionStorage.getItem('materia')) || [];
const savestorage = JSON.parse(localStorage.getItem('materia')) || [];
let PAPA = 0
const display = (lista) => {
    lista.forEach((materia) => {
        tabla.appendChild(drawMaterias(materia.name,materia.nota,materia.creditos,materia.id));
    });
};

const remover = (li,id,delet) =>{
    delet.addEventListener('click',() => {
        const index = listaDematerias.findIndex((item) => item.id === id)
        listaDematerias.splice(index,1); //** para eliminar d ela lista
        const newarray = listaid.filter((item) => item != id);
        listaid = newarray
        //sessionStorage.setItem('materia', JSON.stringify(listaDematerias))
        console.log(newarray)
        console.log(listaid)
        li.remove();
    });
};

const drawMaterias = (name,nota,creditos,id) => {
    listaid.push(id)
    const li = document.createElement('li');
    li.classList.add("inputs")
    li.setAttribute("id",id)
    const content = `
    <input type="text" placeholder="nombre materia obsional" data-materia value="${name}" >
    <input type="number" data-nota  value="${nota}" >
    <input type="number" data-creditos class="input_numbers" value="${creditos}" > 
    <button class="btn_delete" data-delete ><i class="fa-solid fa-trash"></i></button>   
    `;
    li.innerHTML = content
    const delet = li.querySelector("[data-delete]");
    // delet.addEventListener('click',() => {
        
    // })
    remover(li,id,delet); 
    return li
};
if (listaDematerias.length <= 0) {
    display(savestorage);
}
else{
    display(listaDematerias);
}


const resetear = () => {
    const materiasTotales = document.querySelectorAll(".inputs")
    materiasTotales.forEach((materia) => {
        materia.remove()
    })
};

add.addEventListener("click",() => {
    const id = uuid.v4();
    tabla.appendChild(drawMaterias('','','',id)); 
       
});

reset.addEventListener("click",()=>{   
    resetear()
});


btnCalc.addEventListener('click',() => {
    savessesion()
    const h = []
    calcularpap(h)
});

const savessesion = () => {
    listaDematerias = []
    listaid.forEach((id) => {
        const materia = document.getElementById(id)
        const namer = materia.querySelector("[data-materia]");
        const nota = materia.querySelector("[data-nota]");
        const creditos = materia.querySelector("[data-creditos]");
        
        const materiaOBJ = {
        name : namer.value,
        nota : nota.value,
        creditos : creditos.value,
        id : id
        }
        listaDematerias.push(materiaOBJ)
    })  
  sessionStorage.setItem('materia',JSON.stringify(listaDematerias))
};

btnSave.addEventListener('click',(savestorage) => {
    console.log("cambioa aplicados")
    savessesion()
    savestorage = listaDematerias
    localStorage.setItem("materia",JSON.stringify(savestorage))
});

const calcularpap = (creditospornota) => {
    let sumacreditos = 0
    let sumacreditospornota = 0
    listaDematerias.forEach((materia) => {
        let nota = materia.nota;
        let creaditos = materia.creditos;
        creaditos = creaditos * 1
        sumacreditos = sumacreditos + creaditos
        //console.log(nota * creaditos)
        creditospornota.push(nota * creaditos)
    })
    creditospornota.forEach((nota) => {
        sumacreditospornota = nota + sumacreditospornota
        
    })
    
    PAPA = sumacreditospornota / sumacreditos
    console.log(PAPA)

    results.textContent = PAPA.toFixed(2)
}

