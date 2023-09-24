/*
    1. Pedir al usuario que elija el número o que se genere de manera aleatoria.
    2. Preguntarle cuantos supercuponazos (semanas) quiere jugar.
    3. Guardar el coste total.
    4. Generar el número premiado para cada semana.
    5. Comprobar si se ha llevado algún premio y almacenarlo.
    6. Comprobar si le ha tocado el supercuponazo.
    7. Mostrar registro de premios.
*/

//Declaración de variables:
let numSelectedOrGenerated = prompt(
  "BIENVENIDO AL SUPERCUPONAZO\n" +
    "Elija una de las siguientes opciones:\n" +
    "   - Seleccionar número de forma manual --> Pulse[1]\n" +
    "   - Generar número de forma aleatoria --> Pulse[2]"
);

let numJugador;
let numSerieJugador;
let numNormalesJugador;
let cantidadCuponazos;

//Declaración de funciones:

function selectNum() {
  numSerieJugador = selectNumSerie();
  numNormalesJugador = selectNumNormales();

  return parseInt(numSerieJugador + numNormalesJugador);
}

function selectNumSerie() {
  let numSerie = prompt("Introduzca los tres números de la serie:");

  do {
    if (numSerie.length !== 3 || isNaN(numSerie.toString())) {
      numSerie = prompt("Error. Ha de introducir únicamente 3 números:");
    }
  } while (numSerie.length !== 3 || isNaN(numSerie.toString()));

  return numSerie;
}

function selectNumNormales() {
  let numNormales = prompt("Introduzca los 5 números de la serie:");

  do {
    if (numNormales.length !== 5 || isNaN(numNormales.toString())) {
      numNormales = prompt("Error. Ha de introducir únicamente 5 números:");
    }
  } while (numNormales.length !== 5 || isNaN(numNormales.toString()));

  return numNormales;
}

function genRandomNum() {
    let randomNum;
    let numSerieString = "";
    let numNormalesJugadorString = "";

    for(let i = 0; i < 3; i++){
        randomNum = Math.floor(Math.random() * 10);
        numSerieString += randomNum.toString();
    }

    numSerieJugador = parseInt(numSerieString);

    for(let i = 0; i < 5; i++){
        randomNum = Math.floor(Math.random() * 10);
        numNormalesJugadorString += randomNum;
    }

    numNormalesJugador = parseInt(numNormalesJugadorString);

    return parseInt(numSerieJugador + numNormalesJugador);
}

function elegirCantidadCuponazos(){
    let cantidad = prompt('¿Cuántos cuponazos quiere jugar?');
    let condicion = false;

    do {
        //----------------------------------------------------------ESTAMOS AQUÍ---------------------------------
        if(cantidad === ""){
            cantidad = prompt("Error. Ha de introducir un número:");
        }else{
            if (isNaN(cantidad.toString())) {
                cantidad = prompt("Error. Ha de introducir un número:");
            }else{
                condicion = true;
            }
        }
      } while (!condicion);
    
      return cantidad;
}

//Código juego:

do {
  if (numSelectedOrGenerated === "1") {
    numJugador = selectNum();
  } else if (numSelectedOrGenerated === "2") {
    numJugador = genRandomNum();
  } else {
    numSelectedOrGenerated = prompt(
      "Error. Ha de pulsar '1' o '2' para continuar.\n" +
        "Elija una de las siguientes opciones:\n" +
        "   - Seleccionar número de forma manual --> Pulse[1]\n" +
        "   - Generar número de forma aleatoria --> Pulse[2]"
    );
    if (numSelectedOrGenerated === "1") {
      numJugador = selectNum();
    } else if (numSelectedOrGenerated === "2") {
      numJugador = genRandomNum();
    }
  }
} while (numSelectedOrGenerated !== "1" && numSelectedOrGenerated !== "2");

console.log(
  "Su número es el --> " + numSerieJugador + " " + numNormalesJugador
);

cantidadCuponazos = elegirCantidadCuponazos();
console.log('Cantidad de cuponazos:' + cantidadCuponazos);