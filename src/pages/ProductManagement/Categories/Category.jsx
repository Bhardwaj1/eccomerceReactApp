import React from "react";
import Button from "../../../components/UI/Button";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import AddCategory from "./AddCategory";
import Table from "../../../components/Table/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteCategory,
  getAllCategories,
} from "../../../slice/productSlice/categorySlice";
import Warning from "../../../components/warnings/Warning";
import { notify } from "../../../utility/notify";
import Loader from "../../../components/Loader/Loader";
import EditCategory from "./EditCategory";

const Category = () => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, categories, pagination, isDeleteSuccess } =
    useSelector((state) => state.category);

  const [categoryRows, setCategoryRows] = useState([]);
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
        getAllCategories({ page: page + 1, pageSize: pageSize, search: search })
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
      dispatch(deleteCategory(selectedCategory?._id));
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
      setCategoryRows(categories);
      dispatch(clearState());
    }

    if (isDeleteSuccess && !isLoading) {
      dispatch(
        getAllCategories({ page: page + 1, pageSize: pageSize, search: search })
      );
      dispatch(clearState());
      setOpenDeleteModal(false);
      notify("Deleted Successfully", "success");
    }
  }, [
    isSuccess,
    isLoading,
    categories,
    isDeleteSuccess,
    dispatch,
    page,
    pageSize,
    search,
  ]);

  // Columns
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "IsActive", accessor: "isActive" },
    { header: "Edit", accessor: "edit" },
    { header: "Delete", accessor: "delete" },
  ];

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <Table
        columns={columns}
        rows={categoryRows}
        tableName={`Category`}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        setPageSize={setPageSize}
        pagination={pagination}
        page={page}
        handleDelete={handleOpenDeleteCategoryModal}
        handleEdit={handleOpenEditModal}
      />
      <div className="flex justify-end m-2">
        <Button onClick={handleOpenAddCategory}>Add Category</Button>
      </div>
      <Modal
        isOpen={openAddCategory}
        onClose={handleCloseAddCategory}
        children={
          <AddCategory handleCloseAddCategory={handleCloseAddCategory} />
        }
        headerContent={`Add Category`}
      />
      <Modal
        isOpen={openEditCategoryModal}
        onClose={handleCloseEditCategory}
        children={
          <EditCategory
            handleCloseEditCategory={handleCloseEditCategory}
            editableCategory={editableCategoryData}
          />
        }
        headerContent={`Edit Category`}
      />
      <Modal
        isOpen={openDeleteModal}
        onClose={handleCloseAddCategory}
        children={
          <Warning
            handleCloseWarningModal={() => setOpenDeleteModal(false)}
            handleDelete={handleDeleteCategory}
          />
        }

        // headerContent={`Add Category`}
      />
    </React.Fragment>
  );
};

export default Category;
