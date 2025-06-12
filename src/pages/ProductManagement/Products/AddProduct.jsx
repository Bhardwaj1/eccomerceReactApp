import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {  initialProductFormData } from "./initialFormData";
import ProductForm from "./ProductForm";
import { createProduct,clearState as clearProductState } from "../../../slice/productSlice/productSlice";
import { notify } from "../../../utility/notify";
const AddProduct = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const dispatch = useDispatch();
  const { isInsertSuccess, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState(initialProductFormData);
  const [productImages, setProductImages] = useState([]);

  console.log({formData});

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newImages = formData.images.filter((img) => img.isNew);

  const formPayload = new FormData();

  formPayload.append("name", formData.name);
  formPayload.append("description", formData.description);
  formPayload.append("price", formData.price);
  formPayload.append("brand", formData.brand);
  formPayload.append("stock", formData.stock);
  formPayload.append("category", formData.category);
  formPayload.append("isFeatured", formData.isFeatured);

  newImages.forEach((img) => {
    formPayload.append("images", img.file);
  });

  // return
  try {
     dispatch(createProduct(formPayload)); 
  } catch (err) {
    console.error("Error creating product:", err);
  }
};

useEffect(()=>{
if (isInsertSuccess && !isLoading) {
  notify("Created Succesfully","success");
  dispatch(clearProductState());
}
},[isInsertSuccess, isLoading]);

  return (
    <div
      className={`max-w-xl mx-auto p-2 rounded-lg shadow space-y-4  ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        actionType={`Add`}
        productImages={productImages}
        setProductImages={setProductImages}
      />
    </div>
  );
};

export default AddProduct;
