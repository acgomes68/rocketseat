import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);
    return (
        <>
            <Link to="/new"><button className="btn btnCadastrar">Cadastrar novo spot</button></Link>
            <Link to="/"><button className="btn btnSair">Sair</button></Link>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={ spot._id }>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{ spot.company }</strong>
                        <span>{ spot.price ? `US$${spot.price}/day` : 'FREE' }</span>
                    </li>
                ))}
            </ul>
        </>
    );
}