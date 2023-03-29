'use strict';

/******EFECTTO BUSCADOR********/

const buscando = document.getElementById('buscando');
const inputBuscar = document.getElementById('input_buscar');
const listado = document.getElementById('listPrice')
const fragment = new DocumentFragment();
const tem = document.getElementById('template').content;


buscando.addEventListener('click', ()=>{
    if(inputBuscar.classList.contains("buscarOculto")){
        inputBuscar.classList.revome("buscarOculto");
        inputBuscar.classList.add("buscarVisible");
    }else if(inputBuscar.classList.contains("buscarVisible")){
        inputBuscar.classList.remove("buscasVisible");
        inputBuscar.classList.add("buscarOculto");

    }
});


/**CONSUMO CON FETCH **/
fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response=> response.json())
    .then(data=> console.log(data))
    .finally(console.log('Hemos finalizado con la peticion'))
    .catch(error => console.error('Se ha presentado un error'+error));

/**CONSUMO DE API CON AXIOS Y UTILIZACION DE ASYNC / AWAIT **/

async function obtenerLista(){
    const resp = await axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((response)=>{
        const resultados = response.data.results;
        console.log(resultados);
        let poke = [];
        for(const i in resultados){
            poke.push(resultados[i]);
        }
        return poke;
    } )
    .catch((error)=>{
        console.log("Se ha generado un error en la peticion" +error);
        return 0;
    });

    return resp;
}

const data = await obtenerLista();

const testTemplate = "content" in document.createElement("template");

if(testTemplate){
    data.forEach(element => {
        tem.querySelector("#code").innerHTML = `Código ${element.name}`;
        tem.querySelector("#detail").innerHTML = `Código ${element.url}`;
        const myElement = tem.cloneNode(true);
        fragment.appendChild(myElement);
    });

}
listado.appendChild(fragment);