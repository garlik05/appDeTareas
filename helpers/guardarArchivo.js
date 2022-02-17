const fs = require('fs');//requerimos file system

const archivoJson = './dataBase/data.json'; 
const guardarDB = (data) => {//crea constante que recibe la data que quiere guardar

    fs.writeFileSync(archivoJson,JSON.stringify(data,null,2))//donde se va a guardar la data- pasamos data a objeto jason
};

//funcion para leer la base de datos json
const leerDB = () => {

    if (!fs.existsSync(archivoJson)){//verifica si el archivo no existe
        return null;
    }
    //si el archivo existe lee la data
    const info = fs.readFileSync(archivoJson,{encoding: 'utf-8'});
    const data = JSON.parse(info);//parseamos la info

    return data;
};
 

module.exports = {
    guardarDB,
    leerDB
} 