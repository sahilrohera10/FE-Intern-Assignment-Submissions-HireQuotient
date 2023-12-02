import { useState, useEffect } from "react";
import React from "react";
import useFetch from "../Utils/useFetch";
import MyTable from "../Components/Table/Table";

export default function Main() {
  //   const endpoint = ``;

  const data = useFetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  );

  const newData =
    data &&
    data.map((obj) => {
      const { id, ...rest } = obj; // Destructure the id and get the rest of the properties
      return { key: id, ...rest }; // Create a new object with "key" and other properties
    });

  console.log("data=>", newData);

  return (
    <div>
      <h1>Dashboard</h1>
      <MyTable data={newData} />
    </div>
  );
}
