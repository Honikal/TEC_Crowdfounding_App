export default class Donacion {
    #idDonacion: string;
    #idDonador: string;
    #idProyecto: string;
    #fechaDonacion: string;
    #horaDonacion: string;
    #monto: number;
    
    constructor (
        idDonacion = '',
        idProyecto = '',
        idDonador = '',
        fechaDonacion = '',
        horaDonacion = '',
        monto = 0.00
    ){
        this.#idDonacion = idDonacion,
        this.#idProyecto = idProyecto,
        this.#idDonador = idDonador,
        this.#fechaDonacion = fechaDonacion,
        this.#horaDonacion = horaDonacion,
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
    get getHoraDonacion(): string{
        return this.#horaDonacion;
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
            hora_donacion: this.#horaDonacion,
            monto_donado:   this.#monto
        }
    }
}