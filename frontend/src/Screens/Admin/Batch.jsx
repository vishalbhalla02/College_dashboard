import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";

const Batch = () => {
  const [data, setData] = useState({
    batch: "", // For storing batch like "2021-2025"
  });
  const [selected, setSelected] = useState("add");
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    getBatchHandler();
  }, []);

  const getBatchHandler = () => {
    axios
      .get(`${baseApiURL()}/batch/getBatch`)
      .then((response) => {
        if (response.data.success) {
          setBatches(response.data.batches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const addBatchHandler = () => {
    toast.loading("Adding Batch...");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/batch/addBatch`, data, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ batch: "" });
          getBatchHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteBatchHandler = (id) => {
    const alert = prompt("Are You Sure? Type CONFIRM to continue");
    if (alert === "CONFIRM") {
      toast.loading("Deleting Batch...");
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .delete(`${baseApiURL()}/batch/deleteBatch/${id}`, { headers })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            getBatchHandler();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Manage Batch" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Batch
          </button>
          <button
            className={`${
              selected === "view" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("view")}
          >
            View Batches
          </button>
        </div>
      </div>

      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="w-[40%]">
            <label htmlFor="batch" className="leading-7 text-sm">
              Enter Batch (e.g., 2021-2025)
            </label>
            <input
              type="text"
              id="batch"
              value={data.batch}
              onChange={(e) => setData({ ...data, batch: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            className="mt-6 bg-blue-500 px-6 py-3 text-white"
            onClick={addBatchHandler}
          >
            Add Batch
          </button>
        </div>
      )}

      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {batches &&
              batches.map((item, index) => (
                <li
                  key={index}
                  className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
                >
                  <div>{item.batch}</div>
                  <button
                    className="text-2xl hover:text-red-500"
                    onClick={() => deleteBatchHandler(item._id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Batch;
