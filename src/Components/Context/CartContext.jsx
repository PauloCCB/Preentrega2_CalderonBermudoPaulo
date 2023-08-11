import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { createContext, useState } from "react";
import { app } from '../../index'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const db = getFirestore(app);
    const [cart, setCart] = useState({
        buyer: { name: " ", phone: " ", email: " " },
        items: [],
        total: 0,
    });

    const addToCart = (product) => {
        const userId = "prueba5";
        const cartRef = doc(db, "cart", userId);

        getDoc(cartRef).then((doc) => {
            if (doc.exists()) {
                const productPrice = parseFloat(product.precio);
                const updatedTotal = cart.total + productPrice;
                updateDoc(cartRef, {
                    items: arrayUnion(product),
                    total: updatedTotal,
                })
                    .then(() => {
                        console.log("producto agregado al carrito");
                        setCart((prev) => ({
                            ...prev,
                            items: [...prev.items, product],
                            total: updatedTotal,
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                const productPrice = parseFloat(product.precio);
                setDoc(cartRef, {
                    buyer: {
                        name: "userHost",
                        phone: 111111,
                        email: "lalala@gmail.com",
                    },
                    items: [product],
                    total: productPrice,
                })
                    .then(() => {
                        console.log("carrito creado");
                        setCart({
                            buyer: {
                                name: "userHost",
                                phone: 111111,
                                email: "lalala@gmail.com",
                            },
                            items: [product],
                            total: productPrice,
                        });
                    })
                    .catch((error) => console.log(error));
            }
        })
        .catch((error) => {
            console.error("Error al verificar si el documento del carrito existe:", error);
        });
    };
    const removeFromCart = (product) => {
        const userId = "prueba5"; // Reemplaza con el ID real del usuario
        const cartRef = doc(db, "cart", userId);
        console.log(product);

        // Elimina el producto del carrito en Firestore
        updateDoc(cartRef, {
            items: arrayRemove(product),
            total: cart.total - product.precio,
        })
            .then(() => {
                console.log("Producto eliminado del carrito en Firestore");
                // Actualiza el estado del carrito local si es necesario
                setCart((prevCart) => ({
                    ...prevCart,
                    items: prevCart.items.filter((item) => item.id !== product.id),
                    total: prevCart.total - product.precio,

                }));
            })
            .catch((error) => {
                console.error("Error al eliminar producto del carrito:", error);
            });
    };

    const updateBuyerInfo = (buyerInfo) => {
        setCart((prev) => ({
            ...prev,
            buyer: buyerInfo,
        }));
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateBuyerInfo }}
        >
            {children}
        </CartContext.Provider>
    );
};
