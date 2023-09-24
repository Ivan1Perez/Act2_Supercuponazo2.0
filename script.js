//Declaración de variables:
let numSelectedOrGenerated = prompt(
  "BIENVENIDO AL SUPERCUPONAZO\n" +
    "Elija una de las siguientes opciones:\n" +
    "   - Seleccionar número de forma manual --> Pulse[1]\n" +
    "   - Generar número de forma aleatoria --> Pulse[2]"
);

let numJugadorString;
let numSerieJugadorString;
let numNormalesJugadorString;
let cantidadCuponazos;
let costeTotal;
let numPremiadoString;
let seriePremiadaString;
let numNormalesPremiadoString;
let esJugador = true;
let premiosTotales = 0;

//Declaración de funciones:

function selectNum() {
  numSerieJugadorString = selectNumSerie();
  numNormalesJugadorString = selectNumNormales();

  numJugadorString = numSerieJugadorString + " " + numNormalesJugadorString
  return numJugadorString;
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

function genRandomNum(esJugador) {
  let randomNum;
  let numSerieString = "";
  let numNormalesString = "";
  let numGeneradoString = "";

  for (let i = 0; i < 3; i++) {
    randomNum = Math.floor(Math.random() * 10);
    numSerieString += randomNum.toString();
  }

  for (let i = 0; i < 5; i++) {
    randomNum = Math.floor(Math.random() * 10);
    numNormalesString += randomNum;
  }

  if (esJugador) {
    numSerieJugadorString = numSerieString;
    numNormalesJugadorString = numNormalesString;
    numGeneradoString = numSerieString + " " + numNormalesString;

    return numGeneradoString;
  } else {
    seriePremiadaString = numSerieString;
    numNormalesPremiadoString = numNormalesString;
    numGeneradoString = numSerieString + " " + numNormalesString;

    return numGeneradoString;
  }
}

function elegirCantidadCuponazos() {
  let cantidad = prompt("¿Cuántos cuponazos quiere jugar?");

  do {
    if (
      isNaN(cantidad.toString()) ||
      cantidad.trim() === "" ||
      cantidad.toString() === "0"
    ) {
      cantidad = prompt("Error. Ha de introducir un número mayor que 0:");
    }
  } while (
    isNaN(cantidad.toString()) ||
    cantidad.trim() === "" ||
    cantidad.toString() === "0"
  );

  return cantidad;
}

function desgloseInfo() {
  console.log("Desglose de información:");

  console.log("Su número: " + numJugadorString);
  console.log("Cantidad de sorteos a jugar: " + cantidadCuponazos);
  console.log("Coste total: " + costeTotal + "€");
}

function cParaContinuar() {
  let continuar = prompt(
    "En la consola podrá ver el desglose de información.\n" +
      "Introduzca 'c' para continuar con la simulación de sorteos."
  );

  do {
    if (continuar !== "c") {
      continuar = prompt(
        "Error. La tecla introducida no es correcta\n" +
          "Introduzca 'c' para continuar con la simulación de sorteos."
      );
    }
  } while (continuar !== "c");
}

function siempreMismoNumeroFunction() {
  let isSiempreMismoNumero = false;
  let respuestaUsuario = prompt(
    "¿Quiere jugar siempre con el mismo número?\n" +
      "Introduzca 's' en caso afirmativo.\n" +
      "Introduzca 'n' si quiere que se genere un número aleatorio para cada sorteo."
  );

  do {
    if (respuestaUsuario !== "s" && respuestaUsuario !== "n") {
      respuestaUsuario = prompt(
        "Error. La tecla introducida no es válida.\n" +
          "Introduzca 's' si quiere jugar siempre con el mismo número.\n" +
          "Introduzca 'n' si quiere que se genere un número aleatorio para cada sorteo."
      );
    }
  } while (respuestaUsuario !== "s" && respuestaUsuario !== "n");

  if (respuestaUsuario === "s") {
    isSiempreMismoNumero = true;
  }

  return isSiempreMismoNumero;
}

function simularSorteos(siempreMismoNumero) {
  let index = 1;

  do {
    console.log("Sorteo (" + index + "/" + cantidadCuponazos + ").");
    if(!siempreMismoNumero){
      numJugadorString = genRandomNum(esJugador);
    }
    console.log("Su número: " + numJugadorString);
    numPremiadoString = genRandomNum(!esJugador);
    console.log("Número premiado: " + numPremiadoString);
    comprobarPremios(
      numSerieJugadorString,
      numNormalesJugadorString,
      seriePremiadaString,
      numNormalesPremiadoString
    );
    index++;
  } while (index <= cantidadCuponazos);
}

function comprobarPremios(
  numSerieJugadorString,
  numNormalesJugadorString,
  seriePremiadaString,
  numNormalesPremiadoString
) {
  let index = 0;
  let indexReverso = 4;
  let acierto = true;
  let aciertosPrimerosNumeros = 0;
  let aciertosUltimosNumeros = 0;
  let aciertosTotales = 0;
  let isPrimerosNumeros = true;

  while (acierto && index < 5) {
    if (numNormalesJugadorString[index] === numNormalesPremiadoString[index]) {
      aciertosPrimerosNumeros++;
    } else {
      acierto = false;
    }
    index++;
  }

  acierto = true;

  if (numPremiadoString === numJugadorString) {
    premiosTotales += 6000000;
    console.log("!HA GANADO EL SUPERCUPONAZO! TE LLEVAS 6.000.000€.");
  } else {
    if (aciertosPrimerosNumeros !== 5) {
      while (acierto && indexReverso >= 0) {
        if (
          numNormalesJugadorString[indexReverso] ===
          numNormalesPremiadoString[indexReverso]
        ) {
          aciertosUltimosNumeros++;
        } else {
          acierto = false;
        }
        indexReverso--;
      }
    }

    if (aciertosPrimerosNumeros !== 0 && aciertosUltimosNumeros !== 0) {
      if (aciertosPrimerosNumeros > aciertosUltimosNumeros) {
        aciertosTotales = aciertosPrimerosNumeros;
      } else if (aciertosPrimerosNumeros === aciertosUltimosNumeros) {
        aciertosTotales = aciertosPrimerosNumeros;
      } else {
        isPrimerosNumeros = false;
        aciertosTotales = aciertosUltimosNumeros;
      }
    }

    registroPremios(isPrimerosNumeros, aciertosTotales);
  }
}

function registroPremios(isPrimerosNumeros, aciertosTotales) {
  let cadenaAux = "primera";

  if (!isPrimerosNumeros) {
    cadenaAux = "última";
  }

  switch (aciertosTotales) {
    case 0:
      console.log("Número no premiado.");
      break;

    case 1:
      console.log(
        "¡Premio! Has acertado la " + cadenaAux + " cifra. Te llevas 3€."
      );
      premiosTotales += 3;
      break;

    case 2:
      console.log(
        "¡Premio! Has acertado las " + cadenaAux + "s 2 cifras. Te llevas 6€."
      );
      premiosTotales += 6;
      break;

    case 3:
      console.log(
        "¡Premio! Has acertado las " + cadenaAux + "s 3 cifras. Te llevas 50€."
      );
      premiosTotales += 50;
      break;

    case 4:
      console.log(
        "¡Premio! Has acertado las " + cadenaAux + "s 4 cifras. Te llevas 500€."
      );
      premiosTotales += 500;
      break;

    case 5:
      console.log("¡Premio! Has acertado las 5 cifras. Te llevas 40.000€.");
      premiosTotales += 40000;
      break;

    default:
      break;
  }
}

//Código juego:

do {
  if (numSelectedOrGenerated === "1") {
    numJugadorString = selectNum();
  } else if (numSelectedOrGenerated === "2") {
    numJugadorString = genRandomNum(esJugador);
  } else {
    numSelectedOrGenerated = prompt(
      "Error. Ha de pulsar '1' o '2' para continuar.\n" +
        "Elija una de las siguientes opciones:\n" +
        "   - Seleccionar número de forma manual --> Pulse[1]\n" +
        "   - Generar número de forma aleatoria --> Pulse[2]"
    );
    if (numSelectedOrGenerated === "1") {
      numJugadorString = selectNum();
    } else if (numSelectedOrGenerated === "2") {
      numJugadorString = genRandomNum(esJugador);
    }
  }
} while (numSelectedOrGenerated !== "1" && numSelectedOrGenerated !== "2");

console.log(
  "Su número es el --> " +
    numSerieJugadorString +
    " " +
    numNormalesJugadorString
);

cantidadCuponazos = elegirCantidadCuponazos();

costeTotal = cantidadCuponazos * 3;

console.clear();
desgloseInfo();

cParaContinuar();

siempreMismoNumero = siempreMismoNumeroFunction();

simularSorteos(siempreMismoNumero);

console.log("Dinero total de premios percibidos: " + premiosTotales + "€.");
console.log("Coste total: " + costeTotal + "€");
console.log("Balance final: " + (premiosTotales - costeTotal) + "€.");
