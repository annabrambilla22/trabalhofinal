// Array de objetos com as músicas
// Cada música tem título, artista, duração e uma URL de capa (podem ser substituídas por URLs reais)
const playlist = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        duracao: "5:55",
        capa: "https://picsum.photos/200/200"
    },
    {
        titulo: "Imagine",
        artista: "John Lennon",
        duracao: "3:03",
        capa: "https://picsum.photos/200/200"
    },
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        duracao: "3:56",
        capa: "https://picsum.photos/200/200"
    },
    {
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        duracao: "5:56",
        capa: "https://picsum.photos/200/200"
    },
    {
        titulo: "Billie Jean",
        artista: "Michael Jackson",
        duracao: "4:54",
        capa: "https://picsum.photos/200/200"
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