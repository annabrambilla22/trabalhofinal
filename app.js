// Array de objetos com as músicas
// Cada música tem título, artista, duração e uma URL de capa (podem ser substituídas por URLs reais)
const playlist = [
    {
        titulo: "Young and Beautiful",
        artista: "Lana Del Rey",
        duracao: "3:56",
        capa: "https://upload.wikimedia.org/wikipedia/en/8/8c/Young_and_Beautiful_cover.png"
    },
    {
        titulo: "Summertime Sadness",
        artista: "Lana Del Rey",
        duracao: "4:25",
        capa: "https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png"
    },
    {
        titulo: "Video Games",
        artista: "Lana Del Rey",
        duracao: "4:42",
        capa: "https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png"
    },
    {
        titulo: "Born to Die",
        artista: "Lana Del Rey",
        duracao: "4:46",
        capa: "https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png"
    },
    {
        titulo: "Say Yes to Heaven",
        artista: "Lana Del Rey",
        duracao: "3:56",
        capa: "https://upload.wikimedia.org/wikipedia/en/a/a4/Say_Yes_to_Heaven_-_Lana_Del_Rey.png"
    }
];

// Função que cria o HTML de um card de música
function criarCardMusica(musica) {
    return `
        <div class="song-card">
            <img src="${musica.capa}" alt="Capa de ${musica.titulo}" style="width: 100%; border-radius: 4px;">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <p class="duracao">${musica.duracao}</p>
        </div>
    `;
}

// Função que mostra todas as músicas na tela
function mostrarMusicas() {
    // Pega o elemento onde vamos colocar as músicas
    const containerMusicas = document.getElementById('songs');
    
    // Para cada música no array, cria um card e adiciona ao HTML
    const htmlMusicas = playlist.map(musica => criarCardMusica(musica)).join('');
    
    // Coloca todos os cards no container
    containerMusicas.innerHTML = htmlMusicas;
}

// Função de busca de músicas
function buscarMusicas(termo) {
    // Converte o termo de busca para minúsculo para comparação
    termo = termo.toLowerCase();
    
    // Filtra as músicas que correspondem ao termo de busca
    const musicasFiltradas = playlist.filter(musica => 
        musica.titulo.toLowerCase().includes(termo) || 
        musica.artista.toLowerCase().includes(termo)
    );
    
    // Pega o container e limpa o conteúdo atual
    const containerMusicas = document.getElementById('songs');
    
    // Se encontrou músicas, mostra elas. Se não, mostra mensagem
    if (musicasFiltradas.length > 0) {
        const htmlMusicas = musicasFiltradas.map(musica => criarCardMusica(musica)).join('');
        containerMusicas.innerHTML = htmlMusicas;
    } else {
        containerMusicas.innerHTML = '<p class="no-results">Nenhuma música encontrada</p>';
    }
}

// Adiciona o evento de busca ao input
document.getElementById('searchInput').addEventListener('input', (e) => {
    const termo = e.target.value;
    if (termo) {
        buscarMusicas(termo);
    } else {
        mostrarMusicas(); // Se a busca estiver vazia, mostra todas as músicas
    }
});

// Quando a página carregar, mostra todas as músicas
document.addEventListener('DOMContentLoaded', mostrarMusicas);