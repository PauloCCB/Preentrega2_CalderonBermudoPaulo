import { NavLink } from "react-router-dom";
import useFireStore from "../../CustomHook/useFireStore";

const CategoriesColumn = () => {
    const { data } = useFireStore("categories");
    if (!data) {
        return (<>
        </>);
    }
    return (
        <>
            <div className="w-1/5  flex items-start p-0 mb-3">
                <div className="flex flex-col  w-full  flex-wrap ">
                    {data.map((category) => {
                        return (
                            <NavLink
                                key={category.id}
                                to={`/categories/${category.id}`}
                                className="mb-1 px-3 py-3 bg-primary rounded-md hover:bg-black hover:text-cyan-50 group  "
                            >
                                {category.category}
                            </NavLink>
                        );
                    })}
                </div>

            </div>
        </>
    );
};

export default CategoriesColumn;
