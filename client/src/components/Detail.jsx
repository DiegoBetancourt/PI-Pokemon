import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import '../../src/estilos/Detail.css';

export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id)); //para acceder al ID de ese detalle
    },[dispatch, props.match.params.id])

    const Pokemon = useSelector((state) => state.detail)

    return (
        <div>
            {
                Pokemon.length > 0 ?
                <div className='detail'>
                    <div className='detail-img'>                        
                        <img src= {Pokemon[0].sprite} alt='' width= '150px' height= '150px'/>
                    </div>
                    <div className= 'detail-body'>
                        <h1>{Pokemon[0].name}</h1>
                        <h3>Tipo: {Pokemon[0].types.map(e => `[${e.name}] `)}</h3>
                        <h4>Id: {Pokemon[0].id}</h4>
                        <h4>Vida: {Pokemon[0].hp}</h4>
                        <h4>Ataque: {Pokemon[0].attack}</h4>
                        <h4>Defensa: {Pokemon[0].defense}</h4>
                        <h4>Velocidad: {Pokemon[0].speed}</h4>
                        <h4>Altura: {Pokemon[0].height} </h4>
                        <h4>Peso: {Pokemon[0].weight}</h4>
                    </div>
                </div> : 
                
                <p>Cargando Detalles...</p>    
            }
            <Link to= '/home' >
                <button>Volver</button>
            </Link>
        </div>
    )
}