'use client'
import React, { useEffect, useState } from 'react';
import mockOrders from '../../mock';
import OrderCard from '../../components/OrderCard';
import Navbar from '../../components/Navbar';

export default function Complete() {
  const [allOrders, setAllOrders] = useState([]);
  const [completeOrder,setCompleteOrder]= useState([]);

  useEffect(()=>{
    const steps = [
      "Order confirmation",
      "Packing Material Received",
      "Packing of goods",
      "Dispatch to port",
      "Receiving of goods at port",
      "Vessel Dispatch",
      "Goods received at party's port"
    ];

    const complete = mockOrders.filter(order=>{
      const isDelivered = steps.every(
        step=> order[`Status (${step})` || ''].toLowerCase()==="done"
      )
      return isDelivered;
    })
    setCompleteOrder(complete)
  },[])

  return (
    <div className="p-6">
        <Navbar/>
      {/* ✅ Display All Matching Orders */}
      {completeOrder.length > 0 && (
        <div>
          {completeOrder.map(order => (
            <OrderCard key={order["Order ID"]} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
