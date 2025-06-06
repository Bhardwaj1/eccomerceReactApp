import { useState } from "react";
import { notify } from "../../../utility/notify";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getAllCategories,
  clearState as clearCategory,
} from "../../../slice/productSlice/categorySlice";
import { useEffect } from "react";
import { useCallback } from "react";
import CategoryForm from "./CategoryForm";
import { initialFormData } from "./initialFormData";

const AddCategory = ({ handleCloseAddCategory }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const dispatch = useDispatch();
  const { isInsertSuccess, isLoading, isError, message } = useSelector(
    (state) => state.category
  );

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);

  console.log({imagePreview});

  const handleClose = useCallback(() => {
    handleCloseAddCategory();
    setFormData(initialFormData);
  }, [handleCloseAddCategory]);

  useEffect(() => {
    if (!isLoading && isInsertSuccess) {
      notify("Category created successfully", "success");
      dispatch(clearCategory());
      dispatch(getAllCategories({}));
      handleClose();
    }
    if (isError) {
      notify(message, "error");
      dispatch(clearCategory());
    }
  }, [isLoading, isInsertSuccess, dispatch, isError, message, handleClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.name.trim()) {
      notify("Name is required", "error");
      return;
    }
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("slug", formData.slug);
    payload.append("description", formData.description);
    if (formData.image) payload.append("image", formData.image);
    payload.append("isActive", formData.isActive);
    payload.append("sortOrder", formData.sortOrder);
    payload.append("metaTitle", formData.metaTitle);
    payload.append("metaDescription", formData.metaDescription);
    payload.append("keywords", formData?.keywords);

    try {
      dispatch(createCategory(payload));
    } catch (error) {
      notify(error.message || "Failed to add category", "error");
    }
  };

  return (
    <div
      className={`max-w-xl mx-auto p-2 rounded-lg shadow space-y-4  ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <CategoryForm
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

export default AddCategory;
