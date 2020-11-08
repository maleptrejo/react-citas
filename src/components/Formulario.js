import React, {Fragment, useState} from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

//con {crearCita}, extraigo por destructuring la fx de las props. Esto es lo mismo que escribir 
// props.crearCita

const Formulario = ({crearCita}) => {

    const [cita, actualizarCita]= useState({
        mascota:'',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

     const [error, actualizarError]= useState(false)

const actualizarState= e => {
    actualizarCita({
        ...cita,
        [e.target.name]: e.target.value
    })
}
const {mascota, propietario, fecha, hora, sintomas}=cita;

//validador
const submitCita = e =>{
   e.preventDefault();

   if(mascota.trim()===''||propietario.trim()===''||fecha.trim()==='' ||hora.trim()==='' ||sintomas.trim()==='' ){
       actualizarError(true);
       return;
   }

   actualizarError(false);

//asignador de ID
   cita.id=shortid();
   console.log(cita)

//cargador de cita a la db
   crearCita(cita);

//reiniciar el form

actualizarCita({
        mascota:'',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
})

}

    return (
        <Fragment>
        <h2>Crear cita</h2>
        
        {error ? <p className="alerta-error">Todos los campos son obligatorios</p> :null}

        <form
            onSubmit={submitCita}
        >
        <label>Nombre Mascota</label>
        <input 
        type="text"
        name="mascota"
        className="u-full-width"
        placeholder="Nombre Mascota"
        onChange={actualizarState}
        value={mascota}
        />
        
        <label>Nombre del Dueño</label>
        <input 
        type="text"
        name="propietario"
        className="u-full-width"
        placeholder="Nombre del Dueño"
        onChange={actualizarState}
        value={propietario}
        />  
        
        <label>Fecha</label>
        <input 
        type="date"
        name="fecha"
        className="u-full-width"
        onChange={actualizarState}
        value={fecha}
        
        />
        
        <label>Hora</label>
        <input 
        type="time"
        name="hora"
        className="u-full-width"
        onChange={actualizarState}
        value={hora}
        />

        <label>Síntomas</label>
        <textarea
        className="u-full-width"
        name="sintomas"
        onChange={actualizarState}
        value={sintomas}
        ></textarea>
        
        <button
        type="submit"
        className="u-full-width button confirmar"
        >
            Agregar Cita
        </button>
        </form>
        </Fragment>
        );
    }
    
    //para averiguar por consola el tipo de info que viene en props
    Formulario.propTypes={
        crearCita: PropTypes.func.isRequired
    }

    export default Formulario;