import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PageTemplate from "./pages/PageTemplate.js";
import PostFilters from "./pages/parts/PostFilters";
import Pagination from "./components/Pagination.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const Home = () => {
  const navigate = useNavigate();
  const cityOptions = [
    "All",
    "Alameda",
    "Berkeley",
    "Burlingame",
    "Cupertino",
    "Daly City",
    "Danville",
    "Foster City",
    "Fremont",
    "Gilroy",
    "Hayward",
    "Livermore",
    "Menlo Park",
    "Milpitas",
    "Mountain View",
    "Oakland",
    "Palo Alto",
    "San Carlos",
    "San Francisco",
    "San Jose",
    "San Leandro",
    "San Mateo",
    "San Rafael",
    "Santa Clara",
    "Saratoga",
    "Sunnyvale",
    "Union City",
    "Vallejo",
  ];

  const typeOptions = [
    "All",
    "Memory",
    "Missed Connection",
    "Postcard",
    "Love Letter",
    "Compliment",
    "Freestyle",
  ];
  const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
  const [selectedType, setSelectedType] = useState(typeOptions[0]);

  useEffect(() => {
    async function getAuth() {
      const res = await fetch("/getAuthentication");
      const resJson = await res.json();
      if (!resJson.authenticated) {
        navigate("/login", { replace: true });
      } else {
      }
    }
    getAuth();
  });

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center header-row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="row test-row">
              <div className="col-md-10 test-col">
                <h1>Browse Posts</h1>
              </div>
              <div className="col-md-2 test-col d-flex justify-content-evenly">
                <Link to="/create-post">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="black"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <PostFilters
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        cityOptions={cityOptions}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        typeOptions={typeOptions}
      ></PostFilters>
      <Pagination
        selectedCity={selectedCity}
        selectedType={selectedType}
      ></Pagination>
      <PageTemplate></PageTemplate>
    </div>
  );
};

export default Home;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
