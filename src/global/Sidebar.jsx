import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme/theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import styled from "styled-components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import TocIcon from "@mui/icons-material/Toc";
import InventoryIcon from "@mui/icons-material/Inventory";
import DiscountIcon from "@mui/icons-material/Discount";
import StarRateIcon from "@mui/icons-material/StarRate";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import PaymentIcon from "@mui/icons-material/Payment";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Conatiner>
      <Box
        className="h-[100%]"
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Bhardwaj
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> */}
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Gaurav Bhardwaj
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Welcome
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

              {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography> */}
              <Item
                title="Dashboard"
                to="/"
                icon={<DashboardIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Orders Management"
                to="/orderManagement"
                icon={<AddShoppingCartIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Customers Management"
                to="/customerManagement"
                icon={<PeopleOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Inventory"
                to="/inventory"
                icon={<InventoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Promotions & Discounts"
                to="/promotions&discounts"
                icon={<DiscountIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Review & Ratings"
                to="/reviews"
                icon={<StarRateIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Reports & Analytics"
                to="/reports"
                icon={<SummarizeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="User Management"
                to="/userManagement"
                icon={<PersonIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              {!isCollapsed && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Product Management
                </Typography>
              )}
              <Item
                title="All Products"
                to="/products"
                icon={<TocIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Add New Product"
                to="/products/addProducts"
                icon={<AddIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Categories & Tags"
                to="/products/categories&tags"
                icon={<CategoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {!isCollapsed && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Settings
                </Typography>
              )}

              <Item
                title="General Settings"
                to="/generalSettings"
                icon={<SettingsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Payment & Shipping"
                to="/payment"
                icon={<PaymentIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
              {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </Conatiner>
  );
};

export default Sidebar;

const Conatiner = styled.div`
  height: 100vh;
`;
