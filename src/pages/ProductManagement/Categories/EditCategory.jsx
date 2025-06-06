import { useTheme } from "@mui/material/styles";
import CategoryForm from "./CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useCallback } from "react";
import { notify } from "../../../utility/notify";
import {
  updateCategory,
  clearState as clearCategory,
  getAllCategories,
} from "../../../slice/productSlice/categorySlice";
import { useEffect } from "react";
import { initialFormData } from "./initialFormData";

const EditCategory = ({ editableCategory,handleCloseEditCategory }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const dispatch = useDispatch();
  const { isUpdateSuccess, isLoading, message, isError } = useSelector(
    (state) => state.category
  );

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editableCategory) {
      setFormData({
        name: editableCategory.name || "",
        slug: editableCategory.slug || "",
        description: editableCategory.description || "",
        image: null,
        isActive: editableCategory.isActive ?? true,
        sortOrder: editableCategory.sortOrder ?? 0,
        metaTitle: editableCategory.metaTitle || "",
        metaDescription: editableCategory.metaDescription || "",
        keywords: editableCategory.keywords || "",
      });
      setImagePreview(editableCategory.image || null);
    }
  }, [editableCategory]);

  const handleClose = useCallback(() => {
    setFormData(initialFormData);
    handleCloseEditCategory();
  }, [handleCloseEditCategory]);

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

    dispatch(updateCategory({ _id: editableCategory?._id, data: payload }));
  };

  useEffect(() => {
    if (!isLoading && isUpdateSuccess) {
      notify("Category updated successfully", "success");
      dispatch(clearCategory());
      dispatch(getAllCategories({}));
      handleClose();
    }
    if (isError) {
      notify(message, "error");
      dispatch(clearCategory());
    }
  }, [isLoading, isUpdateSuccess, dispatch, isError, message, handleClose]);

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
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        actionType={`Update`}
      />
    </div>
  );
};

export default EditCategory;
