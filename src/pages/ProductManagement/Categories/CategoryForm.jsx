import React from "react";
import Button from "../../../components/UI/Button";
import { Input } from "../../../components/UI/Input";
import Textarea from "../../../components/UI/Textarea";
import { useTheme } from "@mui/material/styles";

const CategoryForm = ({
  formData,
  handleSubmit,
  setFormData,
  imagePreview,
  setImagePreview,
  actionType,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
        />
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {/* Show image preview if available */}
        {imagePreview && (
          <div className="mb-2">
            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        <Input label="Image" name="image" type="file" onChange={handleChange} />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Is Active
          </label>
        </div>
        <Input
          label="Sort Order"
          name="sortOrder"
          type="number"
          value={formData.sortOrder}
          onChange={handleChange}
        />
        <Input
          label="Meta Title"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
        />
        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
        />
        <Input
          label="Keywords (comma-separated)"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
        />
        <div className="flex justify-center items-center">
          <Button type="submit">{actionType}</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CategoryForm;
