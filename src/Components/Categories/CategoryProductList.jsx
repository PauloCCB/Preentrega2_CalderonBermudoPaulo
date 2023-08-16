import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import ProductsDetails from "../Products/ProductsDetails";
import useFireStore from "../../CustomHook/useFireStore";
import AddToCartButton from "../Common/AddToCartButton";
import CategoriesColumn from "./CategoriesColumn";

const CategoryProductList = () => {
    const { categoryId } = useParams();
    const { data, loading } = useFireStore('categories');
    if (loading) return (<div className='flex items-center justify-center align-middle min-h-[100vh]'><CircularProgress sx={{ color: "#FF627E" }} /></div>)
    const category = data.filter(category => category.id === parseInt(categoryId))
    return (<section className="flex  pt-12 pb-12 relative">
        <div className="flex m-auto relative">
            <CategoriesColumn></CategoriesColumn>
            <div className="w-4/5 mb-0 min-h-[100vh]" >
                <div className="flex mr-auto ml-auto  max-w-4xl">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-8 border-solid border-spacing-6">
                        {category.map((category) => {
                            return category.products.map((product) => {
                                return <ProductsDetails key={product.id} product={product}>
                                    <AddToCartButton product={product} />
                                </ProductsDetails>
                            })
                        })
                        }
                    </div>
                </div>

            </div>


        </div >

    </section >);
}

export default CategoryProductList;