import React from "react";
import Button from "../../../components/UI/Button";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import AddCategory from "./AddCategory";
import Table from "../../../components/Table/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../slice/categorySlice";
import { debounce } from "../../../utility/debounce";
import { useRef } from "react";

const Category = () => {
  const [openAddCategory, setAddCategory] = useState(false);
  const { isSuccess, isLoading, categories,pagination } = useSelector(
    (state) => state.category
  );
  const [categoryRows, setCategoryRows] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();


  const debounceSearchHandler = useRef(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 2000)
  ).current;
  
  useEffect(() => {
    debounceSearchHandler(search);
  }, [search, debounceSearchHandler]);

  // ✅ Fetch on debounced search
  useEffect(() => {
    dispatch(getAllCategories({ page: 1, pageSize, search: debouncedSearch }));
    setPage(0); // reset page when search changes
  }, [debouncedSearch, dispatch, pageSize]);

  // ✅ Fetch on page/pageSize change (immediately)
  useEffect(() => {
    if (debouncedSearch !== "") {
      dispatch(getAllCategories({ page: page + 1, pageSize, search: debouncedSearch }));
    } else {
      dispatch(getAllCategories({ page: page + 1, pageSize, search: search }));
    }
  }, [page, pageSize, dispatch,debouncedSearch,search]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setCategoryRows(categories);
    }
  }, [isSuccess, isLoading, categories]);
  const handleOpenAddCategory = () => {
    setAddCategory(true);
  };
  const handleCloseAddCategory = () => {
    setAddCategory(false);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "IsActive", accessor: "isActive" },
  ];

  console.log({ search });
  return (
    <React.Fragment>
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
      />
      <div className="flex justify-end m-2">
        <Button onClick={handleOpenAddCategory}>Add Category</Button>
      </div>
      <Modal
        isOpen={openAddCategory}
        onClose={handleCloseAddCategory}
        children={<AddCategory />}
        headerContent={`Add Category`}
      />
    </React.Fragment>
  );
};

export default Category;
