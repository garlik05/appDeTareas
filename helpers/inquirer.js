const inquirer = require("inquirer"); //REQUERIMOS PAQUETE INQUIRER
require("colors"); //REQUERIMOS EL PAQUETE COLORS PARA DAR COLOR EN CONSOLA

//CREAMOS LA VARIABLE CON LAS PREGUNTAS PARA EL MENU DE OPCIONES CON EL PAQUETE INQUIRER
const preguntas = [
  {
    type: "list", //tipo de documento
    name: "opcion", //le ponemos un nombre
    message: "--Que desea hacer ?-- \n".red.bgBlack, //pregunta que opcion elijes
    choices: [
      //opciones con un valor y un nombre
      {
        value: "1",
        name: `${"1.".yellow} Crear lista`,
      },
      {
        value: "2",
        name: `${"2.".yellow} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".yellow} Tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".yellow} Tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".yellow} Completar tarea`,
      },
      {
        value: "6",
        name: `${"6.".yellow} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".red} Salir`,
      },
    ],
  },
];

//CREAMOS EL MENU CON LAS OPCIONES
const inquirerMenu = async () => {
  console.clear(); //limpiamos consola

  //CREAMOS TITULO DE MENU Y OPCIONES
  console.log("============================".rainbow);
  console.log("       Lista de Tareas      ".blue.bgYellow);
  console.log("============================\n".rainbow);

  //PROMPT PUEDE RECIBIR UN ARREGLO DE  QUESTION(pregunta) UN ANSWER(respuesta) Y DEVOLVER UN PROMISE. await(espera por las preguntas)
  const { opcion } = await inquirer.prompt(preguntas); //se almacena en opt

  return opcion; //se rotorna el valor de la variable opt
};
//FUNCION DE PAUSA
const pausa = async () => {
  //CREAMOS UN ARRAY QUESTION DE TIPO INPUT
  const question = [
    {
      tyoe: "input",
      name: "pausa",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n"); //salto de linea,crea espacio
  //espera hasta que se cumpla question
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    //crea una pregunta
    {
      type: "input",
      name: "descripcion",
      message, //recibe el argumento que va como parametro en la funcion
      validate(value) {
        //hacer que el usuario ingrese un valor
        if (value.length === 0) {
          return "Ingrese un valor"; //mensaje de error
        }
        return true; //si el valor es valido
      },
    },
  ];

  const { descripcion } = await inquirer.prompt(question); // inquirer regresa un objeto en este caso es la descripcion
  return descripcion; //retorna  la descripcion
};

//funcion asincrona para esperar a que el usuario acepte borrar la tarea
//recibe las tareas como un array
const borrarTareaLista = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion}`,
    };
  });
  //agregar una opcion mas para cancelar si no quiere borrar nada
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar".blue,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas); //se almacena en id
  return id;
};

//confirmar si quiere borrar

const confirmar = async (message) => {
  //crea la pregunta
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};

//mostrar listado para poner si la tarea esta completa
const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion}`,
      checked: tarea.completado ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta); //se almacena en id
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  borrarTareaLista,
  confirmar,
  mostrarListadoCheckList,
};
