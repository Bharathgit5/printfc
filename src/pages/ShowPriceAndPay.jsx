import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowPriceAndPay = ({ count, copies, selectedValue, selectedValue2, uploadedFileId }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
  }, []);

  const numPages = isNaN(count) ? 0 : parseInt(count);
  const numCopies = isNaN(copies) ? 0 : parseInt(copies);

  const pricePerPage =
    selectedValue === "black and white" && selectedValue2 === "front side only"
      ? 10
      : selectedValue === "black and white" && selectedValue2 === "both sides"
      ? 5
      : selectedValue === "color" && selectedValue2 === "front side only"
      ? 10
      : selectedValue === "color" && selectedValue2 === "both sides"
      ? 20
      : 10;

  const totalPrice = numPages * numCopies * pricePerPage;

  const handlePayment = async () => {
    if (!loggedInUser) {
      alert("Please login first!");
      return;
    }

    if (!uploadedFileId) {
      alert("Please upload a file first!");
      return;
    }

    try {
      const orderPayload = {
        userId: loggedInUser.id,
        fileName: uploadedFileId,
        price: totalPrice,
        pages: numPages,
        copies: numCopies,
        color: selectedValue,
        side: selectedValue2,
      };

      console.log("Sending order payload:", orderPayload, "token:", localStorage.getItem("token"));

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const savedOrder = await res.json();
      if (!res.ok) {
        alert("Order creation failed: " + (savedOrder.message || "Unknown error"));
        return;
      }

      const orderId = savedOrder.order._id;

      const paymentRes = await fetch("http://localhost:5000/api/payments/create-payment-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice * 100, orderId }),
      });

      const paymentData = await paymentRes.json();
      if (!paymentRes.ok) {
        alert("Failed to create Razorpay order: " + (paymentData.message || "Unknown error"));
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please refresh the page.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Document Printing",
        description: "Print Order Payment",
        order_id: paymentData.id,
        handler: async function (response) {
          console.log("Payment success:", response);

          const verifyRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/payments/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            //alert("Payment verified successfully!");
          
            navigate(`/order-summary/${orderId}`);
          } else {
            alert("Payment verification failed: " + verifyData.message);
          }
        },
        prefill: {
          name: loggedInUser.username,
          email: loggedInUser.email,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="card text-center" id="card3">
      <b className="card-head">Price & Payment</b>
      <div className="card-body3">
        <table>
          <thead>
            <tr>
              <th>No. of Pages</th>
              <th>No. of Copies</th>
              <th>Price per Page</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{numPages}</td>
              <td>{numCopies}</td>
              <td>{pricePerPage}</td>
              <td>{totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-3"
          onClick={handlePayment}
        >
          Pay ₹{totalPrice}
        </button>
      </div>
    </div>
  );
};

export default ShowPriceAndPay;
