export default class Donacion {
    #idDonacion: string;
    #idDonador: string;
    #idProyecto: string;
    #fechaDonacion: string;
    #monto: number;
    
    constructor (
        idDonacion = '',
        idProyecto = '',
        idDonador = '',
        fechaDonacion = '',
        monto = 0.00
    ){
        this.#idDonacion = idDonacion,
        this.#idProyecto = idProyecto,
        this.#idDonador = idDonador,
        this.#fechaDonacion = fechaDonacion,
        this.#monto = monto
    }

    //getters
    get getIdDonacion(): string{
        return this.#idDonacion;
    }
    get getIdDonador(): string{
        return this.#idDonador;
    }
    get getIdProyecto(): string{
        return this.#idProyecto;
    }
    get getFechaDonacion(): string{
        return this.#fechaDonacion;
    }
    get getMonto(): number{
        return this.#monto
    }

    toJson(){
        return {
            idDonacion: this.#idDonacion,
            idProyecto: this.#idProyecto,
            idDonante:  this.#idDonador,
            fecha_donacion: this.#fechaDonacion,
            monto_donado:   this.#monto
        }
    }
}