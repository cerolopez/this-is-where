import React from "react";
import PageSidebar from "./parts/PageSidebar.js";
import PageFooter from "./parts/PageFooter.js";

function PageTemplate() {
    return (
        <div>
            <div>
                <PageSidebar></PageSidebar>
            </div>
            <div>
                <PageFooter></PageFooter>
            </div>
        </div>
    );
}

export default PageTemplate;
