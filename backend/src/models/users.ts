export enum UserRole {
    REGULAR = 'regular',
    ADMIN = 'admin',
    MENTOR = 'mentor'
}

export default class Usuario {
    #idUsuario: string;
    #activa: boolean;
    #nombre: string;
    #cedula: string;
    #areaTrabajo: string;
    #presupuesto: number;
    #categoriasPreferidas: string[];
    #telefono: string;
    #correo: string;
    #password: string;
    #role: UserRole;
    #mentorPrize?: number;

    constructor (
        idUsuario = '',
        nombre = '',
        cedula = '',
        areaTrabajo = '',
        presupuesto = 0.0,
        telefono = '',
        correo = '',
        password = '',
        activa = true,
        categoriasPreferidas = [],
        role: UserRole = UserRole.REGULAR,
        mentorPrize?: number, //Opcional para mentores
    ){
        this.#idUsuario = idUsuario;
        this.#role = role;
        this.#activa = activa;
        this.#nombre = nombre;
        this.#cedula = cedula;
        this.#areaTrabajo = areaTrabajo;
        this.#categoriasPreferidas = categoriasPreferidas;
        this.#presupuesto = presupuesto;
        this.#telefono = telefono;
        this.#correo = correo;
        this.#password = password;
        this.#mentorPrize = mentorPrize;
    }

    //getters
    get getIdUsuario(): string{
        return this.#idUsuario;
    }
    //Validación para roles
    get getRole(): UserRole{
        return this.#role;
    }
    get isAdmin(): boolean{
        return this.#role === UserRole.ADMIN;
    }
    get isRegular(): boolean{
        return this.#role === UserRole.REGULAR;
    }
    get isMentor(): boolean{
        return this.#role === UserRole.MENTOR;
    }
    get mentorPrize(): number | undefined {
        return this.#mentorPrize;
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
    get getCategorias(): string[] {
        return this.#categoriasPreferidas;
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