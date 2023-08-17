import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFireStore from "../../CustomHook/useFireStore";
import AddToCartButton from "../Common/AddToCartButton";
import CategoriesColumn from "../Categories/CategoriesColumn";
const ProductsCard = () => {
    const { productId } = useParams();
    const { data, loading } = useFireStore("products");
    if (loading)
        return (
            <CircularProgress className="flex items-center justify-center align-middle min-h-[100vh] color:#4ee420" />
        );
    const productos = data.filter(
        (productos) => productos.id === parseInt(productId)
    );
    console.log("Esto es productCard");
    if (productos.length === 0) {
        return (<section className="flex  pt-12 pb-12 relative">
            <div className="flex m-auto relative">
                <CategoriesColumn></CategoriesColumn>
                <div className=" w-3/6 mb-0 min-h-[100vh]">
                    <div className=" mr-auto ml-auto  max-w-4xl">
                        <Typography variant="h5" component="div">
                            No se encontró ningún producto con el ID {productId}.
                        </Typography>
                    </div>
                </div>
            </div>
        </section>)
    }
    else
        return (
            <section className="flex  pt-12 pb-12 relative">
                <div className="flex m-auto relative">
                    <CategoriesColumn></CategoriesColumn>
                    <div className=" w-3/6 mb-0 min-h-[100vh]">
                        <div className=" mr-auto ml-auto  max-w-4xl">
                            <div className=" flex flex-col items-center px-0 py-0 text-center m-0 align-middle">
                                {productos.map((productos) => {
                                    return (
                                        <>
                                            <img
                                                src={productos.images}
                                                alt={productos.title}
                                                className="w-1/2 h-auto block mb-3"
                                            />
                                            <Typography variant="h6" component="div">
                                                {productos.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Precio: ${productos.precio}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Descripcion: {productos.descripcion}
                                            </Typography>
                                            <AddToCartButton product={productos}></AddToCartButton>
                                        </>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
};
export default ProductsCard;
