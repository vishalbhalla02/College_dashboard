import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const ClassroomLinks = () => {
  const [classroomLinks, setClassroomLinks] = useState([]);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const getClassroomLinks = () => {
      axios
        .get(`${baseApiURL()}/links/`, {
          params: {
            semester: userData.semester,
            branch: userData.branch,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.length !== 0) {
            setClassroomLinks(response.data);
          }
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
        });
    };

    if (userData?.semester && userData?.branch) {
      getClassroomLinks();
    }
  }, [userData]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Classroom Links for Semester ${userData.semester}`} />
      </div>

      {classroomLinks.length > 0 ? (
        <div className="mt-8 w-[90%] mx-auto">
          {classroomLinks.map((item, index) => (
            <div key={index} className="mb-6 p-4 border rounded shadow-sm">
              <p className="font-semibold">
                Subject: <span className="text-gray-800">{item.subject}</span>
              </p>
              <p className="font-semibold">
                Faculty: <span className="text-gray-800">{item.faculty}</span>
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words"
              >
                {item.link}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10">No Classroom Links Available At The Moment!</p>
      )}
    </div>
  );
};

export default ClassroomLinks;
