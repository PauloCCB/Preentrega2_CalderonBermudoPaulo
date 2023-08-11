import React, { useContext, useEffect, useState } from "react";
import { SlMenu } from 'react-icons/sl';
import { NavLink } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { HiOutlineShoppingCart } from 'react-icons/hi'
export const menuItems = [
    { title: 'Inicio', to: '/' },
    { title: 'Productos', to: '/products' },
    { title: 'Categorias', to: '/categories' }
]

const NavBar = () => {
    const { cart } = useContext(CartContext);
    const [clicked, setClicked] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY >= 130);
            // document.body.style.overflow = scrolled ? 'hidden' : 'auto';
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <header className={`left-0  right-0 z-50 bg-black ${scrolled ? 'fixed animate-sliding-down bg-black py-2 shadow-xl lg:py-2' : 'top-0  pt-5 lg:pt-6'}`}  >
            <section className="flex items-center justify-between px-20  py-2 ">
                <NavLink key="/." to="/" className=" text-white" >
                    WeAre<span className="font-bold">ThePoint</span>
                </NavLink>
                {/* /*Desktop menu */}
                <nav className="hidden lg:block ">
                    <ul className="m-0  flex  text-white  items-center ">
                        {menuItems.map((item, i) => (
                            <div className="py-5 pl-3 pr-9">
                                <li >
                                    <NavLink key={i} to={item.to}>{item.title}</NavLink>
                                </li>
                            </div>
                        ))}
                        <NavLink to="/cart" className="flex items-center text-white">
                            <HiOutlineShoppingCart />
                            <span>{cart.items.length}</span>
                        </NavLink>
                    </ul>

                </nav>
                {/* mobile hamburger menu*/}
                <div className="h-6 w-6 cursor-pointer lg:hidden">
                    <SlMenu className='h-full w-full text-white' />
                </div>
            </section>

        </header>
        // </div>

    );
};

export default NavBar;
// const NavContainer = styled.nav`
// padding: 1.5rem;
// background: rgb(34,237,1);
// background: linear-gradient(0deg, rgb(34,237,1) 5%, rgb(0,0,0) 14%);

// const BgDiv = styled.div`
//   background-color: #222;
//   position: absolute;
//   top: -1000px;
//   left: -1000px;
//   width: 100%;
//   height: 100%;
//   z-index: -1;
//   transition: all 0.6s ease;

//   &.active {
//     border-radius: 0 0 80% 0;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//   }
// `;
