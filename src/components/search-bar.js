import { LitElement, html, css } from "lit";

export class SearchBar extends LitElement {
    static get properties() {
        return {
            searchQuery: { type: String },
        }
    }

    render() {
        return html`
            <form>
                <div class="icon-container">
                    <svg 
                        aria-hidden="true" 
                        class="search-icon" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>

                <input
                    type="search"
                    .value=${this.searchQuery}
                    @input=${this.handleSearch}
                    placeholder="Buscar personaje por nombre"
                />

                ${this.searchQuery && this.searchQuery.length > 0 ? html`
                <button
                    type="button"
                    class="clear-button"
                    @click=${this.clearSearch}
                >
                    Clear
                </button>
                ` : ''}
            </form>
        `;
    }

    // ============ MÉTODOS DEL COMPONENTE ================ //
    // ----- Método para realizar busqueda ----- //
    handleSearch(e) {
        this.searchQuery = e?.target?.value ?? '';
        this.dispatchEvent(new CustomEvent('searching', {
            detail: { character: this.searchQuery },
            bubbles: true,
            composed: true,
        }));
    }

    clearSearch(e) {
        e?.preventDefault();
        this.searchQuery = '';
        this.dispatchEvent(new CustomEvent('searching', {
            detail: { character: this.searchQuery },
            bubbles: true,
            composed: true,
        }));
    }

    static get styles() {
        return css`
            form {
                position: relative;
                width: 100%;
            }

            @media (min-width: 768px) {
                form {
                    max-width: 36rem;
                }
            }

            .icon-container {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                display: flex;
                align-items: center;
                padding-left: 0.75rem;
                pointer-events: none;
            }

            .search-icon {
                width: 1.25rem;
                height: 1.25rem;
                color: #06b6d4;
            }

            input[type="search"] {
                display: block;
                width: 100%;
                padding: 1rem;
                padding-left: 2.5rem;
                font-size: 0.875rem;
                background-color: transparent;
                border: 2px solid #06b6d4;
                border-radius: 9999px;
                color: #06b6d4;
                transition: border-color 0.3s ease, color 0.3s ease;
            }

            input[type="search"]::placeholder {
                color: #9ca3af;
            }

            input[type="search"]:focus {
                outline: none;
                border-color: #facc15;
            }

            .clear-button {
                position: absolute;
                right: 0.625rem;
                bottom: 0.625rem;
                background-color: #facc15;
                color: #000000;
                font-weight: 500;
                border-radius: 9999px;
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .clear-button:hover {
                background-color: #eab308;
            }

            .clear-button:focus {
                outline: none;
                box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.5);
            }
        `;
    }
}

customElements.define('search-bar', SearchBar);