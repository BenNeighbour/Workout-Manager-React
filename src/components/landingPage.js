import React from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import "./landingPage.css";

export default class LandingPage extends React.Component {
    redirect(page) { 
        this.props.history.push(`${page}`)
    }
    
    render() {
        return (
            <div className="App">
                <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" className="navbar">
                    <Navbar.Brand href="/">Workout Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={this.redirect.bind(this, "/")}>Home</Nav.Link>
                            <Nav.Link onClick={this.redirect.bind(this, "/login/")}>Log In</Nav.Link>
                            <Nav.Link onClick={this.redirect.bind(this, "/signup/")}>Sign Up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <header className="bg-primary py-5 mb-5" id="banner">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-lg-12">
                                <h1 className="display-4 text-white mt-5 mb-2" id="banner-text">Workout Manager</h1>
                                <p className="lead mb-5 text-white-50">
                                    Your personal Workout Manager and diary, made as a 
                                    Fullstack Software Engineering Project.
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="mb-5" id="info-body">
                    <h2 className="about-header">About the Project</h2>
                    <p>This is a Fullstack Software Engineering Project created by <a href="https://github.com/BenNeighbour">Ben Neighbour</a>, made using React and Spring Boot/Spring Cloud </p>
                    <Button variant="outline-primary" href="https://github.com/BenNeighbour/Workout-Manager-React">Go to GitHub Repository</Button>
                </div>
            </div>
        );
    }
}