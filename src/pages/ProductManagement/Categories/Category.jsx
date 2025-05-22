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
    { header: "Age", accessor: "code" },
    { header: "Email", accessor: "population" },
  ];
  
  const data = [
    { name: "India", code: "IN", population: 1324171354 },
    { name: "China", code: "CN", population: 1403500365 },
    { name: "Italy", code: "IT", population: 60483973 },
    { name: "United States", code: "US", population: 327167434 },
    { name: "Canada", code: "CA", population: 37602103 },
    { name: "Australia", code: "AU", population: 25475400 },
    { name: "Germany", code: "DE", population: 83019200 },
    { name: "Ireland", code: "IE", population: 4857000 },
    { name: "Mexico", code: "MX", population: 126577691 },
    { name: "Japan", code: "JP", population: 126317000 },
    { name: "France", code: "FR", population: 67022000 },
    { name: "Brazil", code: "BR", population: 210147125 },
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
