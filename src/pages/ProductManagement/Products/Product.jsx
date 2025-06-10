import React from 'react'
import Table from '../../../components/Table/Table';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { notify } from '../../../utility/notify';
import { getAllProducts ,clearState, deleteProduct } from '../../../slice/productSlice/productSlice';

const Product = () => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, product, pagination, isDeleteSuccess } =
    useSelector((state) => state.product);

  const [productRows, setProductRows] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    
  
    const [openAddCategory, setAddCategory] = useState(false);
  
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [editableCategoryData, setEditableCategoryData] = useState(null);

      // First time rendering
      useEffect(() => {
        const fetchData = async () => {
          await dispatch(
            getAllProducts({ page: page + 1, pageSize: pageSize, search: search })
          );
        };
    
        fetchData();
      }, [search, page, pageSize, dispatch]);
    
      // Add Category
      const handleOpenAddCategory = () => {
        setAddCategory(true);
      };
      const handleCloseAddCategory = () => {
        setAddCategory(false);
      };
    
      // Delete Category
      const handleOpenDeleteCategoryModal = (deleteableData) => {
        setSelectedCategory(deleteableData);
        setOpenDeleteModal(true);
      };
      const handleDeleteCategory = () => {
        try {
          dispatch(deleteProduct(selectedCategory?._id));
        } catch (error) {
          console.log(error);
        }
      };
    
      // Update
      const handleOpenEditModal = (rowData) => {
        setOpenEditCategoryModal(true);
        setEditableCategoryData(rowData);
      };
    
      const handleCloseEditCategory = () => {
        setOpenEditCategoryModal(false);
      };
    
      // Rendering
      useEffect(() => {
        if (isSuccess && !isLoading) {
          setProductRows(product);
          dispatch(clearState());
        }
    
        if (isDeleteSuccess && !isLoading) {
          dispatch(
            getAllProducts({ page: page + 1, pageSize: pageSize, search: search })
          );
          dispatch(clearState());
          setOpenDeleteModal(false);
          notify("Deleted Successfully", "success");
        }
      }, [
        isSuccess,
        isLoading,
        product,
        isDeleteSuccess,
        dispatch,
        page,
        pageSize,
        search,
      ]);

    const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Category", accessor: "category", render: (row) => row.category?.name || '—' },
    { header: "Edit", accessor: "edit" },
    { header: "Delete", accessor: "delete" },
  ];
  return (
    <React.Fragment>
      <Table
        columns={columns}
        rows={productRows}
        tableName={`Product`}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        setPageSize={setPageSize}
        pagination={pagination}
        page={page}
        handleDelete={handleOpenDeleteCategoryModal}
        handleEdit={handleOpenEditModal}
      />
    </React.Fragment>
  )
}

export default Product;
