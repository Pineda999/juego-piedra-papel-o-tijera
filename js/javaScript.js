let contadorUser = 0;
let contadorMaquina = 0;
let dificultad = "";
let rondas = 0;

/* Eleccion de la dificultad */
function elegirDificultad(){
    /* Alert para escoger la dificultad */
   Swal.fire({
        title: "Selecciona la dificultad",
        html: `
            <div class="dificultad-container">

                <button id="btnFacil" class="dif-btn nivel-medio" style="background:#4CAF50;">
                    😄 Fácil
                </button>

                <button id="btnMedio" class="dif-btn nivel-medio" style="background:#FFC107;"> 
                    😎 Medio
                </button>

                <button id="btnDificil" class="dif-btn nivel-medio"" style="background:#F44336;">
                    😈 Difícil
                </button>
            </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
    });

    setTimeout(() => {
        document.getElementById("btnFacil").addEventListener("click", () => setDificultad("facil","El ganador sera quien complete los 3 intentos",3));
        document.getElementById("btnMedio").addEventListener("click", () => setDificultad("medio","El ganador sera quien complete los 4 intentos",4));
        document.getElementById("btnDificil").addEventListener("click", () => setDificultad("dificil","El ganador sera quien complete los 5 intentos",5));
    }, 50);
}

/* Indicacion y la dificultad */
function setDificultad(nivel,inforganador,intentos) {
    /* Alerta que muestra las indicaciones y la dificultad */
    Swal.fire({
        icon: "success",
        title: "Dificultad seleccionada",
        html: 
        `<p>
            ${inforganador}
        </p>
        Modo: ${nivel.toUpperCase()}`,
        confirmButtonText: "Continuar"
    });

    /*Variables donde se guarda la dificultad y las rondas para ser el ganador */
    dificultad = nivel;
    rondas = intentos;

}

/* la Dificultad que el usuario ha escogido  */
function partida(signo){
    jugador = signo ;

    /*Verifica la dificultad*/
    if (dificultad == "facil"){
        const maquina = maquinafacil();
        ganador(maquina);
    }else if(dificultad == "medio"){
        const maquina = maquinaMedio();
        ganador(maquina);
    }else if(dificultad == "dificil"){
        const maquina = maquinaSuperDificil();
        console.log(jugador + maquina); 
        ganador(maquina);
    }
}

/*Dificultad de la maquina: Fail */
function maquinafacil(){
    const opciones = ["piedra","papel","tijera"];
    return opciones[Math.floor(Math.random()*3)];
}

/*Dificultad de la maquina: MEDIO */
function maquinaMedio(){
    let prob = Math.random();

    // 30% de probalidad de ganar
    if (prob < 0.3){
        if (jugador === "piedra") return "papel";
        if (jugador === "papel") return "tijera";
        if (jugador === "tijera") return "piedra";
    }

    // 70% de random

    const opciones= ["piedra","papel","tijera"];
    return opciones[Math.floor(Math.random() * 3)];
}

/* Dificultad de la maquina: DIFICIL */
function maquinaSuperDificil(){
    let prob = Math.random();

    // 70% de probalidad de ganar
    if (prob < 0.7){
        if (jugador === "piedra") return "papel";
        if (jugador === "papel") return "tijera";
        if (jugador === "tijera") return "piedra";
    }

    // 30% de random

    const opciones= ["piedra","papel","tijera"];
    return opciones[Math.floor(Math.random() * 3)];
}

/* Agregar puntos al ganador de la ronda y dar al ganador de la partida */
function ganador(maquina){

    
    /*Agrega el punto conforme al ganador de la ronda */
    if(jugador==maquina){
        alertGaneEmpate("Empate","../img/aprenton.gif")
    }else if(jugador=='piedra' && maquina=='papel'){
        alertGaneEmpate("Gana la maquina", "../img/burla.gif")
        puntosMaquina();
    }else if(jugador =='piedra' && maquina=='tijera'){
        alertGaneEmpate("Ganaste", "../img/user.gif")
        puntosUsuario();
    }else if(jugador=='papel' && maquina=='piedra'){
        alertGaneEmpate("Ganaste", "../img/user.gif")
        puntosUsuario();
    }else if(jugador=='papel' && maquina=='tijera'){
        alertGaneEmpate("Gana la maquina", "../img/burla.gif")
        puntosMaquina();
    }else if(jugador=='tijera' && maquina=='papel'){
        alertGaneEmpate("Ganaste", "../img/user.gif")
        puntosUsuario();
    }else if(jugador=='tijera' && maquina=='piedra'){
        alertGaneEmpate("Gana la maquina", "../img/burla.gif")
        puntosMaquina();
    }

    /* verifica quien es el ganador de la partida */
    if(rondas == contadorUser){
        ganadorPartida("Has ganado la partida", "../img/ganadoruser.gif");
    }else if(rondas == contadorMaquina){
         ganadorPartida("Ha ganado la maquina", "../img/gameover.gif");
    }
}

/* Puntuacion de la maquina en cada ronda*/
function puntosMaquina(){
    const Ganador = document.getElementById("ganadormaquina");
    Ganador.innerHTML = contadorMaquina +=1;
}

/* Puntuacion del usuario en cada ronda*/
function puntosUsuario(){
    const ronda = document.getElementById('ganadoruser');
        ronda.innerHTML = contadorUser+=1;
}

/* Alerta despues de cada ronda, muestra quien gana el punto o si hay empate */
function alertGaneEmpate(mensaje, img){
    Swal.fire({
        title: mensaje,
        imageUrl: img,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
    })
}

/* Mostrar al ganador */
function ganadorPartida(mensaje,img){
    Swal.fire({
        title: mensaje,
        html: 
        `<div style="display:flex; justify-content:center; gap:15px;" > 
            <p> Usuario: <span style="color:#ee2d2d;">${contadorUser}</span> </p>   
            <p> Maquina: <span style="color:#0000ff;">${contadorMaquina}</span></p>
        </div> `,
        imageUrl: img,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
    }).then((result)=>{
        if(result.isConfirmed){
            // reiniciar variables
            contadorUser = 0;
            contadorMaquina = 0;
            dificultad = "";
            rondas = 0;

            // actualizar el DOM
            document.getElementById("ganadoruser").innerHTML = contadorUser;
            document.getElementById("ganadormaquina").innerHTML = contadorMaquina;

            elegirDificultad();
        }
    });
}

elegirDificultad();