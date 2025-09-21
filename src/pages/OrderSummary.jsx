import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderSummary() {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) setOrder(data.order);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    }
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Order Summary</h1>
      <p><b>Order ID:</b> {order._id}</p>
      <p><b>File:</b> {order.fileName}</p>
      <p><b>Pages:</b> {order.pages}</p>
      <p><b>Copies:</b> {order.copies}</p>
      <p><b>Color:</b> {order.color}</p>
      <p><b>Side:</b> {order.side}</p>
      <p><b>Total Price:</b> ₹{order.price}</p>
     
    </div>
  );
}
