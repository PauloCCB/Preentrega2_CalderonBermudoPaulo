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
import { app } from "../../index";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const db = getFirestore(app);
    const [cart, setCart] = useState({
        buyer: { name: " ", phone: " ", email: " " },
        items: [],
        total: 0,
    });

    const addToCart = (product) => {
        const userId = "prueba6";
        const cartRef = doc(db, "cart", userId);

        getDoc(cartRef)
            .then((doc) => {
                if (doc.exists()) {
                    const existingCartItem = doc.data().items[product.id];
                    if (existingCartItem) {
                        // Producto ya existe en el carrito, actualiza la cantidad y el total
                        const updatedItems = { ...doc.data().items };
                        updatedItems[product.id].cantidad =
                            (updatedItems[product.id].cantidad || 0) + 1;

                        const updatedTotal = cart.total + parseFloat(product.precio);

                        const updatedCantidadTotal = doc.data().cantidadTotal + 1; // Incrementa la cantidadTotal

                        updateDoc(cartRef, {
                            items: updatedItems,
                            total: updatedTotal,
                            cantidadTotal: updatedCantidadTotal, // Actualiza cantidadTotal
                        })
                            .then(() => {
                                console.log("Cantidad de producto actualizada en el carrito");
                                setCart((prev) => ({
                                    ...prev,
                                    items: updatedItems,
                                    total: updatedTotal,
                                    cantidadTotal: updatedCantidadTotal, // Actualiza cantidadTotal en el estado local
                                }));
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        // Producto no existe en el carrito, agrega uno nuevo
                        const productPrice = parseFloat(product.precio);
                        const updatedTotal = doc.data().total + productPrice;

                        const updatedCantidadTotal = doc.data().cantidadTotal + 1; // Incrementa la cantidadTotal
                        const updatedItems = { ...doc.data().items };
                        updatedItems[product.id] = { cantidad: 1, ...product };


                        updateDoc(cartRef, {
                            items: updatedItems,
                            total: updatedTotal,
                            cantidadTotal: updatedCantidadTotal, // Actualiza cantidadTotal
                        })
                            .then(() => {
                                console.log("producto agregado al carrito");
                                setCart((prev) => ({
                                    ...prev,
                                    items: updatedItems,
                                    total: updatedTotal,
                                    cantidadTotal: updatedCantidadTotal, // Actualiza cantidadTotal en el estado local
                                }));
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                } else {
                    const productPrice = parseFloat(product.precio);
                    const newCartItem = { cantidad: 1, ...product };

                    setDoc(cartRef, {
                        buyer: {
                            name: "userHost",
                            phone: 111111,
                            email: "lalala@gmail.com",
                        },
                        items: {
                            [newCartItem.id]: newCartItem,
                        },
                        total: productPrice,
                        cantidadTotal: 1, // Inicializa cantidadTotal en 1
                    })
                        .then(() => {
                            console.log("carrito creado");
                            setCart({
                                buyer: {
                                    name: "userHost",
                                    phone: 111111,
                                    email: "lalala@gmail.com",
                                },
                                items: {
                                    [newCartItem.id]: newCartItem,
                                },
                                total: productPrice,
                                cantidadTotal: 1, // Inicializa cantidadTotal en 1 en el estado local
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
