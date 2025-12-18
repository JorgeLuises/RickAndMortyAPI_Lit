import { LitElement, html, css } from "lit";

export class PaginationController extends LitElement {
    static get properties() {
        return {
            currentPage: { type: Number },
            totalPages: { type: Number }
        }
    }

    render() {
        const isFirstPage = this.currentPage === 1;
        const isLastPage = this.currentPage === this.totalPages;
        
        return html`
             <div class="container">
                <button
                class="${isFirstPage ? 'disabled' : 'active'}"
                ?disabled=${isFirstPage}
                @click="${this.handlePrevious}"
                >
                    Anterior
                </button>

                <span class="page-indicator">
                    Pagina <span class="current">${this.currentPage}</span> de ${this.totalPages}
                </span>

                <button
                class="${isLastPage ? 'disabled' : 'active'}"
                ?disabled=${isLastPage}
                @click="${this.handleNext}"
                >
                    Siguiente
                </button>
            </div>
        `;
    }

    // ========== Métodos del componente ============= //
    // ------ Método de pagina anterior -----//
    handlePrevious() {
        if (this.currentPage > 1) {
            this.dispatchEvent(new CustomEvent('page-change', {
                detail: { page: this.currentPage - 1 },
                bubbles: true,
                composed: true
            }));
        }
    }

    // ------ Método de pagina siguiente -----//
    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.dispatchEvent(new CustomEvent('page-change', {
                detail: { page: this.currentPage + 1 },
                bubbles: true,
                composed: true
            }));
        }
    }

    static get styles() {
        return css`
            .container {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: rgba(17, 24, 39, 0.9);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                border-top: 1px solid #374151;
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1.5rem;
                z-index: 50;
                box-sizing: border-box;
            }

            button {
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-weight: 700;
                border: 2px solid;
                transition: all 0.3s ease;
                cursor: pointer;
                background: none;
                font-family: inherit;
            }

            button.active {
                border-color: #22c55e;
                color: #4ade80;
            }

            button.active:hover {
                background-color: #22c55e;
                color: #000000;
            }

            button.disabled {
                opacity: 0.5;
                cursor: not-allowed;
                border-color: #4b5563;
                color: #6b7280;
            }

            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                border-color: #4b5563;
                color: #6b7280;
            }

            .page-indicator {
                color: #d1d5db;
                font-family: 'Courier New', monospace;
            }

            .page-indicator .current {
                color: #facc15;
                font-weight: 700;
            }
        `;
    }
}

customElements.define('pagination-controller', PaginationController);