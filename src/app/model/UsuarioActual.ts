export class UsuarioActual {
    public _id: string;
    public nombre: string;
    public correo: string;
    public contraseña: string;

    private static usuarioActual:UsuarioActual;

    constructor () {
        this._id = "";
        this.nombre = "";
        this.correo = "";
        this.contraseña = "";
    }

    public static getInstance():UsuarioActual {
        if( this.usuarioActual === undefined ) {
              this.usuarioActual = new UsuarioActual();
          }
          return this.usuarioActual;
      }

}