import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const Timetable = () => {
  const [addselected, setAddSelected] = useState({
    branch: "",
    semester: "",
  });
  const [file, setFile] = useState(null);
  const [branch, setBranch] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selected, setSelected] = useState("add");
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    getBranchData();
    getTimetableHandler();
  }, []);

  const getBranchData = () => {
    axios
      .get(`${baseApiURL()}/branch/getBranch`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message || "Failed to fetch branches");
        }
      })
      .catch((error) => {
        console.error("Branch error:", error);
        toast.error(error.message);
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const addTimetableHandler = () => {
    if (!addselected.branch || !addselected.semester || !file) {
      toast.error("All fields and file are required.");
      return;
    }

    toast.loading("Adding Timetable...");
    const formData = new FormData();
    formData.append("branch", addselected.branch);
    formData.append("semester", addselected.semester);
    formData.append("type", "timetable");
    formData.append("timetable", file);

    axios
      .post(`${baseApiURL()}/timetable/addTimetable`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setAddSelected({ branch: "", semester: "" });
          setFile(null);
          setPreviewUrl("");
          getTimetableHandler();
        } else {
          toast.error(response.data.message || "Upload failed");
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Upload error:", error);
        toast.error(error.response?.data?.message || "Error uploading file");
      });
  };

  const getTimetableHandler = () => {
    axios
      .get(`${baseApiURL()}/timetable/getTimetable`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTimetables(response.data);
        } else {
          setTimetables([]); // Ensure state consistency

          toast.error("No timetables found");
        }
      })
      .catch((error) => {
        console.error("Timetable fetch error:", error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (timetables.length > 0) {
    }
  }, [timetables]);

  const deleteTimetableHandler = (id) => {
    toast.loading("Deleting Timetable...");
    axios
      .delete(`${baseApiURL()}/timetable/deleteTimetable/${id}`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getTimetableHandler();
        } else {
          toast.error(response.data.message || "Failed to delete timetable");
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Delete error:", error);
        toast.error(error.response?.data?.message || "Delete failed");
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Timetable Management" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2"
            } border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Timetable
          </button>
          <button
            className={`${
              selected === "view" && "border-b-2"
            } border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => {
              setSelected("view");
              getTimetableHandler(); // Ensure refresh
            }}
          >
            View Timetables
          </button>
        </div>
      </div>

      {selected === "add" && (
        <div className="w-full flex justify-evenly items-center mt-12">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <p className="mb-4 text-xl font-medium">Add Timetable</p>

            <select
              id="branch"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4"
              value={addselected.branch}
              onChange={(e) =>
                setAddSelected({ ...addselected, branch: e.target.value })
              }
            >
              <option value="">-- Select Branch --</option>
              {branch.map((b) => (
                <option value={b.name} key={b.name}>
                  {b.name}
                </option>
              ))}
            </select>

            <select
              id="semester"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4"
              value={addselected.semester}
              onChange={(e) =>
                setAddSelected({ ...addselected, semester: e.target.value })
              }
            >
              <option value="">-- Select Semester --</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Semester
                </option>
              ))}
            </select>

            {!previewUrl && (
              <label
                htmlFor="upload"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
              >
                Select Timetable
                <span className="ml-2">
                  <FiUpload />
                </span>
              </label>
            )}

            {previewUrl && (
              <p
                className="px-2 border-2 border-blue-500 py-2 rounded text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setFile(null);
                  setPreviewUrl("");
                }}
              >
                Remove Selected Timetable
                <span className="ml-2">
                  <AiOutlineClose />
                </span>
              </p>
            )}

            <input
              type="file"
              id="upload"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />

            <button
              className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
              onClick={addTimetableHandler}
            >
              Add Timetable
            </button>

            {previewUrl && (
              <img className="mt-6" src={previewUrl} alt="timetable preview" />
            )}
          </div>
        </div>
      )}

      {selected === "view" && (
        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timetables.length > 0 ? (
            timetables.map((tt) => (
              <div
                key={tt._id}
                className="relative bg-blue-50 rounded-xl shadow-md border p-4"
              >
                <button
                  onClick={() => deleteTimetableHandler(tt._id)}
                  className="absolute top-2 right-2 text-red-600 text-xl bg-white rounded-full p-1 shadow-sm"
                  title="Delete"
                >
                  <MdOutlineDelete />
                </button>

                <img
                  src={
                    tt?.link && process.env.REACT_APP_MEDIA_LINK
                      ? `${process.env.REACT_APP_MEDIA_LINK}/${tt.link}`
                      : "/path/to/default-image.jpg" // Optional fallback image if no image is provided
                  }
                  alt="Timetable"
                  className="w-full h-64 object-contain mb-4"
                />

                <p className="font-semibold">
                  {tt.branch} - Semester {tt.semester}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No timetables available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Timetable;
