import React from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { initialFormData, initialProductFormData } from "./initialFormData";
import ProductForm from "./ProductForm";
const AddProduct = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const dispatch = useDispatch();
  const { isInsertSuccess, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState(initialProductFormData);
  const [imagePreview, setImagePreview] = useState([]);

  const handleSubmit=()=>{

  }

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
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />
    </div>
  );
};

export default AddProduct;
