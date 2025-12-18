import { LitElement, html, css } from "lit";

export class CharacterModal extends LitElement {
    static get properties() {
        return{
            character: { type: Object }
        }
    }

    render() {
        if (!this.character) {
            return html``;
        }

        return html `
            <div class="modal">
                <div class="back-drop" @click="${this.close}"/>

                <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${this?.character?.name} biografia">
                    <div class="container">
                        <div class="img-container">
                            <img src="${this.character.image}" alt="${this.character.name}"/>
                        </div>

                        <div class="info-container">
                            <div class="name-container">
                                <h2>${this.character.name}</h2>
                                <button @click="${this.close}">X</button>
                            </div>

                            <div class="character-container">
                                <p><span>Estatus:</span> ${this.readField(this.character.status)}</p>
                                <p><span>Especie:</span> ${this.readField(this.character.species)}</p>
                                <p><span>Género:</span> ${this.readField(this.character.gender)}</p>
                                <p><span>Origen:</span> ${this.readField(this.character.origin)}</p>
                                <p><span>Última ubicación:</span> ${this.readField(this.character.location)}</p>
                                <p><span>Núm. De épisodios:</span> ${Array.isArray(this.character.episode) ? this.character.episode.length : this.readField(this.character.episode)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ============ MÉTODOS DEL COMPONENTE ================ //
    // ----- Método para convertir arreglo de datos en strings ------ //
    readField(value) {
        if (!value) return 'Unknown'
        if (typeof value === 'string') return value
        if (Array.isArray(value)) return value.length ? value.join(', ') : 'Unknown'
        if (typeof value === 'object') return (value.name ?? JSON.stringify(value))
        return String(value)
    }

    // ------- Método para ocultar modal de biografía ------//
    close() {
        this.dispatchEvent(new CustomEvent('close', {
            bubbles: true,
            composed: true
        }));
    }

    static get styles() {
        return css`
            .modal {
                position: fixed;
                inset: 0;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                box-sizing: border-box;
            }
            
            .back-drop {
                position: absolute;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                animation: fadeIn 200ms ease forwards;
                z-index: 1;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            .modal-panel {
                position: relative;
                z-index: 2;
                width: min(100%, 56rem);
                max-width: 56rem;
                box-sizing: border-box;
                max-height: calc(100vh - 2rem);
                overflow-y: auto; /* El scroll ahora está solo en el panel */
                -webkit-overflow-scrolling: touch;
                background-color: #111827;
                color: white;
                border-radius: 1rem;
                padding: 1rem;
                box-shadow: 0 20px 25px rgba(0,0,0,.4);
                transform: scale(0.95) translateY(1rem);
                opacity: 0;
                animation: modalIn 200ms ease forwards;
                /* Aseguramos que se mantenga centrado */
                margin: auto;
            }
            
            @media (min-width: 768px) {
                .modal-panel {
                    padding: 1.5rem; /* md:p-6 */
                }
            }

            @keyframes modalIn {
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            .container {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            @media (min-width: 768px) {
                .container {
                    flex-direction: row;
                    gap: 1.5rem;
                    align-items: stretch;
                }
            }
            
            .img-container {
                width: 100%;
                background-color: #ecfeff;
                border-radius: 0.5rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                aspect-ratio: 4 / 5;
            }
            
            @media (min-width: 768px) {
                .img-container {
                    width: 40%;
                    aspect-ratio: auto;
                }
            }
            
            .img-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 0.5rem;
                display: block;
            }
            
            .info-container {
                width: 100%;
            }
            
            @media (min-width: 768px) {
                .info-container {
                    width: 60%;
                }
            }
            
            .name-container {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                margin-bottom: 1rem;
            }
            
            @media (min-width: 768px) {
                .name-container {
                    margin-bottom: 0rem;
                }
            }
            
            .name-container h2 {
                font-size: 1.25rem;
                font-weight: 700;
                color: #a3e635;
            }
            
            @media (min-width: 768px) {
                .name-container h2 {
                    font-size: 1.5rem;
                }
            }
            
            .name-container button {
                margin-left: 1rem;
                font-size: 1.5rem;
                color: #d1d5db;
                background: none;
                border: none;
                cursor: pointer;
                line-height: 1;
                transition: color 150ms ease;
            }
            
            .name-container button:hover {
                color: #ffffff;
            }
            
            .character-container {
                margin-top: 1rem;
                background-color: #1f2937;
                border: 2px solid #fcd34d;
                border-radius: 0.5rem;
                padding: 1rem;
                font-size: 0.875rem;    
            }
            
            @media (min-width: 768px) {
                .character-container {
                    font-size: 1rem;
                }
            }
            
            .character-container p {
                margin-bottom: 0.5rem
            }
            
            .character-container span {
                font-weight: 600;
            }
        `;
    }
}

customElements.define('character-modal', CharacterModal);