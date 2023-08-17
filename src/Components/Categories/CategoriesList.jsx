import React from "react";
import { NavLink } from "react-router-dom";
import useFireStore from "../../CustomHook/useFireStore";

const CategoriesList = () => {
    const { data } = useFireStore("categories");
    if (!data) {
        return <></>;
    }
    return (
        <>
            {data.map((category) => {
                return category.products.map((products) => {
                    return <NavLink>{products.nombre}</NavLink>;
                });
            })}
        </>
    );
};

export default CategoriesList;
