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
    console.log(cart);
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
    };
    console.log(cart);
    return (
        <div className="cart-container">
            {cart.items.length === 0 ? (
                <Typography variant="h6" align="center">El carrito está vacío</Typography>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
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
                    <div>
                        <Typography variant="h6">Productos en el carrito</Typography>
                        {cart.items.map((product, index) => (
                            <div key={index}>
                                <Typography>{product.nombre}</Typography>
                                <Typography>Precio: ${product.precio}</Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => removeFromCart(product)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Typography variant="h6">Total: ${total}</Typography>

                    <Button type="submit" variant="contained" color="primary">
                        Actualizar información del comprador
                    </Button>

                </form>
            )}
        </div>
    );
};

export default Cart;