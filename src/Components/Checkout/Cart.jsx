import React, { useContext, useEffect, useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { CartContext } from '../Context/CartContext'

const Cart = () => {
    const { cart, removeFromCart, updateBuyerInfo } = useContext(CartContext);

    const [buyerInfo, setBuyerInfo] = useState({
        name: cart.buyer.name,
        phone: cart.buyer.phone,
        email: cart.buyer.email,
    });
    const [total, setTotal] = useState(0);
    useEffect(() => {
        // Calcular el total al cargar el componente o cuando cambia el carrito
        const calculateTotal = () => {
            const totalPrice = cart.items.reduce((accumulator, product) => {
                if (typeof product.precio === 'number') {
                    return accumulator + product.precio;
                }
                return accumulator;
            }, 0);
            setTotal(totalPrice);
        };
        calculateTotal();
    }, [cart.items]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setBuyerInfo((prevBuyerInfo) => ({
            ...prevBuyerInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Actualizar la información del comprador en el contexto del carrito
        // Esto también puede guardar la información en la base de datos si se requiere
        // Aquí solo actualizamos el estado local del contexto
        updateBuyerInfo(buyerInfo);
        console.log();
    };
    return (
        <section className='flex  pt-12 pb-12 relative'>
            <div className=" flex m-auto min-h-[60vh]  ">
                <form onSubmit={handleSubmit} className='flex '>
                    <div className=' mx-auto' >
                        <Typography variant="h6">Información del comprador</Typography>
                        <TextField
                            label="Nombre"
                            name="name"
                            value={buyerInfo.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Teléfono"
                            name="phone"
                            value={buyerInfo.phone}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={buyerInfo.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                </form>
                {cart.items.length === 0 ? (
                    <h1 className=' justify-center  mr-auto ml-auto flex '>El carrito está vacío </h1>
                ) : (
                    <>
                        <div className='flex items-center  flex-col w-1/3 mb-0'>
                            <div className='mr-auto ml-auto'>
                                <h1 className='font-black' >Productos en el carrito</h1>
                                <div className=' m-0'>
                                    {cart.items.map((product, index) => (
                                        <div key={index} className=' border-solid border-2 border-b-slate-900 rounded-sm'>
                                            <p>{product.nombre}</p>
                                            <p>Precio: ${product.precio}</p>
                                            <button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => removeFromCart(product)}
                                                className='flex mx-auto text-center p-2 mb-2 bg-black text-white text-xs mt-[1em] font-futura-medium-bt rounded-3xl '
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <p>Total: ${total.toFixed(2)}</p>
                            </div>
                        </div>
                    </>


                )}
            </div>
        </section>

    );
};

export default Cart;