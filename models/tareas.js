var colors = require('colors/safe');
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get _listadoArr() {


      const listado = [];

        Object.keys(this._listado).forEach( key => {
          listado.push(this._listado[key]);
        });

      return  listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
      if(this._listado[id]){
        delete this._listado[id];
      }
    }

    cargarTareas( tareas = [] ) {

      tareas.forEach(tarea => {
        this._listado[tarea.id] = tarea;
      });
    }

    createHomework( desc = '' ){

      const tarea = new Tarea(desc);

      this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
      this._listadoArr.forEach( (completado,i) => {
        const index = i+1;
        completado.completadoEn != null 
          ? console.log(colors.green(index+'. ') + completado.desc + ' :: '+ 'Completadas'.green) 
          : console.log(colors.green(index+'. ') + completado.desc + ' :: '+ 'Pendientes'.red)
      })
    }

    listarPendientesCompletadas( completadas = true ) {
      this._listadoArr.forEach( (completado,i) => {
        const index = i+1;
        if(completadas){
            if(completado.completadoEn != null ) console.log(colors.green(index+'. ') + completado.desc + ' :: '+ `${completado.completadoEn}`.blue)
        } else {
            if(completado.completadoEn == null ) console.log(colors.green(index+'. ') + completado.desc + ' :: '+ 'Pendientes'.red)
        }
      })
    }

    toggleComplet(ids=[]){

      ids.forEach( id => {
        const tarea = this._listado[id];
        if(!tarea.completadoEn) {
          tarea.completadoEn = new Date().toISOString().blue;
        }
      });

      this._listadoArr.forEach( tarea => {
        if(!ids.includes(tarea.id)) {
          this._listado[tarea.id].completadoEn =  null;
        }
      });
    }
}
module.exports = Tareas;