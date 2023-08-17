import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import useFireStore from "../../CustomHook/useFireStore";
import CategoriesColumn from "./CategoriesColumn";

const Categories = () => {
    const { data, loading } = useFireStore("categories");
    console.log("Esto es Categories");
    if (loading)
        return (
            <div className="flex items-center justify-center align-middle min-h-[100vh]">
                <CircularProgress sx={{ color: "#FF627E" }} />
            </div>
        );
    return (
        <>
            <div className="flex  pt-12 pb-12 ">
                <div className="flex m-auto relative">
                    <CategoriesColumn />
                    <div className=" w-4/5 mb-0 min-h-[100vh]">
                        <div className="mr-auto ml-auto  max-w-4xl">
                            <ul className="grid grid-cols-4 gap-x-8 gap-y-8 border-solid border-spacing-6 ">
                                {data.map((category) => {
                                    return (
                                        <Link
                                            key={category.id}
                                            component={Link}
                                            to={`/categories/${category.id}`}
                                            className="flex flex-col items-center px-0 py-0 text-center m-0 align-middle"
                                        >
                                            <div>
                                                <img src={category.image} />
                                                <div>{category.category}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
