import React from "react";
import PropTypes from "prop-types";

function CityDropdown({selectedCity, setSelectedCity, cityOptions}) {

    return (
        <>
        <form>
            <select
                className="form-select-sm"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}>
                    {cityOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
            </select>
        </form>
        </>
    );
}

CityDropdown.propTypes = {
    selectedCity: PropTypes.string.isRequired,
    setSelectedCity: PropTypes.func.isRequired,
    cityOptions: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default CityDropdown;