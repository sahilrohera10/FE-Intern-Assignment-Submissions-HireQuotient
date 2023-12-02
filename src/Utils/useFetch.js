import { useEffect, useState } from "react";

const useFetch = (endpoint) => {
  console.log("helo");
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, [endpoint]);

  return data;
};

export default useFetch;
