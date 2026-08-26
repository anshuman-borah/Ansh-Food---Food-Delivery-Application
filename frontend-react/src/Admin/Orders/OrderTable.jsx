import {
  Avatar,
  AvatarGroup,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../State/Admin/Order/restaurants.order.action";

const orderStatusList = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrdersTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurantsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateOrder = (orderId, orderStatus, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Name</TableCell>
                {!isDashboard && <TableCell>Ingredients</TableCell>}
                {!isDashboard && <TableCell>Status</TableCell>}
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantsOrder.orders
                ?.slice(0, isDashboard ? 7 : restaurantsOrder.orders.length)
                .map((item, index) => (
                  <TableRow
                    className="cursor-pointer"
                    hover
                    key={item.id || index}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>{item?.id}</TableCell>
                    <TableCell>
                      <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                        {item.items?.map((orderItem, idx) => (
                          <Avatar
                            key={idx}
                            alt={orderItem.food?.name}
                            src={orderItem.food?.images?.[0]}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    <TableCell>{item?.customer?.email}</TableCell>

                    <TableCell>₹{item?.totalAmount}</TableCell>

                    <TableCell>
                      {item.items?.map((orderItem, idx) => (
                        <p key={idx}>{orderItem.food?.name}</p>
                      ))}
                    </TableCell>

                    {!isDashboard && (
                      <TableCell className="space-y-2">
                        {item.items?.map((orderItem, idx) => (
                          <div key={idx} className="flex gap-1 flex-wrap">
                            {orderItem.ingredients?.map((ingre, i) => (
                              <Chip key={i} label={ingre} size="small" />
                            ))}
                          </div>
                        ))}
                      </TableCell>
                    )}

                    {!isDashboard && (
                      <TableCell>
                        <Chip
                          sx={{
                            color: "white !important",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                          label={item?.orderStatus}
                          size="small"
                          color={
                            item.orderStatus === "PENDING"
                              ? "info"
                              : item?.orderStatus === "DELIVERED"
                              ? "success"
                              : "secondary"
                          }
                        />
                      </TableCell>
                    )}

                    {!isDashboard && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <div>
                          <Button
                            id={`basic-button-${item?.id}`}
                            aria-controls={`basic-menu-${item?.id}`}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorElArray[index])}
                            onClick={(event) =>
                              handleUpdateStatusMenuClick(event, index)
                            }
                          >
                            Status
                          </Button>
                          <Menu
                            id={`basic-menu-${item?.id}`}
                            anchorEl={anchorElArray[index]}
                            open={Boolean(anchorElArray[index])}
                            onClose={() => handleUpdateStatusMenuClose(index)}
                            MenuListProps={{
                              "aria-labelledby": `basic-button-${item?.id}`,
                            }}
                          >
                            {orderStatusList.map((s, sIdx) => (
                              <MenuItem
                                key={sIdx}
                                onClick={() =>
                                  handleUpdateOrder(item.id, s.value, index)
                                }
                              >
                                {s.label}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Boolean(restaurantsOrder.loading)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OrdersTable;