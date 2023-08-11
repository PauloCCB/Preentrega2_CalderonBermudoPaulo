import { CircularProgress, Typography } from "@mui/material";
import ProductDetails from "./ProductsDetails";
import useFireStore from '../../CustomHook/useFireStore';
import AddToCartButton from "../Common/AddToCartButton";

const Products = () => {
    const { data, loading, error } = useFireStore("products");
    if (!data) {
        // Si data es undefined, muestra un indicador de carga
        return (<>
        </>);
    }
    return (
        <main className="mb-0  ">
            <section className="pt-12 pb-12">
                <div className="flex mr-auto ml-auto  max-w-4xl">
                    {/* <ul className="  grid grid-cols-3 gap-x-8 gap-y-8 border-spacing-6 h-20 border-solid ">
                        {
                            data.map((product) => {
                                return (
                                    <ProductDetails key={product.id} product={product} className="h-96">
                                        <AddToCartButton product={product} />
                                    </ProductDetails>)
                            })
                        }
                    </ul> */}
                </div>
            </section>
        </main>
    );
}
export default Products;