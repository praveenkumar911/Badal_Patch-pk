# Badal_Patch-pk


![badal drawio](https://github.com/praveenkumar911/Badal_Patch-pk/assets/113330666/7613e068-8fec-4523-9c7d-78e3cf987517)


import { FiMail } from "react-icons/fi";
import { RiGitlabLine } from "react-icons/ri";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Grid from "@mui/material/Grid";
import "./project.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import healthcare from "../project/healthcare.svg";
import hut from "../project/rural.svg";
import study from "../project/education.svg";
import gitlab from "../project/gitlab.svg";
import Cross from "../project/cross.svg";
import more from "../project/search_bar_more.svg";
import DotG1 from "../project/active/dot.svg";
import NdotG1 from "../project/not/dot.svg";
import DotS from "../project/active/dot.svg";
import NdotS from "../project/not/dot.svg";
import Dotf from "../project/active/dot.svg";
import Ndotf from "../project/not/dot.svg";
import {  Slider } from "@material-ui/core";
import Vector from "../project/Vector.svg";
import Typography from '@material-ui/core/Typography';
import scrollbar from "../project/scrollbar.svg";



export const Project = () => {
  const navigate = useNavigate();
  const [bar, setbar] = useState(0);
  const [owner, setowner] = useState("Owner");
  const [dotG1, setdotG1] = useState(0);
  const [dotG2, setdotG2] = useState(0);
  const [dotG3, setdotG3] = useState(0);
  const [dotG4, setdotG4] = useState(0);

  const [dotS1, setdotS1] = useState(0);
  const [dotS2, setdotS2] = useState(0);
  const [dotS3, setdotS3] = useState(0);
  const [dotS4, setdotS4] = useState(0);

  const [dotF1, setdotF1] = useState(0);
  const [dotF2, setdotF2] = useState(0);
  const [dotF3, setdotF3] = useState(0);
  const [dotF4, setdotF4] = useState(0);
  const [image1, setimage1] = useState(0);
  const [image2, setimage2] = useState(0);
  const [image3, setimage3] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const [changeStartDate, setchangeStartDate] = useState(Date);
  const [changeEndDate, setchangeEndDate] = useState(Date);
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const newdate = day + "/" + month + "/" + year;


  const chnageimg1 = () => {
    setimage1(1);
    setimage2(0);
    setimage3(0);
    usefulData.projectField = "educational";
  };
  const chnageimg2 = () => {
    setimage1(0);
    setimage2(1);
    setimage3(0);
    usefulData.projectField = "healthcare";
  };
  const chnageimg3 = () => {
    setimage1(0);
    setimage2(0);
    setimage3(1);
    usefulData.projectField = "livelihood";
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setchangeStartDate(newDate);
  };

  const handleDateChange2 = (e) => {
    const newDate = e.target.value;
    setchangeEndDate(newDate);
  };

  var tok = window.localStorage.getItem("token");
  useEffect(() => {
    if (tok === 0) {
      navigate("/");
    }
  });
  //scroll bar component
  
  

  const [usefulData, setusefulData] = useState({
    projectCreatedBy: "69d45a7890gh90b80b19i09",
    projectName: "",
    projectField: "",
    projectDescription: "",
    projectOwner: "",
    projectManager: "",
    projectDateStart: Date,
    projectDateEnd: Date,
    skillsRequired: "",
    totalDevTimeRequired: "",
    // numberOfModules: "",
  });

  usefulData.projectDateStart = changeStartDate;
  usefulData.projectDateEnd = changeEndDate;
  // const CreateP = () => {

  // };

  let name, value;
  const change = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    const words = value.trim().split(" ");
    if (words.length <= 30) {
      setusefulData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    } else {
      value = words.slice(0, 30).join(" ");
      setusefulData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const ProjAdd = () => {
    const timestamp = new Date(); // Get the current timestamp
  
    // Retrieve user's IP address using external API
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        const ipAddress = response.data.ip;
  
        axios
          .post("http://localhost:5030/create-project-DB", usefulData)
          .then((res) => {
            const projectId = res.data._id; // Assign the _id from the response to projectId
  
            const logData = {
              index: usefulData.projectField,
              data: {
                EventId: "1",
                Eventtype: "response",
                UserID: usefulData.projectCreatedBy,
                status: "success",
                index: "psuw001-Badal",
                application: "Baadal",
                eventtype: "response",
                userid: "89bj87njkink900",
                component: "project",
                status: "",
                timestamp: timestamp.toISOString(), // Assign the timestamp as an ISO string
                message: "Project added to collection",
                orgId: "389bdiej",
                projectid: projectId, // Assign projectId to projectid
                apicall: "POST /create-project-DB",
                ipAddress: ipAddress
              }
            };
  
            axios
              .post("http://localhost:5030/log", logData)
              .then((res) => {
                console.log("Success message sent to /log endpoint");
              })
              .catch((err) => {
                console.log(err);
              });
  
            window.location.reload();
          })
          .catch((err) => {
            const logData = {
              index: usefulData.projectField,
              data: {
                EventId: "1",
                Eventtype: "response",
                UserID: usefulData.projectCreatedBy,
                status: "fail",
                index: "psuw001-badal",
                application: "Badaal",
                userid: "78h8ghbjhs89bdsj",
                component: "project",
                status: "fail",
                timestamp: timestamp.toISOString(), // Assign the timestamp as an ISO string
                message: "failed to add to collection",
                orgId: "389bdiej",
                projectid: "",
                apicall: "POST /create-project-DB",
                ipAddress: ipAddress
              }
            };
  
            axios
              .post("http://localhost:5030/log", logData)
              .then((res) => {
                console.log("Fail message sent to /log endpoint");
              })
              .catch((err) => {
                console.log(err);
              });
  
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
              
  const ModuleChart = ({ name, completed, assigned, unassigned }) => {
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const completedPercent = completed / 100;
    const assignedPercent = assigned / 100;
    const unassignedPercent = unassigned / 100;
    const assignedOffset = completedPercent * circumference;
    const unassignedOffset =
      (completedPercent + assignedPercent) * circumference;

    // Calculate the partition angles
    const assignedAngle = assignedPercent * 360;
    const unassignedAngle = unassignedPercent * 360;
    const completedAngle = completedPercent * 360;

    // Calculate the partition paths
    const completedPath = describeArc(33, 30, radius, 0, completedAngle);
    const assignedPath = describeArc(
      33,
      30,
      radius,
      completedAngle,
      completedAngle + assignedAngle
    );
    const unassignedPath = describeArc(
      33,
      30,
      radius,
      completedAngle + assignedAngle,
      completedAngle + assignedAngle + unassignedAngle
    );

    return (
      <svg
        width="78"
        height="96"
        class="marginLeft1"
        style={{ display: "inline" }}
      >
        <circle
          cx="33"
          cy="30"
          r={radius}
          strokeWidth="1"
          stroke="#000000"
          fill="#F0FFF0"
        />
        <path d={completedPath} fill="#FFC300" />
        <path d={assignedPath} fill="#5A5A5A" />
        <path d={unassignedPath} fill="#FFF5EE" />
        <text x="33" y="75" fill="#4e4e4e" fontSize="12" textAnchor="middle">
          {" "}
          {name}{" "}
        </text>
        {/* <text x="0" y="70" fill="#4e4e4e" fontSize="12">
          {" "}
          {name}{" "}
        </text> */}
      </svg>
    );
  };

  // Helper function to describe an arc path
  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${x} ${y} Z`;
  }

  // Helper function to convert polar coordinates to Cartesian coordinates
  function polarToCartesian(x, y, radius, angle) {
    const radians = ((angle - 90) * Math.PI) / 180;
    return {
      x: x + radius * Math.cos(radians),
      y: y + radius * Math.sin(radians),
    };
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  useEffect(() => {
    fetch("http://localhost:5030/get-project-DB", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProjectData(result);
      });
  }, []);

  const [moduleDetails, setModuleDetails] = React.useState([]);

React.useEffect(() => {
  axios
    .get("http://localhost:5030/get-allmodules")
    .then((res) => {
      setModuleDetails(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

React.useEffect(() => {
  console.log(moduleDetails);
}, [moduleDetails]);

  


  const [chipData, setChipData] = React.useState([]);

  const [moduleData, setModuleData] = React.useState([
    {
      key: 0,
      label: "Module 1",
      completed: "45",
      assigned: "15",
      unassigned: "10",
    },
    {
      key: 1,
      label: "Module 2",
      completed: "75",
      assigned: "15",
      unassigned: "10",
    },
    {
      key: 2,
      label: "Module 3",
      completed: "75",
      assigned: "15",
      unassigned: "10",
    },
    {
      key: 3,
      label: "Module 4",
      completed: "75",
      assigned: "15",
      unassigned: "10",
    },
  ]); 

  const [projectData, setProjectData] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) =>
    // chips.filter((chip) => chip !== chipToDelete)
    // );
  };

  // Search Bar
  const [sliderValues, setSliderValues] = useState(
    projectData.map(() => 0)
  );

  const handleSliderChange = (index) => (event, value) => {
    setSliderValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  return (
    // <div style={{ backgroundColor: "whitesmoke" }}>
    <header>
      <TopBar />
      {/* <SideNav /> */}
      <React.Fragment>
        <button
          type="button"
          className="block shadow-inner"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ backgroundColor: "#d9d9d9" }}
        >
          <p className="font-semibold text-[1.3rem]">
            <span className="text-[1.5rem]">+</span>&nbsp;&nbsp;&nbsp;&nbsp;Add
            Project
          </p>
        </button>
        <div
          className="modal modal-xl fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog rounded-xl"
            style={{ border: "dotted 3px" }}
            id="exampleModalLabel"
          >
            <div
              className="modal-content custom"
              style={{ border: "2px inherit black" }}
            >
              <div class="modal-header">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <input
                        className="font-bold w-full rounded-md shadow-inner px-3 mt-3 h-12 text-[1.5rem]"
                        value={usefulData.projectName}
                        onChange={change}
                        name="projectName"
                        placeholder="Project Name"
                        type="text"
                        style={{ boxShadow: "inset 0 0 10px #5C5C5C" }}
                      />
                    </div>
                    <div className="col-md">
                      <div className="row">
                        <div className="col-md flex flex-col gap-2">
                          <p
                            className="flex text-base font-semibold rounded-full p-2 w-fit ml-auto"
                            style={{ backgroundColor: "#d9d9d9" }}
                          >
                            created by : aakrit kumar {/*data from backend */}
                          </p>
                          <p
                            className="flex text-base font-semibold rounded-full p-2 w-fit ml-auto mr-4"
                            style={{ backgroundColor: "#d9d9d9" }}
                          >
                            created on : {newdate} {/*data from backend */}
                          </p>
                        </div>

                        <button
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex" style={{ border: "2px dashed black" }}>
                  <div class="modal-body">
                    <div className="flex flex-1 flex-col gap-2 mt-1">
                      <label className="flex gap-4">
                        <p className="text-[1.2rem] font-semibold text-black">
                          Field Of Project
                        </p>

                        {image1 ? (
                          <img
                            src={study}
                            className="w-10 object-cover bg-slate-200"
                            alt="education"
                          />
                        ) : (
                          <img
                            src={study}
                            className="w-10 object-cover hover:bg-slate-200"
                            alt="education"
                            onClick={chnageimg1}
                          />
                        )}

                        {image2 ? (
                          <img
                            src={healthcare}
                            className="w-10 object-cover bg-slate-200"
                            alt="health care"
                          />
                        ) : (
                          <img
                            src={healthcare}
                            className="w-10 object-cover hover:bg-slate-200"
                            alt="health care"
                            onClick={chnageimg2}
                          />
                        )}

                        {image3 ? (
                          <img
                            src={hut}
                            className="w-10 object-cover bg-slate-200"
                            alt="Rural"
                          />
                        ) : (
                          <img
                            src={hut}
                            className="w-10 object-cover hover:bg-slate-200"
                            alt="Rural"
                            onClick={chnageimg3}
                          />
                        )}
                      </label>
                    </div>
                    <br />
                    <label className="flex gap-2">
  <p className="text-[1.2rem] font-semibold text-black">
    Description
  </p>
</label>  
<div className="flex overflow-hidden">
  <textarea
    rows="5"
    cols="10"
    wrap="soft"
    className="h-24 w-full shadow-inner rounded-lg px-3 py-2"
    value={usefulData.projectDescription}
    onChange={change } //125
    name="projectDescription"
    type="text"
    placeholder="Description"
    style={{ boxShadow: "inset 0 0 10px #5C5C5C" }}
  ></textarea>
</div>
{usefulData.projectDescription.trim().split(" ").length > 30 && (
  <p className="text-red-500">30 word limit exceeded</p>
)}


                    <div className="grid grid-cols-2 mt-4">
                      <div className="flex flex-col items-start justify-center flex-1 gap-4">
                        <label className="flex gap-4">
                          <p className="text-[1.2rem] font-semibold text-black">
                            Project Owner
                          </p>

                          <div class="dropdown required-field flex">
                            <button
                              // style={{border:'solid'}}
                              className="btn dropdown-toggle flex gap-5 mt-0 shadow-inner"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                              style={{ boxShadow: "inset 0 0 10px #5C5C5C" }}
                            >
                              {owner}
                            </button>
                            <ul class="dropdown-menu gap-1">
                              <li
                                onClick={() => {
                                  setowner("Org 1");
                                  usefulData.projectOwner = "Org 1";
                                }}
                              >
                                <p class="dropdown-item">Org 1</p>
                              </li>
                              <li
                                onClick={() => {
                                  setowner("Org 2");
                                  usefulData.projectOwner = "Org 2";
                                }}
                              >
                                <p class="dropdown-item">Org 2</p>
                              </li>
                              <li
                                onClick={() => {
                                  setowner("Org 3");
                                  usefulData.projectOwner = "Org 3";
                                }}
                              >
                                <p class="dropdown-item">Org 3</p>
                              </li>
                            </ul>
                          </div>
                        </label>

                        <label className="flex">
                          <p className="text-[1.2rem] font-semibold text-blac w-full">
                            Start Date
                          </p>
                          <input
                            type="date"
                            value={changeStartDate}
                            // name="StartDate"
                            onChange={handleDateChange}
                            class="form-control ml-8"
                            style={{ boxShadow: "inset 0 0 10px #5C5C5C" }}
                          />
                        </label>
                      </div>
                      <div className="flex flex-col items-start justify-center flex-1 gap-4 ">
                        <label className="flex gap-4">
                          <p className="text-[1.2rem] font-semibold text-black top-10">
                            Project Manager
                          </p>
                          <div className="required-field flex">
                            <input
                              className="shadow-inner rounded-md px-2 h-10"
                              value={usefulData.projectManager}
                              onChange={change}
                              name="projectManager"
                              type="text"
                              placeholder="Manager"
                              style={{ boxShadow: "inset 0 0 10px #5C5C5C" }}
                              required
                            />
                          </div>
                        </label>

                        <label className="flex">
                          <p className="text-[1.2rem] font-semibold text-black w-full">
                            End Date
                          </p>
                          <input
                            className="ml-14 form-control"
                            type="date"
                            value={changeEndDate}
                            // name="EndDate"
                            onChange={handleDateChange2}
                            style={{ boxShadow: "inset 0 0 10px #5C5C5C" }}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="grids grid-cols-1 mt-4 w-full">
                        <div className="flex flex-col items-start justify-center flex-1 gap-4 ">
                          <label className="flex gap-2">
                            <p className="text-[1.2rem] font-semibold text-black">
                              Skills
                            </p>
                            <input
                              className="shadow-inner ml-24 w-96 h-10 rounded-md px-2"
                              value={usefulData.skillsRequired}
                              onChange={change}
                              name="skillsRequired"
                              type="text"
                              placeholder="Skills(space separated)"
                              style={{ boxShadow: "inset 0 0 10px #5C5C5C" }}
                            />
                          </label>
                          <label className="flex gap-2">
                            <p className="text-[1.2rem] font-semibold text-black">
                              Dev. Time <br />
                              Required
                            </p>
                            <div className="required-field">
                              <input
                                className="shadow-inner w-16 ml-14 rounded-md px-1"
                                value={usefulData.totalDevTimeRequired}
                                onChange={change}
                                name="totalDevTimeRequired"
                                type="Number"
                                placeholder="Time"
                                style={{
                                  boxShadow: "inset 0 0 10px #5C5C5C",
                                }}
                                required
                              />
                            </div>
                            <p className="text-base text-black">hours</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* till here for now */}

              <div class="modal-footer justify-center">
                <button
                  type="button"
                  className="flex w-[97%] py-3 justify-center text-[1.5rem] rounded-lg"
                  onClick={ProjAdd}
                  style={{ backgroundColor: "#d9d9d9" }}
                >
                  <h1 className="font-bold text-black">Create Project</h1>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="searchbarcss justify-center items-start">
          <form class="example" action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i class="fa fa-search"></i>
            </button> 
            <button type="filter">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div> */}

<div className="row px-20"  style={{width:"1250px",paddingLeft:"1px", marginLeft:"1px"}}>
          <div>
            <div className="flex mr-9">
              <i
                className="fa fa-search py-2 left-[90%] mt-0.5"
                style={{ position: "relative", cursor: "grab" }}
                onClick={() => {
                  navigate("/home");
                }}
              ></i>
              <img
                src={more}
                className="left-[91.5%] mt-0.5 transition-all ease-in-out duration-75"
                style={{
                  position: "relative",
                  cursor: "grab",
                  height: "30px",
                }}
                onClick={() => {
                  setbar(!bar);
                }}
                alt="more"
              />
              <input
                className="rounded-full w-full h-9 px-3"
                style={{ border: "solid 1px"}}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        {bar ? (
          <div className="px-32 ml-6">
            <div
              className="grid grid-cols-2 h-56 w-full rounded-lg gap-2"
              style={{ backgroundColor: "#4e4e4e", border: "dashed 2px" }}
            >
              <div className="grid grid-cols-2 gap-3 mt-1 ml-20">
                <div
                  className="flex bg-white h-52 w-full rounded-lg"
                  style={{ border: "dashed" }}
                >
                  <div className="col">
                    <div className="row flex px-2">
                      <h1 className="text-[1.3rem] text-textColor font-semibold tracking-wider px-2 py-1">
                        Group By:
                      </h1>
                    </div>
                    <div className="row flex mt-1">
                      <div className="ml-2 flex col">
                        {dotG1 ? (
                          <img
                            src={DotG1}
                            alt="dot1"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG1(!dotG1);
                            }}
                          />
                        ) : (
                          <img
                            src={NdotG1}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG1(!dotG1);
                            }}
                            alt="dot1"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex -ml-20">
                          <div
                            className="flex rounded-full items-center justify-center h-6 w-16"
                            style={{ border: "solid" }}
                          >
                            <div className="flex">
                              <p>None</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row flex mt-3">
                      <div className="ml-2 flex col">
                        {dotG2 ? (
                          <img
                            src={DotG1}
                            alt="dot2"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG2(!dotG2);
                            }}
                          />
                        ) : (
                          <img
                            src={NdotG1}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG2(!dotG2);
                            }}
                            alt="dot2"
                          />
                        )}
                      </div>

                      <div className="col">
                        <div className="flex -ml-20">
                          <div
                            className="flex rounded-full items-center justify-center h-6 w-16"
                            style={{ border: "solid" }}
                          >
                            <div className="flex">
                              <p>Field</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row flex mt-3">
                      <div className="ml-2 flex col">
                        {dotG3 ? (
                          <img
                            src={DotG1}
                            alt="dot3"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG3(!dotG3);
                            }}
                          />
                        ) : (
                          <img
                            src={NdotG1}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG3(!dotG3);
                            }}
                            alt="dot3"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex -ml-20">
                          <div
                            className="flex rounded-full items-center justify-center h-6 p-2"
                            style={{ border: "solid" }}
                          >
                            <div className="flex">
                              <p>Skills Required</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row flex mt-3">
                      <div className="ml-2 flex col">
                        {dotG4 ? (
                          <img
                            src={DotG1}
                            alt="dot4"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG4(!dotG4);
                            }}
                          />
                        ) : (
                          <img
                            src={NdotG1}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotG4(!dotG4);
                            }}
                            alt="dot4"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex -ml-20">
                          <div
                            className="flex rounded-full items-center justify-center h-6 p-1"
                            style={{ border: "solid" }}
                          >
                            <p>Organisation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex bg-white h-52 rounded-lg"
                  style={{ border: "dashed" }}
                >
                  <div className="col">
                    <div className="row flex px-2">
                      <h1 className="text-[1.3rem] text-textColor font-semibold tracking-wider px-2 py-1">
                        Sort By:
                      </h1>
                    </div>
                    <div className="row flex mt-1">
                      <div className="ml-2 flex col">
                        {dotS1 ? (
                          <img
                            src={DotS}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS1(!dotS1);
                            }}
                            alt="dot1"
                          />
                        ) : (
                          <img
                            src={NdotS}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS1(!dotS1);
                            }}
                            alt="dot1"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex">
                          <div
                            className="flex rounded-full items-center justify-center h-6 w-fit p-1 -ml-20"
                            style={{ border: "solid" }}
                          >
                            <p>Name</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row flex mt-3">
                      <div className="ml-2 flex col">
                        {dotS2 ? (
                          <img
                            src={DotG1}
                            alt="dot2"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS2(!dotS2);
                            }}
                          />
                        ) : (
                          <img
                            src={NdotG1}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS2(!dotS2);
                            }}
                            alt="dot2"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex">
                          <div
                            className="flex rounded-full items-center justify-center h-6 w-fit p-1 -ml-20"
                            style={{ border: "solid" }}
                          >
                            <div className="flex">
                              <p>Oldest</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row flex mt-3">
                      <div className="ml-2 flex col">
                        {dotS3 ? (
                          <img
                            src={DotG1}
                            alt="dot3"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS3(!dotS3);
                            }}
                          />
                        ) : (
                          <img
                            src={NdotG1}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS3(!dotS3);
                            }}
                            alt="dot3"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex">
                          <div
                            className="flex rounded-full items-center justify-center h-6 w-fit p-1 -ml-20"
                            style={{ border: "solid" }}
                          >
                            <div className="flex">
                              <p>Newest</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row flex mt-3">
                      <div className="ml-2 flex col">
                        {dotS4 ? (
                          <img
                            src={DotG1}
                            alt="dot4"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS4(!dotS4);
                            }}
                          />
                        ) : (
                          <img
                            src={NdotG1}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotS4(!dotS4);
                            }}
                            alt="dot4"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex">
                          <div
                            className="flex rounded-full items-center justify-center w-fit -ml-20"
                            style={{ border: "solid" }}
                          >
                            <div className="container">
                              <p>Time Required</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mt-1">
                <div
                  className="flex bg-white rounded-lg w-[90%] h-52"
                  style={{ border: "dashed" }}
                >
                  <div className="col">
                    <div className="row flex px-2">
                      <h1 className="text-[1.3rem] text-textColor font-semibold tracking-wider px-2 py-1">
                        Filter By:
                      </h1>
                    </div>
                    <div className="row flex mt-1">
                      <div className="ml-2 flex col-3">
                        {dotF1 ? (
                          <img
                            src={Dotf}
                            alt="dot1"
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotF1(!dotF1);
                            }}
                          />
                        ) : (
                          <img
                            src={Ndotf}
                            style={{ height: "25px" }}
                            onClick={() => {
                              setdotF1(!dotF1);
                            }}
                            alt="dot1"
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="flex">
                          <div class="dropdown">
                            <button
                              class="btn dropdown-toggle rounded-full h-6 p-2 flex -ml-2"
                              style={{ border: "solid" }}
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <p className="-mt-2.5">Organisation</p>
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a class="dropdown-item" href="#">
                                  Action
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Another action
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="row flex mt-3">
                        <div className="ml-2 flex col">
                          {dotF2 ? (
                            <img
                              src={Dotf}
                              alt="dot4"
                              style={{ height: "25px" }}
                              onClick={() => {
                                setdotF2(!dotF2);
                              }}
                            />
                          ) : (
                            <img
                              src={Ndotf}
                              style={{ height: "25px" }}
                              onClick={() => {
                                setdotF2(!dotF2);
                              }}
                              alt="dot4"
                            />
                          )}
                        </div>
                        <div className="col">
                          <div className="flex">
                            <div class="dropdown">
                              <button
                                class="btn dropdown-toggle rounded-full h-6 p-2 flex -ml-12"
                                style={{ border: "solid" }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <p className="-mt-2.5">Field</p>
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="ml-2 flex col">
                          {dotF3 ? (
                            <img
                              src={Dotf}
                              alt="dot4"
                              style={{ height: "25px" }}
                              onClick={() => {
                                setdotF3(!dotF3);
                              }}
                            />
                          ) : (
                            <img
                              src={Ndotf}
                              style={{ height: "25px" }}
                              onClick={() => {
                                setdotF3(!dotF3);
                              }}
                              alt="dot4"
                            />
                          )}
                        </div>
                        <div className="col">
                          <div className="flex">
                            <div class="dropdown">
                              <button
                                class="btn dropdown-toggle rounded-full h-6 p-2 flex"
                                style={{ border: "solid" }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <p className="-mt-2 text-[0.9rem]">
                                  Skills Required
                                </p>
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row flex mt-3">
                        <div className="ml-2 flex col">
                          {dotF4 ? (
                            <img
                              src={Dotf}
                              alt="dot4"
                              style={{ height: "25px" }}
                              onClick={() => {
                                setdotF4(!dotF4);
                              }}
                            />
                          ) : (
                            <img
                              src={Ndotf}
                              style={{ height: "25px" }}
                              onClick={() => {
                                setdotF4(!dotF4);
                              }}
                              alt="dot4"
                            />
                          )}
                        </div>
                        <div className="col">
                          <div className="flex">
                            <div class="dropdown">
                              <button
                                class="btn dropdown-toggle rounded-full h-6 p-2 flex mr-1"
                                style={{ border: "solid" }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <p className="-mt-2 text-[0.9rem]">
                                  Time Required
                                </p>
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mt-14 mr-14">
                    <div className="flex flex-col flex-1 items-center gap-4">
                      <button
                        className="h-9 w-[70%] rounded-full font-semibold bg"
                        style={{ border: "solid", backgroundColor: "#D9D9D9" }}
                      >
                        Clear
                      </button>
                      <button
                        className="h-9 w-[70%] rounded-full font-semibold"
                        style={{ border: "solid", backgroundColor: "#D9D9D9" }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* MAPPING OF DATA STARTS HERE  */}
        {projectData.map((project, index) => (
          <>
            <div key={index}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 4,
                  ml: 7.9,
                  mr: 7.9,
                }}
                component="ul"
                elevation={4}
              >
                <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                  <Grid item xs={1} sx={{ border: "1px dashed grey",borderRadius:"4px",width:"700px",background:"#D9D9D9",display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {project.projectField === "educational" ? (
                      <img src={study} alt="Not Available" style={{height:"50px", width:"50px"}}  />
                    ) : project.projectField === "healthcare" ? (
                      <img src={healthcare} alt="Not Available" style={{height:"50px", width:"50px"}} />
                    ) : project.projectField === "livelihood" ? (
                      <img src={hut} alt="Not Available" style={{height:"50px", width:"50px"}}/>
                    ) : (
                      <img alt="Not Available" />
                    )}
                    {/* <img src={project.img} alt="Not Available" /> */}
                  </Grid>
                  <Grid item xs sx={{ border: "1px dashed grey", position: "relative" }}>
                    <Item
                      onClick={() => {
                        navigate("/module/" + project.projectName);
                      }}
                      elevation={0}
                      sx={{ textAlign: "left", fontWeight: "bold", fontSize: "24px", color: "#4E4E4E" }}
                    >
                      {project.projectName}
                    </Item>
                    <div style={{ maxHeight: "200px", overflowY: "auto", paddingLeft:"10px", marginRight:"10px" }}>
                      <p>{project.projectDescription}</p>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0 }}>
                    <img src={gitlab} alt="GitLab Icon" style={{ width: "24px", height: "24px", flexShrink: 0, textAlign:"left", marginBottom:"5px",marginLeft:"10px" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                      <Item elevation={0} sx={{ textAlign: "right", fontWeight: "bold" }}>
                        Date: {project.projectDateCreated.substring(0, 10)}
                      </Item>
                    </div>
                </Grid>


                  <Grid item xs>
                    <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                      
<Grid item xs>
  <Grid sx={{ flexGrow: 1 }} container spacing={0}>
  <Grid item xs={12} sx={{ border: "1px dashed grey" }}>
  <Item elevation={0} sx={{ textAlign: "left" }}>
    <Typography variant="subtitle1" className="mgn" style={{ color: "#4E4E4E" ,fontFamily: "Roboto" }}>
      SKILLS REQUIRED
    </Typography>
    <div style={{ marginTop: "10px", display: "flex", flexWrap:"wrap", justifyContent: project.skillsRequired.split(" ").length < 3 ? "flex-start" : "center", alignItems:"center"}}>
      {project.skillsRequired.split(" ").map((data, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0 5px",
            marginBottom:"5px",
            minWidth: "fit-content",
            padding: "4px 14px",
            borderRadius: "16px",
            backgroundColor: "white",
            border: "2px solid grey",
            fontFamily: "Roboto",
            fontWeight:"bold",
          }}
        >
          <Typography variant="body2">{data}</Typography>
        </div>
      ))}
    </div>
  </Item>
</Grid>
  </Grid>
</Grid>
<Grid item xs>
                        <Grid sx={{ flexGrow: 1,width:'450px' }} container spacing={0}>
                          <Grid item xs={4} sx={{ border: "1px dashed grey" }}>
                            <Item elevation={0} sx={{ padding: 0 ,  marginTop:"25px", fontsize: "12px" , color:"#4E4E4E" , fontsize:"12px", fontWeight:"bold", contentSize:'fixed'}}>
                              Total Dev Time
                            </Item>
                            <Item elevation={0} sx={{ padding: 0 , marginTop:"5px", color:"#4E4E4E", fontSize:"12px",fontWeight:"bold" , contentSize:'fixed'}}>
                              Required
                            </Item>
                            <Item
                              elevation={0}
                              sx={{ fontSize: 40, padding: 0 , contentSize:'fixed'}}
                            >
                              {project.totalDevTimeRequired}
                            </Item>
                            <Item elevation={0} sx={{ padding: 0 , fontWeight:"bold", contentSize:'fixed'}}>
                              Hours
                            </Item>
                          </Grid>
                          <Grid item xs={1} sx={{ border: "1px dashed grey", backgroundColor:"#D9D9D9", contentSize:'fixed' }}>
                            <Item
                              elevation={0}
                              class="rotatetext MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-12vq0h9-MuiPaper-root"
                              style={{ textAlign:"center", marginTop:"56px", backgroundColor:"#D9D9D9" ,fontWeight:"bold"}}
                            >
                              STATUS
                            </Item>
                            <div style={{ marginTop:'50px', paddingTop:"2px", textAlign:"center" , width:"24px" , height :"25px", marginLeft:"auto"}}>
                              <img src={Vector} />
                            </div>
                          </Grid>
           
                          <Grid item xs={7} sx={{ border: "1px dashed grey", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
  <div style={{ width: "100%", overflowX: "hidden", marginTop: "-2px" }}>
    <div sx={{ display: "inline" }} className="flex">
      {moduleDetails
        .filter((data) => project.projectName === data.projectName)
        .map((data, dataIndex) => (
          <div
            key={dataIndex}
            style={{
              transform: `translateX(calc(-${sliderValues[index]} * (100% - 40px)))`,
              transition: "transform 0.6s ease",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ModuleChart
              name={data.moduleName}
              completed={data.completed}
              assigned={data.assigned}
              unassigned={data.unassigned}
              sx={{ width: "40px", height: "40px", display: "inline" }}
            />
         </div>
        ))}
    </div>
  </div>
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    {moduleDetails.filter((data) => project.projectName === data.projectName).length > 3 && (
      <Slider
        defaultValue={0}
        min={0}
        max={moduleDetails.filter((data) => project.projectName === data.projectName).length - 1}
        step={1}
        style={{ marginTop: "-10px", marginBottom: "5px" }}
        aria-labelledby="slider-bar"
        onChange={(event, value) => {
          const newSliderValues = [...sliderValues];
          newSliderValues[index] = value;
          setSliderValues(newSliderValues);
        }}
        ThumbComponent={({ children, ...rest }) => (
          <div
            {...rest}
            style={{
              transform: `translateX(calc(-${sliderValues[index]} * (100% - 77px)))`,
              transition: "transform 0.6s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5px",
              flexShrink: 0,
            }}
          >
            <img src={scrollbar} alt="Scroll" style={{ width: "90px", height: "10px", boxShadow: "none" }} />
          </div>
        )}
      />
    )}
  </div>
  
  <div style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "hidden", marginBottom: "-2px" }}>
    {moduleDetails
      .filter((data) => project.projectName === data.projectName)
      .map((data, dataIndex) => (
        <div
          key={dataIndex}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2px",
            padding: "0 10px",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              fontSize: "11px",
              lineHeight: "20px",
              transform: `translateX(calc(-${sliderValues[index]} * (100% - 40px)))`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.6s ease",
              width: "100%", 
            }}
          >
          {data.totalDevTimeRequired}Hours&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
        </div>
      ))}
  </div>
</Grid>

                                </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={1.5} sx={{ border: "1px dashed grey" ,background:"#D9D9D9",display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {project.projectField === "educational" ? (
                      <img src={study} alt="Not Available" style={{height:"50px", width:"50px"}}/>
                    ) : project.projectField === "healthcare" ? (
                      <img src={healthcare} alt="Not Available" style={{height:"50px", width:"50px"}} />
                    ) : project.projectField === "livelihood" ? (
                      <img src={hut} alt="Not Available" style={{height:"50px", width:"50px"}} />
                    ) : (
                      <img alt="Not Available" style={{height:"50px", width:"50px"}} />
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </>
        ))}
      </React.Fragment>
    </header>
    // </div>
  );
};

export default Project;


