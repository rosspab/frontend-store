//Variables
const formulario = document.querySelector('#formulario'); //aprobado
const listaTweets = document.querySelector('#lista-tweets'); //aprobado
let tweets = []; //aprobado

//Events Listeners //aprobado
eventListeners(); //aprobado

function eventListeners() { //aprobado
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet); //aprobado

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        crearHTML();
    });   
} //aprobado

//Funciones
function agregarTweet(e) { //aprobado
    e.preventDefault(); //aprobado

    //Obteniendo el valor del input
    const tweet = document.querySelector('#tweet').value; //aprobado

    // Validando
    if(tweet === '') { //aprobado
        mostrarError('Un mensaje no puede ir vacio'); //aprobado

        return; //evita que se ejecuten mas lineas de codigo //aprobado
    } //aprobado

    const tweetObj = {  //aprobado
        id: Date.now(),  //aprobado
        tweet //es igual a tweet: tweet //aprobado
    } //aprobado

    //Anadir al arreglo de tweets
    tweets = [...tweets, tweetObj]; //aprobado

    //Una vez agregado crear el html //aprobado
    crearHTML(); //aprobado

    // Reiniciar el formulario
    formulario.reset();
} //aprobado

// Mostrar mensaje de error
function mostrarError(error) { //aprobado
    const mensajeError = document.createElement('p'); //aprobado
    mensajeError.textContent = error; //aprobado
    mensajeError.classList.add('error'); //aprobado

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido'); //aprobado
    contenido.appendChild(mensajeError); //aprobado

    setTimeout(() => { //aprobado
        mensajeError.remove(); //aprobado
    }, 3000); //aprobado
} //aprobado

//Muestra estado de los tweets
function crearHTML() {  //aprobado
    limpiarHTML();

    if(tweets.length > 0) { //aprobado
        tweets.forEach( tweet => { //aprobado
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            //Anadir la funcion de eliminar
            btnEliminar.onclick= () => {
                borrarTweet(tweet.id);
            }

            //crear html
            const li = document.createElement('li'); //aprobado

            // Anadir al texto
            li.innerText = tweet.tweet;


            //Asignar el boton
            li.appendChild(btnEliminar);

            //insertarlo en el html
            listaTweets.appendChild(li);
        });
    } //aprobado

    sincronizarStorage();
} //aprobado

//Agrega los tweets actuales a local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id != id);

    crearHTML();
}

// Limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}