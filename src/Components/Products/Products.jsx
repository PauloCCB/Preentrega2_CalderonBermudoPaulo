import ProductDetails from "./ProductsDetails";
import useFireStore from '../../CustomHook/useFireStore';
import CategoriesColumn from "../Categories/CategoriesColumn";
const Products = () => {
    const { data } = useFireStore("products");
    if (!data) {
        return (<>
        </>);
    }
    return (
        <section className="flex  pt-12 pb-12 relative">
            <div className="flex m-auto relative">
                <CategoriesColumn></CategoriesColumn>
                <main className="w-4/5 mb-0 min-h-[100vh] ">
                    <div className="flex mr-auto ml-auto  max-w-4xl">
                        <ul className="grid grid-cols-3 gap-x-8 gap-y-8 border-solid border-spacing-6 ">
                            {data.map((product) => {
                                return (<>
                                    <ProductDetails key={product.id} product={product}>
                                    </ProductDetails>
                                </>
                                )
                            })}
                        </ul>
                    </div>
                </main>
            </div>
        </section>

    );
}
export default Products;