export default class Usuario {
    #idUsuario: string;
    #admin: boolean;
    #activa: boolean;
    #nombre: string;
    #cedula: string;
    #areaTrabajo: string;
    #presupuesto: number;
    #telefono: string;
    #correo: string;
    #password: string;

    /**
     * Constructor de clase Usuario
     * @param {string} idUsuario            - ID única generada al ser guardado en RealTime Database de firebase
     * @param {string} admin                - Nombre completo del usuario
     * @param {string} nombre               - Nombre completo del usuario
     * @param {string} cedula               - Valor id del usuario para identificar
     * @param {string} areaTrabajo          - Departamento en el cual está trabajando
     * @param {string} presupuesto          - Dinero inicial con el que se empieza o se tiene
     * @param {string} telefono             - Número de teléfono de trabajo
     * @param {string} correo               - Correo electrónico de trabajo
     * @param {string} password             - Contraseña del usuario
    */
    constructor (
        idUsuario = '',
        nombre = '',
        cedula = '',
        areaTrabajo = '',
        presupuesto = 0.0,
        telefono = '',
        correo = '',
        password = '',
        admin = false,
        activa = true
    ){
        this.#idUsuario = idUsuario,
        this.#admin = admin,
        this.#activa = activa,
        this.#nombre = nombre,
        this.#cedula = cedula
        this.#areaTrabajo = areaTrabajo,
        this.#presupuesto = presupuesto,
        this.#telefono = telefono,
        this.#correo = correo,
        this.#password = password
    }

    //getters
    get getIdUsuario(): string{
        return this.#idUsuario;
    }
    get isAdmin(): boolean{
        return this.#admin;
    }
    get isActiva(): boolean{
        return this.#activa;
    }
    get getNombre(): string{
        return this.#nombre;
    }
    get getCedula(): string{
        return this.#cedula;
    }
    get getAreaTrabajo(): string{
        return this.#areaTrabajo;
    }
    get getPresupuesto(): number{
        return this.#presupuesto;
    }
    get getTelefono(): string{
        return this.#telefono;
    }
    get getCorreo(): string{
        return this.#correo;
    }
    get getPassword(): string{
        return this.#password;
    }
}