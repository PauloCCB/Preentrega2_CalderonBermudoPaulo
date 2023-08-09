import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import BurguerBotton from './BurguerBotton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NavLink } from "react-router-dom";
import '../../../src/index.css'
import { CartContext } from '../Context/CartContext';
import { Typography } from '@mui/material';
const NavBar = () => {
    const { cart } = useContext(CartContext)
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <>
            <NavContainer>
                <h2>WeAre<span>ThePoint</span></h2>
                <div className={`links ${clicked ? 'active' : " "} `}>
                    <NavLink to="/" className="navbar-link" activeClassName="active-navbar-link">
                        Inicio
                    </NavLink>
                    <NavLink to="/products">
                        Productos
                    </NavLink>
                    <NavLink to="/categories">
                        Categorias
                    </NavLink>
                    <div style={{ display: "flex" }}>
                        <AddShoppingCartIcon sx={{ width: "20px", height: "20px", color: "white" }}></AddShoppingCartIcon>
                        <Typography component={NavLink} to='/cart'>{cart.items.length}</Typography>

                    </div>
                </div>
                <div className='burguer'>
                    <BurguerBotton clicked={clicked} handleClick={handleClick} />
                </div>
                <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
            </NavContainer>

        </>
    )
}

export default NavBar;
const NavContainer = styled.nav`
padding: 1.5rem;
background: rgb(34,237,1);
background: linear-gradient(0deg, rgb(34,237,1) 5%, rgb(0,0,0) 14%);
display:flex;
align-items:center;
justify-content: space-between;
    h2{
        font-weight:400;
        color:white;
        span{
            font-weight:bold;
        }
    }
    a {
        color:white;
        text-decoration:none;
        margin-right:1rem;
    }
    .links{
        position: absolute;
        top: -700px;
        left: -2000px;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        transition: all .5s ease;
        a{
        color: black;
        font-size: 2rem;
        display: block;
        }
        @media(min-width: 768px){
        position: initial;
        margin: 0;
        a{
            font-size: 1rem;
            color: white;
            display: inline;
        }
        display: block;
        }
    }
    .links.active{
        width: 100%;
        display: block;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 30%;
        left: 0;
        right: 0;
        text-align: center;
        a{
        font-size: 2rem;
        margin-top: 1rem;
        color: white;
        }
    }
    .burguer{
        @media(min-width: 768px){
        display: none;
        }
    }  
`
const BgDiv = styled.div`
  background-color: #222;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`