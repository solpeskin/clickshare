function searchGroupByID (groupID){

    db.collection("grupos")
    .doc(`${groupID}`) 
    .get()
    .then((res)=>{
        userGroups.push (res.data())
        domGrupo(res.data()) 
    })
}

// crear grupo en html
function domGrupo(grupo){
    let fotoPerfil;

    if (grupo.foto){
        fotoPerfil = `<img src="${grupo.foto}">`
    }

    else {
        fotoPerfil = 
        `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
        </svg>`
    }

    const nuevoGrupoHTML = ` <div class="grupoInfo">
                                <div class="grupoIMG" id="${grupo.id}" >
                                    <div class="foto-perfil-grupo" title="Abrir grupo" onclick="openPhotos ('${grupo.id}')">
                                        ${fotoPerfil}
                                    </div>
                                    <div class="edit-group" onclick="abrirEditarGrupo('${grupo.id}')">
                                        <button title="Editar grupo"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg></button>
                                    </div>
                                </div>
                                <h6>${grupo.nombre}</h6>
                            </div>`

    document.querySelector("#allGroups").innerHTML += (nuevoGrupoHTML)
}

// subir grupos a firebase  
function setGroup(username, groups) {
    // subir grupo a aray de grupos en usuario
	db.collection("usuarios")
		.doc(`${username}`)
		.update({
			grupos: groups,
		})
} 

function createGroupOnFb (groupData){
        // crear documento en coleccion "grupos"
        db.collection("grupos").doc(`${groupData.id}`).set({
            foto: groupData.foto,
            shortId:groupData.shortId,
            id: groupData.id,
            nombre: groupData.nombre,
            participantes: groupData.participantes,
            creador: groupData.creador,
            fotos: [],
        })
}

// registrar grupo 
function crearGrupo (){
    if (nombreGrupo.value.trim()){
        let grupoNuevo = {
            foto: "",
            fotos: [],
            shortId: generarID(),
            id: generarUID(),
            nombre: nombreGrupo.value.trim(),
            creador: userData.id,
            participantes: [`${userData.id}`],
        };

        userData.grupos.push(grupoNuevo.id);
        userGroups.push(grupoNuevo)
        
        setGroup(userData.id, userData.grupos)
        createGroupOnFb (grupoNuevo)
        cerrarAdd()
        domGrupo(grupoNuevo);
    }
}

let grupoCambiar;
let photoLink;

function editGroup(grupo){
    grupoCambiar = userGroups.find(group=>group.id == grupo)

    let previewIMG = grupoCambiar.foto ? `<img src="${grupoCambiar.foto}" alt="" class="preview-photo-group">` : previewSVG
    document.querySelector(".new-img-group").innerHTML = previewIMG

    document.querySelector("#enviar-cambios-grupo").onclick = ()=> {
        if (document.querySelector("#new-name-group").value.trim() || document.querySelector(".new-file-group").files[0]){

            if (document.querySelector("#new-name-group").value.trim()){
                userGroups.find(group=>group.id == grupo).nombre = document.querySelector("#new-name-group").value.trim()
            }

            else if (document.querySelector(".new-file-group").files[0]){
                userGroups.find(group=>group.id == grupoCambiar.id).foto = photoLink
            }
    
            actualizarCambioGrupoFB(grupo, grupoCambiar)
            showToastify("Cambios guardados", "#000f33")
            cerrarEditarGrupo()
            cargarPagina()
        }

        else {
            showToastify("No hay ningun cambio", "#000f33")
        }
    }
}

function changeGroupPhoto (file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
        
    reader.addEventListener("load", (e)=>{
        photoLink = e.target.result
        document.querySelector(".new-img-group").innerHTML = `<img src="${photoLink}" alt="" class="preview-photo-group">`
    })
}

document.querySelector(".new-file-group").onchange = function(){
    let file = document.querySelector(".new-file-group").files[0]
    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/svg+xml" || file.type == "image/jpeg"){
        changeGroupPhoto (file)
    }
}

function actualizarCambioGrupoFB(grupo, userGroup){
    db.collection("grupos")
		.doc(`${grupo}`)
		.update({
			nombre: userGroup.nombre,
            foto: userGroup.foto
		})
}

btnCrear.addEventListener("click", ()=> crearGrupo())


