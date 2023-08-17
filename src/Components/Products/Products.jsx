import ProductDetails from "./ProductsDetails";
import { CircularProgress } from "@mui/material";
import useFireStore from "../../CustomHook/useFireStore";
import CategoriesColumn from "../Categories/CategoriesColumn";
const Products = () => {
  const { data, loading } = useFireStore("products");
  if (loading)
    return (
      <div className="flex items-center justify-center align-middle min-h-[100vh] color:#4ee420">
        <CircularProgress />
      </div>
    );
  return (
    <section className="flex  pt-12 pb-12 relative min-h-[100vh]">
      <div className="flex m-auto relative">
        <CategoriesColumn />
        <main className="w-4/5 mb-0  ">
          <div className="flex mr-auto ml-auto  max-w-4xl">
            <ul className="grid grid-cols-3 gap-x-8 gap-y-8 border-solid border-spacing-6 ">
              {data.map((product) => {
                return (
                  <>
                    <ProductDetails key={product.id} product={product} />
                  </>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </section>
  );
};
export default Products;
