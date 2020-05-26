//variables
const carrito = document.getElementById('carrito'); 
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciaCarritoBtn = document.getElementById('vaciar-carrito');

//lisener 

CargarEventListener();


function CargarEventListener ()
{
    cursos.addEventListener('click',comprarCurso);

    //funcion cuando se elimina un curso del carrito 

    carrito.addEventListener('click',eliminarCurso);
    //btn vaciar todo el carrito
    vaciaCarritoBtn.addEventListener('click',vaciaCarrito);
    //cargar carrito con datos del local storage
    document.addEventListener('DOMContentLoaded',leerLocalStorage);

}

//funciones

//funcion añade el curso al carrito
function comprarCurso (e)
{
    e.preventDefault();
    //delegacion para agregar al carrito
    if(e.target.classList.contains('agregar-carrito'));
    {
        const curso = e.target.parentElement.parentElement;
        //enviar datos del curso a la funcion leer datos curso 
        leerDatosCursos(curso);
        
    }
}

//leer los datos del curso

function leerDatosCursos(curso)
{

    const infoCurso =
    {
        imagen: curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')

    }

    console.log(infoCurso);

    insertarCarrito(infoCurso);
}

//insertar en el carrito el curso seleccionado 
function insertarCarrito(curso)
{
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
                <img src="${curso.imagen}"width="100%">
        </td>
        <td>
                ${curso.titulo} 
        </td>
        <td>
                <p>${curso.precio}</p>
        </td>
        <td>
                <a  href="#" class="borrar-curso" data-id="${curso.id}">X</a> 
        </td>
    
    `;


    listaCursos.appendChild(row);
    alertify.set('notifier','position', 'bottom-left');
    alertify.success('Curso Agregado al carrito');

    //guardar curso en el local Storage
    GuardarLocalStorage(curso);
}


//elimina el curso del carro del DOM
function eliminarCurso(e)
{   
    e.preventDefault();

    let curso , cursoId;
    if (e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement
        cursoId = curso.querySelector('a').getAttribute('data-id');
        
    }
    eliminarCursoLS(cursoId);

}


//vaciar carrito

function vaciaCarrito()
{
    //forma lenta
  //  listaCursos.innerHTML = '';
  //forma rapida
    while(listaCursos.firstChild)
    {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    
    //vaciar carrito local Storage 
    vaciarLocalStorage();
    alertify.set('notifier','position', 'bottom-left');
    alertify.error('Carrito Vaciado');
    return false;

}

//gurdar en curso carrito en  local Storage
function GuardarLocalStorage(curso)
{
    let cursos;
   cursos = obtenerCursosLocalStorage();

    //agrega curso al arreglo del local storage
   cursos.push(curso);

   localStorage.setItem('cursos',JSON.stringify(cursos));

   console.log(cursos);
}


//comprbar que hay elementos en local stoge
function obtenerCursosLocalStorage()
{
    let cursosLS;

    //comprobar si hay algo en local storage

    if(localStorage.getItem('cursos')===null)
    {
        cursosLS = [];
    }
    else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));

    }

    return cursosLS;
}

//imprime los cursos del local storage en el carrito

function leerLocalStorage()
{
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        //contruir temprate
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                    <img src="${curso.imagen}"width="100%">
            </td>
            <td>
                    ${curso.titulo} 
            </td>
            <td>
                    <p>${curso.precio}</p>
            </td>
            <td>
                    <a  href="#" class="borrar-curso" data-id="${curso.id}">X</a> 
            </td>
        
        `;
        
       
    listaCursos.appendChild(row);
    })
}


//eliminar curso del local Storage
function eliminarCursoLS(curso){

    let cursoLS ;
    cursoLS = obtenerCursosLocalStorage();

    cursoLS.forEach(function(cursoLs, index){
        if (cursoLs.id === curso)
        {
            cursoLS.splice(index,1);
        }
    })

    localStorage.setItem('cursos',JSON.stringify(cursoLS));
    alertify.set('notifier','position', 'bottom-left');
    alertify.error('Curso Eliminado');
}

//vaciar localStorage con btn vaciar carrito
function vaciarLocalStorage(){
localStorage.clear();
}
