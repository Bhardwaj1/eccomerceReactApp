import React from "react";
import Table from "../../../components/Table/Table";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notify } from "../../../utility/notify";
import {
  getAllProducts,
  clearState,
  deleteProduct,
} from "../../../slice/productSlice/productSlice";
import Button from "../../../components/UI/Button";
import Modal from "../../../components/Modal/Modal";
import AddProduct from "./AddProduct";

const Product = () => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, product, pagination, isDeleteSuccess } =
    useSelector((state) => state.product);

  const [productRows, setProductRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [openAddProduct, setOpenAddProduct] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [editableProductData, setEditableProductData] = useState(null);

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
  const handleOpenAddProduct = () => {
    setOpenAddProduct(true);
  };
  const handleCloseAddProduct = () => {
    setOpenAddProduct(false);
  };

  // Delete Category
  const handleOpenDeleteProductModal = (deleteableData) => {
    setSelectedProduct(deleteableData);
    setOpenDeleteModal(true);
  };
  const handleDeleteProduct = () => {
    try {
      dispatch(deleteProduct(selectedProduct?._id));
    } catch (error) {
      console.log(error);
    }
  };

  // Update
  const handleOpenEditModal = (rowData) => {
    setOpenEditProductModal(true);
    setEditableProductData(rowData);
  };

  const handleCloseEditProduct = () => {
    setOpenEditProductModal(false);
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
    {
      header: "Category",
      accessor: "category",
      render: (row) => row.category?.name || "—",
    },
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
        handleDelete={handleOpenDeleteProductModal}
        handleEdit={handleOpenEditModal}
      />
      <div className="flex justify-end m-2">
        <Button onClick={handleOpenAddProduct}>Add Product</Button>
      </div>
       <Modal
        isOpen={openAddProduct}
        onClose={handleCloseAddProduct}
        children={
          <AddProduct handleCloseAddProduct={handleCloseAddProduct} />
        }
        headerContent={`Add Product`}
      />
    </React.Fragment>
  );
};

export default Product;
