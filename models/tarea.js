const { v4: uuidv4 } = require("uuid"); //paquete uuid crea id unico

//CREA UNA CLASE (comienza con mayuscula)
class Tarea {
  constructor(descripcion) {
    this.id = uuidv4();
    this.descripcion = descripcion;
    this.completado = null;
  }
}

module.exports = Tarea;
