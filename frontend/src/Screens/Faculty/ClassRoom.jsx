import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";

const GoogleClassroomLinks = () => {
  const [selectedTab, setSelectedTab] = useState("add");
  const [classroomLinks, setClassroomLinks] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    semester: "",
    link: "",
    faculty: "",
    batch: "",
  });
  const [branch, setBranch] = useState([]);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    getBranchData();
    getBatchData();
    // Optionally, you can also fetch semester data here if needed
  }, []);
  const getBatchData = () => {
    axios
      .get(`${baseApiURL()}/batch/getBatch`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.success) {
          setBatch(response.data.batches);
        } else {
          toast.error(response.data.message || "Failed to fetch batches");
        }
      })
      .catch((error) => {
        console.error("Batch error:", error);
        toast.error(error.message);
      });
  };

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

  const fetchLinks = () => {
    axios
      .get(`${baseApiURL()}/links`)
      .then((res) => setClassroomLinks(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch links");
      });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addLinkHandler = () => {
    const { subject, semester, link, faculty } = formData;
    if (!subject || !semester || !link || !faculty) {
      toast.error("All fields are required");
      return;
    }

    toast.loading("Adding Link...");
    axios
      .post(`${baseApiURL()}/links/`, formData)
      .then((res) => {
        toast.dismiss();
        toast.success("Link added successfully");
        setFormData({ subject: "", semester: "", link: "", faculty: "" });
        fetchLinks();
      })
      .catch((err) => {
        toast.dismiss();
        console.error(err);
        toast.error("Failed to add link");
      });
  };

  const deleteLinkHandler = (id) => {
    toast.loading("Deleting...");
    axios
      .delete(`${baseApiURL()}/links/${id}`)
      .then(() => {
        toast.dismiss();
        toast.success("Deleted");
        fetchLinks();
      })
      .catch((err) => {
        toast.dismiss();
        console.error(err);
        toast.error("Failed to delete");
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col items-start mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Google Classroom Link Management" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selectedTab === "add" && "border-b-2"
            } border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelectedTab("add")}
          >
            Add Link
          </button>
          <button
            className={`${
              selectedTab === "view" && "border-b-2"
            } border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => {
              setSelectedTab("view");
              fetchLinks();
            }}
          >
            View Links
          </button>
        </div>
      </div>

      {selectedTab === "add" && (
        <div className="w-full flex flex-col justify-center items-center mt-12">
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="px-4 py-2 w-[80%] bg-blue-50 rounded-sm my-2"
          >
            <option value="">Select Branch</option>
            {branch.map((b) => (
              <option value={b.name} key={b.name}>
                {b.name}
              </option>
            ))}
          </select>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="px-4 py-2 w-[80%] bg-blue-50 rounded-sm my-2"
          >
            <option value="">Select Batch</option>
            {batch.map((b) => (
              <option key={b._id} value={b.batch}>
                {b.batch}
              </option>
            ))}
          </select>

          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="px-4 py-2 w-[80%] bg-blue-50 rounded-sm my-2"
          >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Semester
              </option>
            ))}
          </select>

          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="px-4 py-2 w-[80%] bg-blue-50 rounded-sm my-2"
          />
          <input
            name="faculty"
            placeholder="Faculty"
            value={formData.faculty}
            onChange={handleChange}
            className="px-4 py-2 w-[80%] bg-blue-50 rounded-sm my-2"
          />
          <input
            name="link"
            placeholder="Google Classroom Link"
            value={formData.link}
            onChange={handleChange}
            className="px-4 py-2 w-[80%] bg-blue-50 rounded-sm my-2"
          />
          <button
            className="bg-blue-500 text-white mt-4 px-6 py-2 rounded-sm"
            onClick={addLinkHandler}
          >
            Add Link
          </button>
        </div>
      )}

      {selectedTab === "view" && (
        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classroomLinks.length > 0 ? (
            classroomLinks.map((item) => (
              <div
                key={item._id}
                className="relative bg-blue-50 rounded-xl shadow-md border p-4"
              >
                <button
                  onClick={() => deleteLinkHandler(item._id)}
                  className="absolute top-2 right-2 text-red-600 text-xl bg-white rounded-full p-1 shadow-sm"
                  title="Delete"
                >
                  <MdOutlineDelete />
                </button>
                <p className="font-semibold">Subject: {item.subject}</p>
                <p>Semester: {item.semester}</p>
                <p>Faculty: {item.faculty}</p>
                <a
                  href={item.link}
                  className="text-blue-600 break-words underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.link}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No links found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleClassroomLinks;
