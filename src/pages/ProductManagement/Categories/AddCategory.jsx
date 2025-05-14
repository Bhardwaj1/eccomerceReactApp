import React, { useState } from 'react';
import Input from '../../../components/UI/Input';
import Textarea from '../../../components/UI/Textarea';
import Button from '../../../components/UI/Button';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: null,
    alt: '',
    isActive: true,
    sortOrder: 0,
    metaTitle: '',
    metaDescription: '',
    keywords: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Slug" name="slug" value={formData.slug} onChange={handleChange} required />
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
          <label className="text-sm font-medium text-gray-700">Is Active</label>
        </div>
        <Input label="Sort Order" name="sortOrder" type="number" value={formData.sortOrder} onChange={handleChange} />
        <Input label="Meta Title" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
        />
        <Input label="Keywords (comma-separated)" name="keywords" value={formData.keywords} onChange={handleChange} />
        <Button type="submit">Create Category</Button>
      </form>
    </div>
  );
};

export default AddCategory;


