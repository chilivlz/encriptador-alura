const campo_texto = document.querySelector("#texto-original");
const campo_mensaje = document.querySelector("#campo-mensaje");
const elementoOculto = document.querySelector(".posicionar__boton");
const elementoOculto2 = document.querySelector(".text-area2__desencriptador");
const ocultarElemento = document.querySelector(".text-area__desencriptador");
const copiarElemento = document.querySelector(".button__desencriptar");
const ocultarElemento2 = document.querySelector(
  ".text-area__desencriptador-alternativo"
);

const matriz_code = [
  ["a", "a?"], //indice 2
  ["e", "%nt%r"], //indice 0

  ["o", "ober"], //indice 3
  ["u", "ufat"], //indice 4
  ["i", ".$es"], //indice 1
];

function limpiarMensaje() {
  // Limpiar el mensaje si el usuario hace clic en el área de texto
  campo_texto.value = "";

  campo_texto.removeEventListener("click", limpiarMensaje);
  campo_texto.removeEventListener("keypress", limpiarMensaje);
}

function btnEncriptar() {
  const texto = campo_texto.value;
  // console.log(texto);
  // encriptar(texto);
  // console.log(encriptar(texto))
  if (/[A-Z!@#$%^&*()_+={}\[\]:;"'|\\<,>.?/]/.test(texto)) {
    campo_texto.value =
      "No se puede encriptar el texto porque contiene mayúsculas o símbolos.";
    campo_texto.addEventListener("click", limpiarMensaje);
    campo_texto.addEventListener("keypress", limpiarMensaje);

    return; // Detener la función si se encuentran mayúsculas o símbolos
  }

  campo_mensaje.value = encriptar(texto);
  // console.log(campo_mensaje.value)
  elementoOculto.style.display = "block";
  elementoOculto2.style.display = "block";

  ocultarElemento.style.display = "none";
  ocultarElemento2.style.display = "none";
  console.log(campo_mensaje.value);
}

campo_mensaje.addEventListener("click", function () {
  // Limpiar el mensaje si el usuario hace clic en el área de texto
  campo_mensaje.value = "";
});

campo_texto.addEventListener("keypress", function (event) {
  // Verificar si la tecla presionada es Enter (código 13)
  if (event.key === "Enter") {
    // Ejecutar la función de encriptación
    btnEncriptar();
  }
});

function encriptar(fraseEncriptada) {
  for (let i = 0; i < matriz_code.length; i++) {
    if (fraseEncriptada.includes(matriz_code[i][0])) {
      fraseEncriptada = fraseEncriptada.replaceAll(
        matriz_code[i][0],
        matriz_code[i][1]
      );
    }
  }
  return fraseEncriptada;
}

function btnDesencriptar() {
  const texto = campo_texto.value.toLowerCase();
  // console.log(texto);
  // encriptar(texto);
  // console.log(encriptar(texto))
  campo_mensaje.value = desencriptar(texto);
  // console.log(campo_mensaje.value)
  elementoOculto.style.display = "block";
  ocultarElemento.style.display = "none";
}

function desencriptar(fraseEncriptada) {
  for (let i = 0; i < matriz_code.length; i++) {
    if (fraseEncriptada.includes(matriz_code[i][1])) {
      fraseEncriptada = fraseEncriptada.replaceAll(
        matriz_code[i][1],
        matriz_code[i][0]
      );
    }
  }
  return fraseEncriptada;
}

copiarElemento.addEventListener("click", () => {
  contenidoCopiado = campo_mensaje.value;
  navigator.clipboard.writeText(contenidoCopiado);
});
