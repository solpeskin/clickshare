const paginasIndex = ["", "src/paginas/footer/", "./src/"]
const paginasSrc = ["../../../index.html", "./", "../../"];

function footer (link){
    let footer = document.querySelector ("header");
    footer.innerHTML = 
        `<nav class="menu-mobile"> 
            <svg class="bi bi-list list-mobile" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg> 
            <div class= "allMenu">
                <div class="menu-paginas"> 
                    <a href="${link[0]}#inicio" class="clickshare" >CLICK&SHARE</a>
                    <ul class="items-menu ">  
                        <li class="botonHeader  "><a href="${link[0]}#pasos" >Pasos</a></li>
                        <li class="botonHeader"><a class= "black" href="${link[0]}#ustedes">Ustedes</a></li>
                        <li class="botonHeader help"  "><a class= "black" href="${link[1]}centro-de-ayuda.html">Ayuda</a></li>
                    </ul>
                </div> 
                <div class="espacio"></div>
                <div class="botones">
                    <button class="botonHeader iniciar-sesion "><a href="${link[2]}paginas/iniciar-sesion.html">Iniciar sesión</a></button>   
                    <button class="botonHeader registrarse"><a href="${link[2]}paginas/registrar.html">Registrarse</a></button>
                </div> 
            </div>                      
        </nav> 
            `
}

function pickLink (){
    document.getElementById("Pindex")&&footer(paginasIndex);
    document.getElementById("Pfooter")&&footer(paginasSrc);
}

pickLink();


