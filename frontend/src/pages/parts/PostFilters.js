import React from "react";
import CityDropdown from "./CityDropdown.js";
import TypeDropdown from "./TypeDropdown.js";
import "./PostFilters.css";
import PropTypes from "prop-types";

function PostFilters({
    selectedCity, 
    setSelectedCity, 
    cityOptions, 
    selectedType, 
    setSelectedType, 
    typeOptions
    }) {

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h2>Filter by</h2>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-3">
                </div>
                <div className="col-md-2">
                    <h3>City</h3>
                </div>
                <div className="col-md-2">
                    <h3>Type</h3>
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
                        <div className="col-md-4 text-end"></div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

PostFilters.propTypes = {
    selectedCity: PropTypes.string.isRequired,
    setSelectedCity: PropTypes.func.isRequired,
    cityOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedType: PropTypes.string.isRequired,
    setSelectedType: PropTypes.func.isRequired,
    typeOptions: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default PostFilters;