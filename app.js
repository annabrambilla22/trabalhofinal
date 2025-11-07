/*
 * IMPORTANTE: SEGURANÇA DO SISTEMA DE LOGIN
 * 
 * Este é um projeto demonstrativo para fins educacionais.
 * Em um ambiente real de produção, NUNCA:
 * 1. Armazene senhas no frontend
 * 2. Compare credenciais no lado do cliente
 * 3. Use localStorage para tokens sem proteção adequada
 * 
 * Para uma implementação segura, use:
 * - HTTPS para todas as requisições
 * - Backend com hashing de senhas (bcrypt)
 * - Tokens JWT ou similar para sessões
 * - Serviços de autenticação (Auth0, Firebase Auth, etc.)
 */

// Credenciais de demonstração
const DEMO_CREDENTIALS = {
    username: 'usuarioDemo',
    password: 'senha123'
};

// Array de músicas da Lana Del Rey
const playlist = [
    {
        titulo: "A&W",
        artista: "Lana Del Rey",
        duracao: "7:14",
        album: "Did You Know That There's a Tunnel Under Ocean Blvd",
        capa: "https://i.scdn.co/image/ab67616d00001e02a048415db06a5b6fa7ec4e1a"
    },
    {
        titulo: "Born to Die",
        artista: "Lana Del Rey",
        duracao: "4:46",
        album: "Born to Die",
        capa: "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526"
    },
    {
        titulo: "Video Games",
        artista: "Lana Del Rey",
        duracao: "4:42",
        album: "Born to Die",
        capa: "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526"
    },
    {
        titulo: "Summertime Sadness",
        artista: "Lana Del Rey",
        duracao: "4:25",
        album: "Born to Die",
        capa: "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526"
    },
    {
        titulo: "Young and Beautiful",
        artista: "Lana Del Rey",
        duracao: "3:56",
        album: "The Great Gatsby",
        capa: "https://i.scdn.co/image/ab67616d00001e02aa27db6acf7746348cd9436c"
    },
    {
        titulo: "Say Yes to Heaven",
        artista: "Lana Del Rey",
        duracao: "3:56",
        album: "Single",
        capa: "https://i.scdn.co/image/ab67616d00001e0289a154d42dff1199f8e0c301"
    },
    {
        titulo: "Diet Mountain Dew",
        artista: "Lana Del Rey",
        duracao: "3:43",
        album: "Born to Die",
        capa: "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526"
    },
    {
        titulo: "Venice Bitch",
        artista: "Lana Del Rey",
        duracao: "9:37",
        album: "Norman Fucking Rockwell!",
        capa: "https://i.scdn.co/image/ab67616d00001e025a8d40fc3b2403bfa0eb91b7"
    }
];

// Gerenciamento de Estado da Aplicação
let isAuthenticated = false;

// Elementos do DOM
const loginScreen = document.getElementById('loginScreen');
const mainScreen = document.getElementById('mainScreen');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');

/*
 * MANIPULAÇÃO DO DOM
 * O DOM (Document Object Model) é a representação em árvore do HTML.
 * Usamos querySelector e getElementById para interagir com elementos.
 * innerHTML permite inserir conteúdo HTML de forma dinâmica.
 */

// Função que cria o HTML de um card de música
function criarCardMusica(musica) {
    return `
        <div class="song-card">
            <img src="${musica.capa}" alt="Capa de ${musica.titulo}" style="width: 100%; border-radius: 4px;">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <p class="album">${musica.album}</p>
            <p class="duracao">${musica.duracao}</p>
        </div>
    `;
}

// Função que mostra todas as músicas na tela
function mostrarMusicas() {
    const containerMusicas = document.getElementById('songs');
    const htmlMusicas = playlist.map(musica => criarCardMusica(musica)).join('');
    containerMusicas.innerHTML = htmlMusicas;
}

// Função de busca de músicas
function buscarMusicas(termo) {
    termo = termo.toLowerCase();
    
    const musicasFiltradas = playlist.filter(musica => 
        musica.titulo.toLowerCase().includes(termo) || 
        musica.artista.toLowerCase().includes(termo) ||
        musica.album.toLowerCase().includes(termo)
    );
    
    const containerMusicas = document.getElementById('songs');
    
    if (musicasFiltradas.length > 0) {
        const htmlMusicas = musicasFiltradas.map(musica => criarCardMusica(musica)).join('');
        containerMusicas.innerHTML = htmlMusicas;
    } else {
        containerMusicas.innerHTML = '<p class="no-results">Nenhuma música encontrada</p>';
    }
}

// Funções de Autenticação
function login(username, password) {
    /* 
     * AVISO DE SEGURANÇA:
     * Em um ambiente real, NUNCA faça comparação de senhas no frontend!
     * Use HTTPS + backend com hashing adequado + tokens JWT
     */
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        isAuthenticated = true;
        loginScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        mostrarMusicas();
        return true;
    }
    return false;
}

function logout() {
    isAuthenticated = false;
    mainScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    loginForm.reset();
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        loginError.textContent = 'Por favor, preencha todos os campos';
        return;
    }
    
    if (login(username, password)) {
        loginError.textContent = '';
    } else {
        loginError.textContent = 'Usuário ou senha incorretos';
    }
});

searchInput.addEventListener('input', (e) => {
    const termo = e.target.value;
    if (termo) {
        buscarMusicas(termo);
    } else {
        mostrarMusicas();
    }
});

logoutBtn.addEventListener('click', logout);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Comece mostrando a tela de login
    mainScreen.classList.add('hidden');
});