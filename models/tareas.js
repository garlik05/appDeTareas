const Tarea = require("./tarea"); //importa el modelo de tarea.js

//CREAMOS CLASE TAREAS CON SU CONSTRUCTOR
class Tareas {
  //get es una funcion para leer o modificar un atributo de un objeto
  //no puede tener el mismo nombre que el atributo por que entra en bucle
  //
  get listadoArray() {
    const listado = []; //variable con el valor de un array vacio
    //objet.keys devuelve un array  de un key de un objeto
    //devuelve un arreglo de las llaves(keys) del objeto lista que se declara en el constructor
    //foreach
    Object.keys(this._lista).forEach((key) => {
      //tarea es igual a la llave de _lista y la agregamos con push
      const tarea = this._lista[key];
      listado.push(tarea);
    });
    return listado;
  }
  constructor() {
    this._lista = {}; // inicializa variable como un objeto vacio
  }

  //funcion para borrar tarea
  borrarTarea(id = "") {
    if (this._lista[id]) {
      //si existe el id del listado
      delete this._lista[id]; //delete es un operador que elimina una propiedad de un objeto-el objeto es _lista y la propiedad es el id
    }
  }

  cargarTareasDeArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._lista[tarea.id] = tarea; //toma la llave de la tarea y toma el valor de la tarea que recibe
    });
  }

  //grabar la tarea e instancia del modelo Tarea
  //el parametro es el nombre de la tarea que ingresa el usuario
  crearTarea(descripcion) {
    const tarea = new Tarea(descripcion); //crea una nueva tarea que toma el valor ingresado por usuario
    this._lista[tarea.id] = tarea; //almacena la tarea en el listado con el id unico de uuid
  }

  listadoCompleto() {
    console.log();
    //foreach para el array listado le damos de argumento una tarea y el indice
    this.listadoArray.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green; //constante indice es igual al indice y se le da color
      const { descripcion, completado } = tarea;
      const estado = completado //if ternario- si el estado es completado se pone verde sino rojo
        ? "Completado".green
        : "Pendiente".red;
      //imprime indice , descripcion y estado
      console.log(`${idx} ${descripcion} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;
    this.listadoArray.forEach((tarea) => {
      const { descripcion, completado } = tarea;
      const estado = completado //if ternario- si el estado es completado se pone verde sino rojo
        ? "Completado".green
        : "Pendiente".red;

      if (completadas) {
        //mostrar completadas
        if (completado) {
          //le sumamos 1 a contador por que arranca en 0
          contador += 1;
          //imprime contador lo pasamos a string,imprir descripcion y estado
          console.log(
            `${(contador + ".").green} ${descripcion} :: ${completado.blue}`
          );
        }
      } else {
        //mostrar pendientes
        if (!completado) {
          contador += 1;
          console.log(`${(contador + ".").green} ${descripcion} :: ${estado}`);
        }
      }
    });
  }
  //cambia completadas de true a false o de false a true
  alternaCompletadas(ids = []) {
    //recibe un arreglo de ids
    ids.forEach((id) => {
      const tarea = this._lista[id];
      if (!tarea.completado) {
        //Date se usa para trabajar con fechas y horas
        //Secrea un objeto poniendo new Date()
        //toISOString pasa la fecha y hora a un string
        tarea.completado = new Date().toISOString();
      }
    });

    //
    this.listadoArray.forEach((tarea) => {
      //si el id de la tarea no esta en alternaCompletadas se va a limpiar
      //si el check marca el circulo como completado y lo quiero cambiar a pendiente
      if (!ids.includes(tarea.id)) {
        //
        this._lista[tarea.id].completado = null;
      }
    });
  }
}

module.exports = Tareas;
