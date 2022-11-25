import React from 'react';
import PageFooter from './pages/parts/PageFooter.js';
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <div className="container-fluid px-0 main-hero">
                <div className="row d-flex justify-content-center">
                    <img id="home-img" src={ require(".//hero-image.jpeg") } class="img-fluid" alt="city of San Jose" />
                    <div className="centered"><h1 id="landingPageTitle">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg></span>
                        <span> This Is Where</span>
                        </h1></div>
                    <div className="top-right">
                    <Link to="/login" className="btn btn-outline-light" role="button">Log In</Link>

                        {/*<a className="btn btn-outline-light" href="/login" role="button">Log In</a>*/}
                    </div>
                </div>
            </div>
            <div className="container text-center">
            <div className="row d-flex justify-content-center header-row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare 
                        aenean euismod. Justo nec ultrices dui sapien eget mi. Lorem donec massa 
                        sapien faucibus. Vulputate dignissim suspendisse in est ante in nibh mauris. 
                        Lectus quam id leo in vitae turpis massa. Leo vel orci porta non pulvinar neque.</p>
                        <Link to="/signup" className="btn btn-dark" role="button">Sign Up</Link>
                    {/*<a className="btn btn-dark" href="/signup" role="button">Sign Up</a>*/}
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>

            <PageFooter></PageFooter>
        </div>
    )
}

export default LandingPage;