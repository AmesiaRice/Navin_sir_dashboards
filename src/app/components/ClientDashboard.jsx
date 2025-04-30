"use client";
import React, { useEffect, useState } from "react";
import { getPendingOrders, getSheetData } from "../lib/sheetData";
import OrderCard from "../components/OrderCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ClientCharts from "./CLientCharts";

export default function ClientDashboard() {
  const router = useRouter();
  const [allOrders, setAllOrders] = useState([]);
  const [partyID, setPartyID] = useState("");
  const [loading, setLoading] = useState(true);
  const [pendingOnly, setPendingOnly] = useState(0);

  useEffect(() => {
    const storedID = localStorage.getItem("clientPartyID");
    if (!storedID) {
      router.push("/pages/login");
      return;
    }
    setPartyID(storedID);

    getSheetData().then(({ orders }) => {
      const filtered = orders.filter(
        (order) => order.PartyUniqueID === storedID
      );
      setAllOrders(filtered);
      setLoading(false);
    });

    getPendingOrders().then((data) => {
      // Only count pending orders for this client
      const userPending = data.filter(
        (order) => order.PartyUniqueID === storedID
      );
      setPendingOnly(userPending.length);
    })
    .catch((err) => console.error("Pending fetch failed", err));
  }, [router]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  const pendingOrders = allOrders.filter((order) =>
    order.Steps?.some((step) => step.Status.toLowerCase() !== "done")
  );

  const completedOrders = allOrders.filter((order) =>
    order.Steps?.every((step) => step.Status.toLowerCase() === "done")
  );

  console.log("all orders",allOrders)

  return (
    <div className=" bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-2xl font-bold text-center mb-8 text-blue-700">
          📊 Client Dashboard
        </h1> */}

        {/* 3 Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Total Orders */}
          <Link href={"/pages/total"}>
            <div className="bg-white shadow-md rounded-xl p-3 flex flex-col items-center hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                📦 Total Orders
              </h2>
              <p className="text-3xl font-extrabold text-blue-600">
                {allOrders.length}
              </p>
            </div>
          </Link>

          {/* Pending Orders */}
          <Link href={"/pages/processing"}>
            <div className="bg-white shadow-md rounded-xl p-3 flex flex-col items-center hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                ⏳ Processing Orders
              </h2>
              <p className="text-3xl font-extrabold text-yellow-500">
                {pendingOrders.length}
              </p>
            </div>
          </Link>

          {/* Completed Orders */}
          <Link href={"/pages/complete"}>
            <div className="bg-white shadow-md rounded-xl p-3 flex flex-col items-center hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                ✅ Completed Orders
              </h2>
              <p className="text-3xl font-extrabold text-green-600">
                {completedOrders.length}
              </p>
            </div>
          </Link>

          <Link href={"/pages/pending"}>
            <div className="bg-white shadow-md rounded-xl p-3 flex flex-col items-center hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
              ⏳ Pending Orders
              </h2>
              <p className="text-3xl font-extrabold text-orange-600">
                {pendingOnly}
              </p>
            </div>
          </Link>
        </div>

        {/* List All Orders */}
        {/* <div className="space-y-6">
          {allOrders.map(order => (
            <OrderCard key={order.OrderID} order={order} />
          ))}
        </div> */}
        <ClientCharts/>
      </div>
    </div>
  );
}
