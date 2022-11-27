import React from "react";

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

export default CityDropdown;