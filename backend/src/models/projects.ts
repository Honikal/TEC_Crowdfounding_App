export default class Proyecto {
    #idProyecto: string;
    #idCreador: string;
    #activa: boolean;
    #nombre: string;
    #descripcion: string;
    #categoria: string[];
    #objetivoFinanciero: number;
    #fondosRecaudados: number;
    #fechaCreacion: string;
    #fechaLimite: string;
    #media: string[];

    /**
     * Constructor de clase Proyectos
     * @param {string} idProyecto            - ID única generada al ser guardado en RealTime Database de firebase
     * @param {string} idCreador             - ID única generada en RDB Firebase, referenciando al usuario creador
     * @param {boolean} activa               - Nombre completo del proyecto
     * @param {string} nombre                - Nombre completo del proyecto
     * @param {string} descripcion           - Descripción del proyecto a realizarse
     * @param {string[]} categoria           - Categoría o método de categorización de un proyecto
     * @param {float} objetivoFinanciero     - Objetivo financiero o dinero esperado a recolectarse
     * @param {string} fechaLimite           - Fecha en la que se espera llegar a recaudar el objetivo financiero antes de cerrar el proyecto
     * @param {string} fechaCreacion         - Fecha en la que se espera llegar a recaudar el objetivo financiero antes de cerrar el proyecto
     * @param {string[]} media               - Grupos de id's o distintos valores de identificación para tomar fotos o videos del proyecto
    */
    constructor (
        idProyecto = '',
        idCreador = '',
        activa = true,
        nombre = '',
        descripcion = '',
        categoria = [],
        objetivoFinanciero = 0.0,
        fondosRecaudados = 0.0,
        fechaCreacion = '',
        fechaLimite = '',
        media: string[] = []
    ){
        this.#idProyecto = idProyecto,
        this.#idCreador = idCreador,
        this.#activa = activa,
        this.#nombre = nombre,
        this.#descripcion = descripcion,
        this.#categoria = categoria,
        this.#objetivoFinanciero = objetivoFinanciero,
        this.#fondosRecaudados = fondosRecaudados,
        this.#fechaCreacion = fechaCreacion,
        this.#fechaLimite = fechaLimite,
        this.#media = media
    }

    //getters
    get getIdProyecto(): string{
        return this.#idProyecto;
    }
    get getIdCreador(): string{
        return this.#idCreador;
    }
    get isActiva(): boolean{
        return this.#activa;
    }
    get getNombre(): string {
        return this.#nombre;
    }
    get getDescripcion(): string {
        return this.#descripcion;
    }
    get getCategoria(): string[]{
        return this.#categoria;
    }
    get getObjetivoFinanciero(): number {
        return this.#objetivoFinanciero;
    }
    get getFondosRecaudados(): number {
        return this.#fondosRecaudados;
    }
    get getFechaCreacion(): string {
        return this.#fechaCreacion;
    }
    get getFechaLimite(): string {
        return this.#fechaLimite;
    }
    get getMedia(): string[] {
        return this.#media;
    }

    toJson(){
        return {
            idProyecto: this.#idProyecto,
            id_creador: this.#idCreador,
            activa: this.#activa,
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            categorias: this.#categoria,
            fecha_creacion: this.#fechaCreacion,
            fecha_limite: this.#fechaLimite,
            fondos_recaudados: this.#fondosRecaudados,
            objetivo_financiero: this.#objetivoFinanciero,
            media: this.#media
        }
    }
}