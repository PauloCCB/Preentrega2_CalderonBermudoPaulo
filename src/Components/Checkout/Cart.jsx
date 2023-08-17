import React, { useContext, useEffect, useState } from 'react';
import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { Typography, TextField, Button } from '@mui/material';
import { CartContext } from '../Context/CartContext'
import { app } from "../../index";
import Swal from 'sweetalert2';
const Cart = () => {

    const db = getFirestore(app);
    const { cart, removeFromCart, updateBuyerInfo } = useContext(CartContext);
    const itemsArray = Object.values(cart.items);
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);
    const [buyerInfo, setBuyerInfo] = useState({
        name: cart.buyer.name,
        phone: cart.buyer.phone,
        email: cart.buyer.email,
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setBuyerInfo((prevBuyerInfo) => ({
            ...prevBuyerInfo,
            [name]: value,
        }));
    };

    const comprar = (() => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra Realizada',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            handleSubmit();
        })
        return false;

    })
    const handleSubmit = (event) => {
        // event.preventDefault();
        // Aquí solo actualizamos el estado local del contexto
        updateBuyerInfo(buyerInfo);

        // Actualiza la información en Firebase Firestore
        const userId = "prueba6";
        const cartRef = doc(db, "cart", userId);

        // Actualiza el documento de Firestore con los datos actualizados
        updateDoc(cartRef, {
            buyer: buyerInfo,
        })
            .then(() => {
                console.log("Información del comprador actualizada en Firestore");
                setBuyerInfo({
                    name: "",
                    phone: "",
                    email: "",
                });
                setPurchaseCompleted(true);
            })

            .catch((error) => {
                console.error("Error al actualizar información del comprador:", error);
            });

    };
    return (
        <section className='flex  pt-12 pb-12 relative '>
            <div className=" flex m-auto min-h-[60vh]  ">
                <form className='flex  w-1/3'>
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
                        <a className='mx-auto font-futura-medium-bt bg-black text-white cursor-pointer text-lg rounded-lg' onClick={comprar}>Comprar</a>
                    </div>
                </form>
                {itemsArray.length === 0 || purchaseCompleted ? (

                    <h1 className=' justify-center  mr-auto ml-auto flex '>El carrito está vacío </h1>
                ) : (
                    <>
                        <div className='flex items-center  flex-col w-2/3 mb-0'>
                            <div className='mr-auto ml-auto'>
                                <h1 className='font-black' >Productos en el carrito</h1>
                                <div className=' m-0  grid grid-cols-3 gap-x-4 gap-y-4'>
                                    {itemsArray.map((product, index) => (
                                        <div key={index} className=' border-solid border-2 border-b-slate-900 rounded-sm  '>
                                            <img
                                                className="w-auto h-auto block mb-3"
                                                src={product.images}
                                                alt={product.id}
                                            />
                                            <p>{product.nombre}</p>
                                            <p>Precio: ${product.precio}</p>
                                            <p>Cantidad: {product.cantidad}</p>
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

                                <p>Total: ${cart.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </>


                )}
            </div>
        </section>

    );
};

export default Cart;