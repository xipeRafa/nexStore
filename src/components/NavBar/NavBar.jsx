import React from 'react';

//Components
import CartWidget from "../CartWidget/CartWidget";

//Particular Css
import './NavBar.css';
import logo from '../../imgs/title.jpg'
//Routing
import {NavLink, Route, Redirect} from 'react-router-dom'


const NavBar = () => {

    return (
        <>  
            <nav id='nav'>
                <div className="nav-wrapper">
                    {/* El atributo exact hace que el router busque exactamente la ruta / y no todas las q empiezen con / */}
                    <NavLink to="/" className="brand-logo" exact >
                        <img src={logo} alt="NextGym" />
                    </NavLink>
                    <a href="/#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <NavLink to="/" className="navlink"> INICIO </NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories/suplementos" className="navlink"> SUPLEMENTOS </NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories/articulos" className="navlink"> ARTICULOS </NavLink>
                        </li>
                        <li>
                            <NavLink to="/my-orders" className="navlink " > PEDIDOS </NavLink>
                        </li>
                        <Route path="*"> <Redirect to="/" /> </Route>
                    </ul>
                    {/* Icono de carrito de compras */}
                    <CartWidget />
                </div>
            </nav>
            {/* Mismo menu pero cuando esta colapsado para mobile */}
            <ul className="sidenav sidenav-close" id="mobile-demo" >
                <li>
                    <NavLink to="/categories/suplementos" className="navlink"> SUPLEMENTOS </NavLink>
                </li>
                <li>
                    <NavLink to="/categories/articulos" className="navlink"> ARTICULOS </NavLink>
                </li>
                <li>
                    <NavLink to="/my-orders" className=" navlink " > PEDIDOS </NavLink>
                </li>

                <li>
                    <NavLink to="/" className="navlink" exact >
                                INICIO
                    </NavLink>
                </li>
            </ul>
        </>
    )
};

export default NavBar;
