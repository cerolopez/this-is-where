import React from "react";

function TypeDropdown({selectedType, setselectedType, typeOptions}) {

    return (
        <>
        <form>
            <select
                className="form-select-sm"
                value={selectedType}
                onChange={e => setselectedType(e.target.value)}>
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

export default TypeDropdown;