import React from "react";
import CityDropdown from "./CityDropdown.js";
import TypeDropdown from "./TypeDropdown.js";
import SortDropdown from "./SortDropdown.js";
import "./PostFilters.css";

function PostFilters({
    selectedCity, 
    setSelectedCity, 
    cityOptions, 
    selectedType, 
    setSelectedType, 
    typeOptions, 
    selectedSort, 
    setSelectedSort, 
    sortOptions
    }) {

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-3"></div>
                <div className="col-md-4">
                    <h5>Filter by</h5>
                </div>
                <div className="col-md-2 text-end">
                    <h5>Sort</h5>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-3">
                </div>
                <div className="col-md-2">
                    <p id="filter-label">City</p>
                </div>
                <div className="col-md-2">
                    <p id="filter-label">Type</p>
                </div>
                <div className="col-md-2 text-end">
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <CityDropdown
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                cityOptions={cityOptions}
                            ></CityDropdown>
                        </div>
                        <div className="col-md-4">
                            <TypeDropdown
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                typeOptions={typeOptions}
                            ></TypeDropdown>
                        </div>
                        <div className="col-md-4 text-end">
                            <SortDropdown
                                selectedSort={selectedSort}
                                setSelectedSort={setSelectedSort}
                                sortOptions={sortOptions}
                            ></SortDropdown>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default PostFilters;