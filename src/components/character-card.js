import { LitElement, html, css } from "lit";
import "./character-modal.js"

export class CharacterCard extends LitElement {
    static get properties() {
        return {
            character: { type: Object },
            showBio: { type: Boolean },
            favCharacters: { type: Array }
        };
    }

    constructor() {
        super();
        this.showBio = false;
    }

    render() {
        if (!this.character) {
            return html``;
        }

        return html`
            <div class="card">
                <div class="image-container" @click="${this.openBio}">
                    <img src="${this.character?.image}" alt="${this.character?.name}"/>

                    <div class="status-container">
                        <p class="${this.character?.status === 'Alive' ? 'alive'
                : this.character?.status === 'Dead' ? 'dead'
                    : 'unknown'}">
                            ${this.character?.status}
                        </p>
                    </div>
                </div>

                <div class="name-container" @click="${this.openBio}">
                    <h2>${this.character?.name}</h2>
                    <p>${this.character?.species} - ${this.character?.gender}</p>
                </div>

                <div class="botons-container">
                    <button class="biography-button" @click="${this.openBio}">Biografía</button>
                    <button class="${this.isFavorite ? 'btn-fav-active' : 'btn-fav'}"
                    @click="${this.addFavorite}">
                        ${this.isFavorite ? 'Quitar Fav 💔' : 'Agregar Fav ❤️'}
                    </button>
                </div>
            </div>

            ${this.showBio ? html`<character-modal .character="${this.character}" @close="${this.closeBio}"></character-modal>` : ''}
        `;
    }

    // ============ MÉTODOS DEL COMPONENTE ================ //
    // --------- Método para mostrar y ocultar biografía de personaje -------//
    openBio() {
        this.showBio = true;
    }

    closeBio() {
        this.showBio = false;
    }

    // ----------- Getter para saber si el personaje es favorito o no -------- //
    get isFavorite() {
        return this.favCharacters?.some(fav => fav.id === this.character.id) || false;
    }

    // ---------- Método para agregar personaje a favoritos ------ //
    addFavorite() {
        this.dispatchEvent(new CustomEvent('toggle-favorite', {
            detail: { character: this.character },
            bubbles: true,
            composed: true,
        }))
    }

    static get styles() {
        return css`
            :host {
                display: block;
                width: 100%;
                box-sizing: border-box;
            }

            .card {
                width: 100%;
                max-width: 20rem;
                background-color: #111827;
                border: 2px solid #374151;
                border-radius: 1.5rem;
                padding: 1rem;
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
                display: flex;
                flex-direction: column;
                gap: 1rem;
                transition: all 300ms ease;
            }
            .card:hover {
                box-shadow: 0 10px 15px rgba(34, 197, 94, 0.2);
                transform: scale(1.05);
                border-color: #facc15;
                background-color: #06b6d4;
            }
            .image-container {
                width: 100%;
                aspect-ratio: 1 / 1;
                background-color: #1f2937;
                border-radius: 1rem;
                border: 2px solid #4b5563;
                overflow: hidden;
                position: relative;
            }
            .image-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: opacity 300ms ease;
            }
            .status-container {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.5rem 0.5rem;
                border-radius: 0.5rem;
                font-size: 1rem;
                font-weight: bold;
                border-width: 1px;
            }
            .status-container .alive {
                background-color: rgba(20, 83, 45, 0.8);
                border-color: #22c55e;
                color: #86efac;
                padding: 0.25rem;
                border-radius: 0.5rem;
            }
            .status-container .dead {
                background-color: rgba(127, 29, 29, 0.8);
                border-color: #ef4444;
                color: #fca5a5;
                padding: 0.25rem;
                border-radius: 0.5rem;
            }
            .status-container .unknown {
                background-color: rgba(55, 65, 81, 0.8);
                border-color: #6b7280;
                color: #d1d5db;
                padding: 0.25rem;
                border-radius: 0.5rem;
            }
            .name-container {
                background-color: #1f2937;
                border: 2px solid #4b5563;
                border-radius: 1rem;
                padding: 0.75rem;
                text-align: center;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
            }
            .name-container h2 {
                font-size: 1.5rem;
                font-weight: 700;
                color: #a3e635;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .name-container p {
                font-size: 1rem;
                color: #9ca3af;
                margin-top: 0.25rem;
            }
            .botons-container {
                display: flex;
                gap: 0.75rem;
                margin-top: auto;
            }
            .biography-button {
                flex: 1;
                background-color: #374151;
                color: white;
                font-size: 0.875rem;
                font-weight: 600;
                padding: 0.5rem 0;
                border-radius: 0.75rem;
                border: 1px solid #4b5563;
                cursor: pointer;
                transition: background-color 200ms, border-color 200ms;
            }
            .biography-button:hover {
                background-color: #2563eb;
                border-color: #60a5fa;
            }
            .btn-fav {
                flex: 1;
                background-color: #374151;
                color: white;
                border: 1px solid #4b5563;
                border-radius: 0.75rem;
            }

            .btn-fav:hover {
                background-color: #db2777;
                border-color: #f472b6;
            }
            .btn-fav-active {
                flex: 1;
                background-color: #db2777;
                color: white;
                border: 1px solid #db2777;
                border-radius: 0.75rem;
            }
            .btn-fav-active:hover {
                background-color: #be185d; /* pink-700 */
            }
        `;
    }
}

customElements.define('character-card', CharacterCard);