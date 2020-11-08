import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'


function App() {

  //1) chequear si hay citas en Local Storage:
  //uso JSON.parse porque localStorage maneja sólo strings!
  let citasIniciales= JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales=[];
  }

  //arreglo de citas, de TODAS.
  //si hay citasIniciales (guardadas), entonces "citas" se inicia con esas. Si no, inicia vacío.
  const [citas, guardarCitas]= useState([citasIniciales]);

  //si hay citas cuando arranca, almacenarlas en local storage; si no, dejarlo vacío.
  useEffect(()=>{
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas]);



  //funcion que tome las citas actuales y agregue la nueva

  const crearCita =cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elimina una cita por su id
//con filter, pasa las fitas NO eliminadas a un nuevo arreglo.
//le pongo cuando NO es igual al ID porque filter me trae lo que machea con la condición. Así, guarda todo lo que NO coincida, que es lo que quiero conservar.

  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !==id)
    guardarCitas(nuevasCitas);
  }


  //mensaje condicional: ternario!!

  const titulo = citas.length===0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
            // acá le paso al form la fx de crear cita, como prompt
            crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita=>(
              <Cita 
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>

    </Fragment>
    

  );
}

export default App;
