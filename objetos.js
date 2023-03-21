let objetos=JSON.parse(localStorage.getItem('objeto'))
const nombre=document.getElementById('nombre')
const apellido=document.getElementById('apellido')
const mensaje=document.getElementById('mensaje')
let newData=new Date();
let dia=newData.getDate();
let month=newData.getMonth()+1;

if(dia==objetos[3] && month==objetos[2]){
    mensaje.innerHTML='HAPPY BIRTH DAY'
}else{
    mensaje.innerHTML=`HELLOW ${objetos[0]}`
}
nombre.innerHTML=objetos[0]
apellido.innerHTML=objetos[1]