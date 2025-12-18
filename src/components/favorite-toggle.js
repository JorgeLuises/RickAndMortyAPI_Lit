import { LitElement, html, css } from "lit";

export class FavoriteToggle extends LitElement {
    static get properties() {
        return {
            showFavorites: { type: Boolean }
        }
    }

    render() {
        return html `
            <div class="container" @click=${this.toggle} role="button" tabindex="0">
                <span class="label ${this.showFavorites ? 'favorites' : 'all'}">
                    ${this.showFavorites ? 'Ver todos' : 'Ver favoritos'}
                </span>

                <div class="switch ${this.showFavorites ? 'favorites' : 'all'}">
                    <div class="knob ${this.showFavorites ? 'favorites' : 'all'}">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="heart-icon ${this.showFavorites ? 'favorites' : 'all'}"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }

    // ============ MÉTODOS DEL COMPONENTE ================ //
    // ------ Método para mostrar el menú de personajes fav o generales ----- //
    toggle() {
        this.showFavorites = !this.showFavorites;
        
        this.dispatchEvent(new CustomEvent('toggle-favorites', { 
            detail: { showFavorites: this.showFavorites }, 
            bubbles: true, 
            composed: true 
        }));
    }

    static get styles() {
        return css `
            .container {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                cursor: pointer;
            }

            .label {
                font-weight: 700;
                transition: color 0.3s ease;
            }

            .label.favorites {
                color: #f9a8d4;
            }

            .label.all {
                color: #9ca3af;
            }

            .container:hover .label.all {
                color: #e5e7eb;
            }

            .switch {
                position: relative;
                width: 4rem;
                height: 2rem;
                display: flex;
                align-items: center;
                border-radius: 9999px;
                padding: 0.25rem;
                transition: background-color 0.3s ease;
            }

            .switch.favorites {
                background-color: #db2777;
            }

            .switch.all {
                background-color: #374151;
            }

            .knob {
                background-color: #ffffff;
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 9999px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transform: translateX(0);
                transition: transform 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .knob.favorites {
                transform: translateX(2rem);
            }

            .knob.all {
                transform: translateX(0);
            }

            .heart-icon {
                width: 1rem;
                height: 1rem;
                transition: color 0.3s ease;
            }

            .heart-icon.favorites {
                color: #db2777;
                fill: #db2777;
            }

            .heart-icon.all {
                color: #9ca3af;
                fill: none;
            }
        `;
    }
}

customElements.define('favorite-toggle', FavoriteToggle);