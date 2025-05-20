import React from "react";
import Button from "../../../components/UI/Button";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import AddCategory from "./AddCategory";
import Table from "../../../components/Table/Table";

const Category = () => {
  const [openAddCategory, setAddCategory] = useState(false);
  const handleOpenAddCategory = () => {
    setAddCategory(true);
  };
  const handleCloseAddCategory = () => {
    setAddCategory(false);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Email", accessor: "email" },
  ];
  
  const data = [
    { name: "Alice", age: 25, email: "alice@example.com" },
    { name: "Bob", age: 30, email: "bob@example.com" },
  ];
  return (
    <React.Fragment>
      <Table columns={columns} rows={data} tableName={`Category`}/>
      <div className="flex justify-end m-2"><Button onClick={handleOpenAddCategory}>Add Category</Button></div>
      <Modal isOpen={openAddCategory} onClose={handleCloseAddCategory} children={<AddCategory/>} headerContent={`Add Category`}/>
    </React.Fragment>
  );
};

export default Category;
