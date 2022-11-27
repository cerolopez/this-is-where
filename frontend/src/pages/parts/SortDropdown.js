import React from "react";

function SortDropdown({selectedSort, setselectedSort, sortOptions}) {

    return (
        <>
        <form>
            <select
                id="filter-form"
                className="form-select-sm"
                value={selectedSort}
                onChange={e => setselectedSort(e.target.value)}>
                    {sortOptions.map((value) => (
                        <option value={value} key={value}>
                            <p id="filter-option">{value}</p>
                        </option>
                    ))}
            </select>
        </form>
        </>
    );
}

export default SortDropdown;