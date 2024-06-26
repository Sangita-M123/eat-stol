import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderAction";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import Success from "../Components/Success";
export default function Ordersscreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  return (
    <div>
      <h2 style={{ fontSize: "35px" }}>My Orders</h2>
      <hr />
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="something went wrong" />}
        {orders &&
          orders.map((order) => {
            return (
              <div
                className="col-md-8 m-2 p-1"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <div className="flex-container">
                  <div className="text-left w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>item </h2>
                    <hr />
                    {order.orderItems.map((item) => {
                      return (
                        <div>
                          <p>
                            {item.name} [{item.varient}] * {item.Quantity} ={" "}
                            {item.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-left w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Address </h2>
                    <hr />
                    <p>Street:{order.shippingAddress.street} </p>
                    <p>City:{order.shippingAddress.city} </p>
                    <p>Country:{order.shippingAddress.country} </p>
                    <p>Pincode:{order.shippingAddress.pincode} </p>
                  </div>
                  <div className="text-left w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Order info </h2>
                    <hr />
                    <p>Order Amount:{order.orderAmount} </p>
                    <p>Date :{order.createdAt.substring(0, 10)} </p>
                    <p>Transaction Id:{order.transactionId} </p>
                    <p>Order Id:{order._id} </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
