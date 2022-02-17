require("colors"); //requiere paquete colors

const { guardarDB, leerDB } = require("./helpers/guardarArchivo"); //importa el archivo guardarArchivo.js

const {
  inquirerMenu,
  pausa,
  leerInput,
  borrarTareaLista,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer"); //importa funciones del archivo inquirer
const Tareas = require("./models/tareas"); //importa el modelo de la clase Tareas

//CREA UNA FUNCION  ASINCRONA USANDO PARA EJECUTAR PROGRAMA
const main = async () => {
  let opt = ""; //variable opcion sin valor,se le da valor en el case 1 del switch
  const tareas = new Tareas(); //instancia del modelo de Tareas

  const tareasDB = leerDB();

  if (tareasDB) {
    //si existe tareasDB carga la tarea
    tareas.cargarTareasDeArray(tareasDB); //llama de las tareas a cargarTareas mandando las tareas de base de datos
  }

  do {
    //hacer lo de abajo

    opt = await inquirerMenu(); //imprime menu y retorna una opcion

    //controla las opciones que retorna opt
    switch (opt) {
      case "1":
        //crear opcion
        const descripcion = await leerInput("Descripcion: "); //pide el nombre de la tarea
        tareas.crearTarea(descripcion); //crea una tarea y la pone en la lista
        break;

      case "2":
        tareas.listadoCompleto();
        break;
      case "3": //listar tareas completadas
        tareas.listarPendientesCompletadas(true);
        break;
      case "4": //listar tareas pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArray);
        //llama a tareas completadas mandando arreglo de ids
        tareas.alternaCompletadas(ids);
        break;
      case "6": //borrar una tarea seleccionada
        //borrarTareasLista pide las tareas que estan en el array listadoArray y espera con await
        const id = await borrarTareaLista(tareas.listadoArray);
        //pregunta si quiere borrar
        if (id !== "0") {
          const ok = await confirmar("Seguro que quiere borrar?".red);

          if (ok) {
            tareas.borrarTarea(id);
            console.log();
            console.log(
              "=========  Tarea borrada exitosamente!!  =========".green
            );
          }
        }

        break;
    }
    guardarDB(tareas.listadoArray); //llamamos a la funcion guardarDB para guardar  en jason y le decimos que es lo que va a guardar

    await pausa(); //espera que presione enter para seguir
  } while (opt !== "0"); //mientras esto se cumpla
};

//LLAMAMOS A LA FUNCION MAIN
main();
