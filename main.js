// Mostra o Tipo e a Fraqueza

 //  (^_^)   //
//   <|_|>   //
//    / \    //

const input = document.querySelector("#busca");
const info = document.querySelector("#info");

//  para armazenar as fraquezas dos tipos de Pokémon
const fraquezasPorTipo = {
  fogo: ["agua", "terra", "pedra"],
  agua: ["eletrico", "grama"],
  eletrico: ["terra"],
  grama: ["fogo", "gelo", "veneno", "voador", "inseto"],
  // Adicione outros tipos conforme necessário
};

// Função para encontrar fraquezas com base nos tipos do Pokémon
function encontrarFraquezas(tipos) {
  let fraquezas = [];
  tipos.forEach(tipo => {
    if (fraquezasPorTipo[tipo]) {
      fraquezas = [...fraquezas, ...fraquezasPorTipo[tipo]];
    }
  });
  return [...new Set(fraquezas)];
}

//buscar Pokémon ao pressionar Enter
input.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const nome = event.target.value; // O que o usuário digitou no campo

    try {
      // Fazendo a requisição à API do Pokémon
      const resultado = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome.toLowerCase());

      // Verifica se a resposta da API foi bem-sucedida
      if (resultado.ok) {
        const dados = await resultado.json();

        // Montando o objeto com os dados do Pokémon
        const pokemon = {
          nome: dados.name,
          imagem: dados.sprites.front_default,
          altura: parseInt(dados.height) / 10,
          peso: parseInt(dados.weight) / 10,
          tipos: dados.types.map(t => t.type.name),
        };

        // Encontrando as fraquezas com base nos tipos
        const fraquezas = encontrarFraquezas(pokemon.tipos);

        // Exibindo os dados do Pokémon na página
        info.innerHTML = "<h1>" + pokemon.nome + "</h1>";
        info.innerHTML += '<img src="' + pokemon.imagem + '">';
        info.innerHTML += "<p>Altura: " + pokemon.altura + " metros </p>";
        info.innerHTML += "<p>Peso: " + pokemon.peso + " kg </p>";
        info.innerHTML += "<p>Tipos: " + pokemon.tipos.join(", ") + "</p>";
        info.innerHTML += "<p>Fraquezas: " + fraquezas.join(", ") + "</p>";

        // Tornando a div de informações visível
        info.style.display = 'block';
      } else {
        // Se o Pokémon não for encontrado, exibe uma mensagem e alerta
        info.innerHTML = "<p>Pokémon não encontrado. Tente novamente.</p>";
        info.style.display = 'block';
        
        // Exibe um alerta para o usuário
        alert("Pokémon não encontrado. Tente novamente.");
      }
    } catch (error) {
      // Em caso de erro na requisição (ex: problemas de rede)
      info.innerHTML = "<p>Ocorreu um erro. Tente novamente mais tarde.</p>";
      info.style.display = 'block';
      
      // Exibe um alerta de erro
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
  }
});
