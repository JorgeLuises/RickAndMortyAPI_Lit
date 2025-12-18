import { LitElement, html, css } from "lit";
import "../components/character-card.js";
import "../components/search-bar.js";
import "../components/favorite-toggle.js";
import "../components/pagination-controller.js";

class HomePage extends LitElement {
    static get properties() {
        return {
            characters: { type: Array },
            favCharacters: { type: Array },
            page: { type: Number },
            totalPages: { type: Number },
            searchQuery: { type: String },
            showFavorites: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.characters = [];
        this.favCharacters = [];
        this.page = 1;
        this.totalPages = 0;
        this.searchQuery = '';
        this.showFavorites = false;
    }

    render() {
        const paginatedCharacters = this.pagination();

        return html `
            <header>
                <h1>The Wubba Lubba Dub Dub Lexicon</h1>
            </header>

            <section>
                <div class="searchbar-container">
                    <search-bar .searchQuery=${this.searchQuery} @searching=${this.handleCharacterSearch}></search-bar>
                </div>

                <div class="toggle-container">
                    <favorite-toggle .showFavorites="${this.showFavorites}" @toggle-favorites="${this.showFavList}"></favorite-toggle>
                </div>
            </section>

            <main @toggle-favorite="${this.handleToggleFavorite}">
                ${
                    !this.showFavorites ?
                    paginatedCharacters.map(character => html`
                        <character-card 
                            .character="${character}" 
                            .favCharacters="${this.favCharacters}">
                        </character-card>
                    `) :
                    paginatedCharacters.map(character => html`
                        <character-card 
                            .character="${character}" 
                            .favCharacters="${this.favCharacters}">
                        </character-card>
                    `)
                }
            </main>

            <footer>
                <pagination-controller
                    .currentPage="${this.page}"
                    .totalPages="${this.totalPages}"
                    @page-change=${this.handlePageChange}
                ></pagination-controller>
            </footer>
        `;
    }

    firstUpdated() {
        this.fetchData(this.page, this.searchQuery);
    }

    // ============ MÉTODOS DEL COMPONENTE ================ //
    // ---------------- Método para obtener personajes ---------//
    async fetchData(page = 1, name = '') {
        const apiUrl = `https://rickandmortyapi.com/api/character/`;
        try {
            const url = name && name.trim().length > 0 ? `${apiUrl}?page=${page}&name=${encodeURIComponent(name)}` : `${apiUrl}?page=${page}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.characters = data.results || [];
            this.totalPages = data.info?.pages ?? this.totalPages;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // --------------- Método para agregar personajes a favoritos --------- //
    handleToggleFavorite(e) {
        const character = e.detail.character;
        const isAlreadyFav = this.favCharacters.some(c => c.id === character.id); 

        if (isAlreadyFav) {
            this.favCharacters = this.favCharacters.filter(c => c.id !== character.id);
        } else {
            this.favCharacters = [...this.favCharacters, character];
        }
    }

    // ------------ Método para cambiar vista de personajes fav y generales ------- //
    showFavList(e) {
        const isChange = e.detail.showFavorites;
        this.showFavorites = isChange;
        this.page = 1;
        if (!this.showFavorites) {
            this.fetchData(this.page, this.searchQuery);
        }
    }

    // ---------- Método para la paginación de personajes ----- //
    pagination() {
        const page_size = 20;
        const start = (this.page - 1) * page_size;
        const end = this.page * page_size;
        if (!this.showFavorites) {
            return this.characters;
        } else {
            const q = (this.searchQuery || '').trim().toLowerCase();
            const filteredFavs = q.length > 0
                ? this.favCharacters.filter(c => (c.name ?? '').toLowerCase().includes(q))
                : this.favCharacters;

            this.totalPages = Math.max(1, Math.ceil(filteredFavs.length / page_size));
            return filteredFavs.slice(start, end);
        }
    }

    handlePageChange(e) {
        const next = e?.detail?.page;
        if (typeof next === 'number' && next >= 1) {
            this.page = next;
            if (!this.showFavorites) this.fetchData(this.page, this.searchQuery);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // ------ Método de busqueda de personaje ------- //
    handleCharacterSearch(e) {
        const characterName = e?.detail?.character ?? '';
        this.searchQuery = characterName;
        this.page = 1;
        if (!this.showFavorites) {
            this.fetchData(this.page, this.searchQuery);
        }
    }

    static get styles() {
        return css `
            header {
                font-size: 1.5rem;
                text-align: center;
                margin-top: 2.5rem;
                margin-left: auto;
                margin-right: auto;
                filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
                letter-spacing: 0.025rem;
                text-transform: uppercase;
                color: transparent;
                -webkit-background-clip: text;
                background-clip: text;
            }
            @media (min-width: 1024px) {
                header {
                    font-size: 3rem;
                }
            }
            header h1 {
                background: linear-gradient(to right, #84cc16, #2bb8ebff);
                color: transparent;
                -webkit-background-clip: text;
                background-clip: text;
            }
            main {
                box-sizing: border-box;
                width: 100%;
                max-width: 1280px;
                margin-left: auto;
                margin-right: auto;
                margin-top: 2.5rem;
                padding: 1.25rem;
                display: grid;
                grid-template-columns: repeat(1, minmax(0, 1fr));
                gap: 3.5rem;
            }
            @media (min-width: 640px) {
                main {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }
            }
            @media (min-width: 768px) {
                main {
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                }
            }
            @media (min-width: 1024px) {
                main {
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                }
            }
            /* Permite que los items del grid se encojan correctamente
               y no provoquen overflow en pantallas pequeñas. */
            main > * {
                min-width: 0;
            }
            section {
                margin-top: 2.5rem;
                display: block;
                max-width: 42rem; /* max-w-2xl */
                margin-left: auto;
                margin-right: auto;
                padding-left: 1rem;
                padding-right: 1rem;
            }

            @media (min-width: 768px) {
                section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }

            .searchbar-container {
                flex: 1 1 0%;
                margin-right: 0;
                margin-bottom: 1rem;
            }

            @media (min-width: 768px) {
                .searchbar-container {
                    margin-right: 2rem;
                    margin-bottom: 0;
                }
            }

            .toggle-container {
                display: flex;
                justify-content: flex-end;
            }

            @media (min-width: 768px) {
                .toggle-container {
                    justify-content: normal;
                }
            }

            footer {
                background-color: #000000;
                color: #ffffff;
                padding-bottom: 6rem;
            }
        `;
    }
}

customElements.define('home-page', HomePage);