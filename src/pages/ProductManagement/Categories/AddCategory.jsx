import React, { useState } from "react";
import Input from "../../../components/UI/Input";
import Textarea from "../../../components/UI/Textarea";
import Button from "../../../components/UI/Button";
import { notify } from "../../../utility/notify";
import { useTheme } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { createCategory } from "../../../slice/categorySlice";
import axios from "axios";

const AddCategory = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: null,
    alt: "",
    isActive: true,
    sortOrder: 0,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    
    if (!formData?.name.trim()) {
      notify("Name is required", "error");
      return;
    }

    // Prepare form data for multipart upload
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("slug", formData.slug);
    payload.append("description", formData.description);
    if (formData.image) payload.append("image", formData.image);
    payload.append("alt", formData.alt);
    payload.append("isActive", formData.isActive);
    payload.append("sortOrder", formData.sortOrder);
    payload.append("metaTitle", formData.metaTitle);
    payload.append("metaDescription", formData.metaDescription);
    payload.append("keywords", formData.keywords);

    // try {
    //   // Dispatch createCategory thunk
    //   const resultAction = await dispatch(createCategory(payload));

    //   if (createCategory.fulfilled.match(resultAction)) {
    //     notify("Category added successfully", "success");
    //     // Optionally reset form
    //     setFormData({
    //       name: "",
    //       slug: "",
    //       description: "",
    //       image: null,
    //       alt: "",
    //       isActive: true,
    //       sortOrder: 0,
    //       metaTitle: "",
    //       metaDescription: "",
    //       keywords: "",
    //     });
    //   } else {
    //     notify(resultAction.payload || "Failed to add category", "error");
    //   }
    // } catch (error) {
    //   notify(error.message || "Failed to add category", "error");
    // }

    try {
      const res = await axios.post("http://localhost:5000/api/products/category/", payload);
      alert("Category added: " + JSON.stringify(res.data));
    } catch (err) {
      console.error("Error uploading:", err.response?.data || err.message);
      alert("Upload failed");
    }

  };

  return (
    <div
      className={`max-w-xl mx-auto p-2 rounded-lg shadow space-y-4  ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
        <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
        <Input label="Image" name="image" type="file" onChange={handleChange} />
        <Input label="Alt Text" name="alt" value={formData.alt} onChange={handleChange} />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
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
        <Input label="Meta Title" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
        />
        <Input label="Keywords (comma-separated)" name="keywords" value={formData.keywords} onChange={handleChange} />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddCategory;
