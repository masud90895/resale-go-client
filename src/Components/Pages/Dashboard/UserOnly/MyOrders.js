import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://assinment-12-server.vercel.app/bookings?email=${user?.email}`,{
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="overflow-x-auto w-full">
      {data.length > 0 ? (
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3 ">
                    <div >
                      <div className="mask mask-squircle  w-12 h-12">
                        <img src={product.image} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span>{product.productName}</span>
                </td>
                <td>{product.price}</td>
                <td>
                  { !product.paid && (
                    <Link to={`/dashboard/payment/${product._id}`}>
                      <button className="btn border-none bg-black btn-sm">
                        Pay
                      </button>
                    </Link>
                  )}

                  {product.paid && (
                    <span className="text-green-500">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h1 className="text-4xl font-bold font-serif h-screen flex justify-center items-center">
            No order Found.Please Order
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
