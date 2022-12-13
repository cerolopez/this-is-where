import React from "react";
import PropTypes from "prop-types";

function TypeDropdown({ selectedType, setSelectedType, typeOptions }) {
    return (
        <>
            <form>
                <select
                    className="form-select-sm"
                    aria-label="Select post type to filter by"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {typeOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </form>
        </>
    );
}

TypeDropdown.propTypes = {
    selectedType: PropTypes.string.isRequired,
    setSelectedType: PropTypes.func.isRequired,
    typeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TypeDropdown;
