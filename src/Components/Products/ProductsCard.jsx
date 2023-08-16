import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFireStore from "../../CustomHook/useFireStore";
import AddToCartButton from "../Common/AddToCartButton";
import CategoriesColumn from "../Categories/CategoriesColumn";
const ProductsCard = () => {
    const { productId } = useParams();
    const { data, loading } = useFireStore('products')
    console.log("Esto es producto card");
    if (loading) return <CircularProgress className='flex items-center justify-center align-middle min-h-[100vh] color:#4ee420' />
    return (
        <section className="flex  pt-12 pb-12 relative">
            <div className="flex m-auto relative">
                <CategoriesColumn></CategoriesColumn>
                <div className=" w-3/6 mb-0 min-h-[100vh]">
                    <div className=" mr-auto ml-auto  max-w-4xl">
                        <div className=" flex flex-col items-center px-0 py-0 text-center m-0 align-middle">
                            <img src={data[productId].images} alt={data[productId].title} className="w-1/2 h-auto block mb-3" />
                            <Typography variant="h6" component="div">
                                {data[productId].title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Precio: ${data[productId].precio}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Descripcion: {data[productId].descripcion}
                            </Typography>
                            <AddToCartButton product={data[productId]}></AddToCartButton>
                        </div>
                    </div>
                </div>
            </div >
        </section >

    );
}
export default ProductsCard;