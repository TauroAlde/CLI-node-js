
require('colors');

const { guardarDB, leerDB } = require('./helpres/guardarArchivo');
const { 
  inquirerMenu, 
  pause,
  readInput,
  listadoTareasBorrar,
  confirm,
  mostrarListadoChecklist
} = require('./helpres/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async() => {

  let opt = '';

  const tareas = new Tareas();

  const tareasDB = leerDB();

  if( tareasDB ) {
    //AAAAA
    tareas.cargarTareas(tareasDB)
  }

  do {

    opt = await inquirerMenu();

    switch (opt) {
      case '1':
          const desc = await readInput('Descripción: ');
          tareas.createHomework( desc );
        break;
    
      case  '2':
          tareas.listadoCompleto();
        break;
      case  '3':
          tareas.listarPendientesCompletadas();
        break;
      case  '4':
          tareas.listarPendientesCompletadas(false);
        break;

      case  '5':
          const ids = await mostrarListadoChecklist( tareas._listadoArr );
          tareas.toggleComplet( ids );
        break;
      case  '6':
          const id = await listadoTareasBorrar( tareas._listadoArr );

          if(id !== '0'){
            const deleteOrNot = await confirm('Esta seguro?');
            
            if(deleteOrNot) {
              tareas.borrarTarea( id )
              console.log('Tarea borrada con éxito!');
            }
          }
        break;
    }

    guardarDB( tareas._listadoArr );

    await pause();

  } while (opt !== '0');
}

main();