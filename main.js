const nombre=document.getElementById('name')
const apellido=document.getElementById('lastName')
const fechaNacimiento=document.getElementById('nacimiento')
const documento=document.getElementById('cedula')
const submit=document.getElementById('submit')
const cumpleaños=document.getElementById('cumpleaños')
const validationCumpleaños=document.getElementById('validation_años')
const cedula=document.getElementById('cedula_busqueda')
const search=document.getElementById('search')
let cedulaExport=0;
let mes=0;
let day=0;
let Array=[];
let newArray=[]
let resultado=0;
let cont=0;
let nuevosObjetos=[]
let onload=[]

class Person{
    
    constructor(nombre,apellido,edad,documento){
        this.nombre=nombre
        this.apellido=apellido
        this.edad=edad
        this.documento=documento
    }

    nombreCompleto(){
        const nombreCom=cumpleaños.innerHTML+=`<div class="border">${this.nombre} ${this.apellido}</div>`
        return nombreCom
    }
    validationcumple(mes,dia,diaActual,mesActual){
        if(mes==mesActual && dia==diaActual){
            validationCumpleaños.innerHTML+=`<div > SI </div>`
        }else{
            console.log(mesActual,mes,dia,diaActual)
            validationCumpleaños.innerHTML+='<div > NO </div>' 
        }
    }
}
function getData(){
    let person= new Person(nombre.value,apellido.value,validarEdad(fechaNacimiento.value),documento.value)
    validacionDeCampos(person)
    console.log(Array[0])
    Array[cont].nombreCompleto()
    cont++;
}

function validarEdad(resultado){
    const fecha=new Date(resultado)
    resultado=fecha.getFullYear()
    mes=fecha.getMonth()+1
    day=fecha.getDate()+1
    let f = new Date();
    const diaActual=f.getDate()
    const fechaActual=f.getFullYear()
    const mesActual=f.getMonth()+1
    validationcumple(mes,day,diaActual,mesActual)
    console.log(mes)
    console.log(day)
    console.log(resultado)
    let result=fechaActual-resultado
    if(mes<mesActual){
        if(day<diaActual){
            result-1;
        }
    }
    return result+' años'
}

submit.addEventListener('click',()=>{
    getData()
})

function validacionDeCampos(person){

    if(nombre.value=='' || apellido.value=='' || documento.value=='' || fechaNacimiento==''){
        alert('completa todos los campos')
    }else{
        Array.push(person)
        console.log(Array)
    }
}

function validationcumple(mes,dia,diaActual,mesActual){
    if(mes==mesActual && dia==diaActual){
        validationCumpleaños.innerHTML+=`<div> SI </div>`
    }else{
        console.log(mesActual,mes,dia,diaActual)
        validationCumpleaños.innerHTML+='<div> NO </div>' 
    }
}

function nosFuimos(element,indice){
    localStorage.clear();
    newArray.push(element[indice].nombre)
    newArray.push(element[indice].apellido)
    newArray.push(mes)
    newArray.push(day)
    const seNosFue=localStorage.setItem('objeto',JSON.stringify(newArray))
    const objetoOriginal=localStorage.setItem('original',JSON.stringify(Array))
    return seNosFue,objetoOriginal
}



search.addEventListener('click',()=>{
    if(cedula.value==''){
        alert('campo vacio')
    }else{
        Array.forEach((element,indice) => {
            if(element.documento==parseInt(cedula.value)){
                let contando=indice
                nosFuimos(Array,contando)
                location.href="./vista.html"
            }else{
                console.log(cedula.value)
                console.log(element.documento)
            }
        });
    }
})

function volvemos(){
    nuevosObjetos= JSON.parse(localStorage.getItem('original'))
    for(i=0;i<nuevosObjetos.length;i++){
        onload.push(new Person(nuevosObjetos[i].nombre,nuevosObjetos[i].apellido,nuevosObjetos[i].edad,nuevosObjetos[i].documento)) 
        console.log(onload[i]);
        onload[i].nombreCompleto()
        validarEdad(onload[i].fechaNacimiento)
    }
}

window.addEventListener('load',()=>{
    volvemos()
})