const { green, white } = require('colors');
const { promises } = require('fs');

require('colors');

const mostrarMenu = () => {

  return new Promise( resolve => {

    console.clear();
    console.log('============================='.green);
    console.log('       Sleccione una opción'.green);
    console.log('=============================\n'.green);
  
    console.log(` ${ '1.'.blue} Crear tarea`);
    console.log(` ${ '2.'.blue} Listar las tareas`);
    console.log(` ${ '3.'.blue} Listar las tareas completadas`);
    console.log(` ${ '4.'.blue} Listar las tareas pendientes`);
    console.log(` ${ '5.'.blue} Completar tarea(s)`);
    console.log(` ${ '6.'.blue} Borrar tarea`);
    console.log(` ${ '0.'.blue} Salir\n`);
  
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    readLine.question('Seleccione una opción: ', (opt) => {
      readLine.close();
      resolve(opt);
    });

  });
}

const pause = () => {

  return new Promise( resolve => {

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    readLine.question(`\n Presione ${'ENTER'.red} para continuar\n`, (opt) => {
      readLine.close();
      resolve();
    });
  })
}

module.exports = {
  mostrarMenu,
  pause
}