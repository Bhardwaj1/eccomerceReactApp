import React, { useState, useEffect } from "react";
import Button from "../../../components/UI/Button";
import { Input } from "../../../components/UI/Input";
import Textarea from "../../../components/UI/Textarea";
import { useTheme } from "@mui/material/styles";
import Dropdown from "../../../components/UI/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  clearState as clearCategory,
} from "../../../slice/productSlice/categorySlice";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ProductForm = ({
  formData,
  handleSubmit,
  setFormData,
  productImages,
  setProductImages,
  actionType,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const dispatch = useDispatch();

  const { isSuccess, isLoading, categories } = useSelector(
    (state) => state.category
  );

  const [categoriesRows, setCategoriesRows] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories({ search: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setCategoriesRows(categories);
      dispatch(clearCategory());
    }
  }, [isSuccess, isLoading, categories, dispatch]);

  const formattedOptions = categoriesRows.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const fileList = Array.from(files);
      const newImages = fileList.map((file) => {
        const url = URL.createObjectURL(file);
        return {
          file, // Keep file for backend upload
          url,
          alt: file.name || "",
          isNew: true, // Helps later to distinguish between existing and new
        };
      });

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));

      setProductImages((prev) => [
        ...(prev || []),
        ...newImages.map((img) => img.url),
      ]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageDelete = (indexToDelete) => {
  const updatedImages = formData.images.filter((_, i) => i !== indexToDelete);
  const deletedImage = formData.images[indexToDelete];

  if (deletedImage?.isNew && deletedImage?.url) {
    URL.revokeObjectURL(deletedImage.url);
  }

  setFormData({ ...formData, images: updatedImages });

  const updatedPreviews = productImages.filter((_, i) => i !== indexToDelete);
  setProductImages(updatedPreviews);
};


  useEffect(() => {
    return () => {
      productImages?.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [productImages]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <Input
        label="Price"
        name="price"
        type="number"
        min="0"
        value={formData.price}
        onChange={handleChange}
      />

      <Input
        label="Stock"
        name="stock"
        type="number"
        min="0"
        value={formData.stock}
        onChange={handleChange}
      />

      <Input
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
      />

      <div>
        <label
          className={`block text-sm font-medium mb-1 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Category
        </label>
        <Dropdown options={formattedOptions} onchange={handleChange} name={`category`}/>
      </div>

      {productImages?.length > 0 && (
        <div className="mb-2">
          <p className="text-sm text-gray-500 mb-1">Image Previews:</p>
          <div className="flex gap-2 flex-wrap">
            {productImages.map((url, index) => (
              <div
                key={index}
                className="relative w-32 h-32 border rounded overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <IconButton
                  size="small"
                  onClick={() => handleImageDelete(index)}
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      )}

      <Input
        label="Product Images"
        name="images"
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label
          className={`text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Featured Product
        </label>
      </div>

      <div className="flex justify-center items-center">
        <Button type="submit">{actionType}</Button>
      </div>
    </form>
  );
};

export default ProductForm;
