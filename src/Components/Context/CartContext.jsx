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
        cantidadTotal: 0,
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
                        // const itemsArray = Object.values(updatedItems);
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
                        // console.log("updatedItems", updatedItems);
                        const itemsArray = Object.values(updatedItems);
                        // console.log("ItemsArray es ", typeof (itemsArray));
                        console.log("Esto es itemArray", itemsArray);

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
                    //No existe usuario, se crea uno.
                } else {
                    const productPrice = parseFloat(product.precio);
                    const newCartItem = { cantidad: 1, ...product };

                    setDoc(cartRef, {
                        buyer: {
                            name: "",
                            phone: 0,
                            email: "",
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
                                    name: "",
                                    phone: 0,
                                    email: "",
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
        const userId = "prueba6"; // Reemplaza con el ID real del usuario
        const cartRef = doc(db, "cart", userId);

        // Obtén los datos actuales del carrito desde Firestore
        getDoc(cartRef)
            .then((doc) => {
                if (doc.exists()) {
                    const updatedItems = { ...doc.data().items };
                    const removedItem = updatedItems[product.id];

                    if (removedItem) {
                        // Calcula el total actualizado
                        const updatedTotal = Object.keys(updatedItems).length === 0 ? doc.data().total = 0 : doc.data().total - removedItem.precio;

                        // Elimina el elemento del objeto items
                        delete updatedItems[product.id];

                        // Calcula la cantidadTotal actualizada
                        // const noObject = Object.values(doc.data().items);
                        const updatedCantidadTotal = Object.keys(updatedItems).length === 0 ? doc.data().cantidadTotal = 0 : doc.data().cantidadTotal - 1;
                        // Actualiza el documento de Firestore con los datos actualizados
                        console.log("Esto es update", typeof (updatedItems));

                        updateDoc(cartRef, {
                            items: updatedItems,
                            total: updatedTotal,
                            cantidadTotal: updatedCantidadTotal,
                        })
                            .then(() => {
                                console.log("Producto eliminado del carrito en Firestore");
                                // Si la longitud de items es 0, actualiza cantidadTotal a 0
                                if (updatedItems.length == 0) {
                                    updateDoc(cartRef, {
                                        cantidadTotal: 0,
                                    })
                                        .then(() => {
                                            console.log("CantidadTotal actualizada a 0 en Firestore");
                                        })
                                        .catch((error) => {
                                            console.error("Error al actualizar cantidadTotal:", error);
                                        });
                                }
                                // Actualiza el estado local del carrito
                                setCart((prevCart) => ({
                                    ...prevCart,
                                    items: Object.values(updatedItems),
                                    total: updatedTotal,
                                    cantidadTotal: updatedCantidadTotal,
                                }));
                            })
                            .catch((error) => {
                                console.error("Error al actualizar Firestore:", error);
                            });
                    } else {
                        console.log("Producto no encontrado en el carrito.");
                    }
                } else {
                    console.log("Documento del carrito no encontrado.");
                }
            })
            .catch((error) => {
                console.error("Error al obtener el documento del carrito:", error);
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
