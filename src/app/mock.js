const mockOrders = [
  {
    "Timestamp": "2025-04-11T05:44:23.000Z",
    "PartyUniqueID": "EXP PUI 1",
    "OrderID": "EXP OI 1",
    "PartyName": "Abc store",
    "ContactNo": 9020393020,
    "Country": "dubai",
    "BrandName": "excel",
    "Quantity": 200,
    "Steps": [
      {
        "Step": "Order confirmation",
        "Planned": "2025-04-19T18:30:00.000Z",
        "Actual": "2025-04-20T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "1 day"
      },
      {
        "Step": "Packing Material Received",
        "Planned": "2025-04-26T18:30:00.000Z",
        "Actual": "2025-04-26T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 day"
      },
      {
        "Step": "Packing of goods",
        "Planned": "2025-04-30T18:30:00.000Z",
        "Actual": "2025-04-30T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Dispatch to port",
        "Planned": "2025-05-07T18:30:00.000Z",
        "Actual": "2025-05-07T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Receiving of goods at port",
        "Planned": "2025-05-14T18:30:00.000Z",
        "Actual": "2025-05-14T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Vessel Dispatch",
        "Planned": "2025-05-21T18:30:00.000Z",
        "Actual": "2025-05-21T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Goods received at party's port",
        "Planned": "2025-05-28T18:30:00.000Z",
        "Actual": "2025-05-28T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      }
    ]
  },
  {
    "Timestamp": "2025-04-11T20:42:23.000Z",
    "PartyUniqueID": "EXP PUI 2",
    "OrderID": "EXP OI 2",
    "PartyName": "mohit store",
    "ContactNo": 9339230293,
    "Country": "Malaysia",
    "BrandName": "super",
    "Quantity": 230,
    "Steps": [
      {
        "Step": "Order confirmation",
        "Planned": "2025-04-19T18:30:00.000Z",
        "Actual": "2025-04-20T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "1 day"
      },
      {
        "Step": "Packing Material Received",
        "Planned": "2025-04-26T18:30:00.000Z",
        "Actual": "2025-04-26T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 day"
      },
      {
        "Step": "Packing of goods",
        "Planned": "2025-04-30T18:30:00.000Z",
        "Actual": "2025-04-30T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Dispatch to port",
        "Planned": "2025-05-07T18:30:00.000Z",
        "Actual": "2025-05-07T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Receiving of goods at port",
        "Planned": "2025-05-14T18:30:00.000Z",
        "Actual": "2025-05-14T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Vessel Dispatch",
        "Planned": "2025-05-21T18:30:00.000Z",
        "Actual": "2025-05-21T18:30:00.000Z",
        "Status": "pending",
        "TimeDelay": ""
      },
      {
        "Step": "Goods received at party's port",
        "Planned": "2025-05-28T18:30:00.000Z",
        "Actual": "",
        "Status": "pending",
        "TimeDelay": ""
      }
    ]
  },
  {
    "Timestamp": "2025-04-11T07:30:23.278Z",
    "PartyUniqueID": "EXP PUI 3",
    "OrderID": "EXP OI 3",
    "PartyName": "raju store",
    "ContactNo": 9002930293,
    "Country": "Iraq",
    "BrandName": "wattan se",
    "Quantity": 120,
    "Steps": [
      {
        "Step": "Order confirmation",
        "Planned": "2025-04-19T18:30:00.000Z",
        "Actual": "2025-04-20T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "1 day"
      },
      {
        "Step": "Packing Material Received",
        "Planned": "2025-04-26T18:30:00.000Z",
        "Actual": "2025-04-26T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 day"
      },
      {
        "Step": "Packing of goods",
        "Planned": "2025-04-30T18:30:00.000Z",
        "Actual": "2025-04-30T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Dispatch to port",
        "Planned": "2025-05-07T18:30:00.000Z",
        "Actual": "2025-05-07T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Receiving of goods at port",
        "Planned": "2025-05-14T18:30:00.000Z",
        "Actual": "2025-05-14T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Vessel Dispatch",
        "Planned": "2025-05-21T18:30:00.000Z",
        "Actual": "2025-05-21T18:30:00.000Z",
        "Status": "done",
        "TimeDelay": "0 days"
      },
      {
        "Step": "Goods received at party's port",
        "Planned": "2025-05-28T18:30:00.000Z",
        "Actual": "",
        "Status": "pending",
        "TimeDelay": ""
      }
    ]
  }
];
  
  export default mockOrders;
  