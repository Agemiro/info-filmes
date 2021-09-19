const nomeBusca = document.querySelector(".input");//Acessando a classe(retorna o obj) 
const mensagemErro = document.querySelector("#mensagemErro");
const botaoBuscar = document.querySelector("#botao_buscar");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const diretor = document.querySelector("#diretor");
const atores = document.querySelector("#atores");
const poster = document.querySelector(".poster");
const sinopse = document.querySelector("#sinopse");

const apiKey = "cc9360b9";
const imgDefault = "./default_image.png";

//async: Indica que a função possui código assíncrono.
//await: Indica um ponto a ser aguardado pelo código.
async function buscaFilme(nomeBusca){
     const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
     return resposta.json();
}

botaoBuscar.addEventListener("click", () => {
     limparCampos();
     core();
});

function limparCampos() {
     titulo.textContent = "";
     sinopse.textContent = "";
     ano.textContent = "";
     duracao.textContent = "";
     genero.textContent = "";
     atores.textContent = "";
     diretor.textContent = "";
     poster.setAttribute("src", imgDefault);
}

async function core() {
     try {
          const filme = await buscaFilme(nomeBusca.value);
          validaDados(filme);
          defineValores(filme);
     } catch (erro) {
          console.log(erro);
          mensagemErro.textContent = `${erro}`;
     }
}

function defineValores(filme) {
     titulo.textContent = filme.Title;
     sinopse.textContent = filme.Plot;
     ano.textContent = `Year: ${filme.Year}`;
     duracao.textContent = `Run time: ${filme.Runtime}`;
     genero.textContent = `Genre: ${filme.Genre}`;
     atores.textContent = `Actors: ${filme.Actors}`;
     diretor.textContent = `Director: ${filme.Director}`;
     poster.setAttribute("src", filme.Poster);
}

function validaDados(filme) {
     if(filme.Plot === undefined || filme.Year === undefined || filme.Actors === "N/A"){
          throw new Error("Filme não foi encontrado!");
     }
}
