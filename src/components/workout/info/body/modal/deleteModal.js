import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

let ConfirmDeleteModal = props => { 

    const [show, setShow] = useState(props.showing);
    const handleClose = () => setShow(false);

    if (show === false) {
        window.location.reload()
    }
    
    return (
        <div> 
            <Modal show={show} style={{ height: "55vh", overflow: "hidden" }} onHide={handleClose}>
                <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
                <Modal.Body style={{ height: "70vh", display: "inline-block" }}>
                    <Form onSubmit={props.handleSubmit} style={{ height: "100%", width: "100%", transform: "translate(-50%,-56%)" }} className="loginForm">
                        <h1 style={{ height: "auto", color: "var(--custom)" }} className="logo">Delete this workout?</h1>

                        <Button variant="outline-danger" style={{ width: "280px", marginBottom: "18px" }} onClick={() => { 
                            props.onSubmit()
                        }}>Delete</Button>
                        
                        <Button variant={`outline-${props.theme}`} style={{ width: "280px" }} onClick={() => { 
                            setShow(false)
                        }}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ConfirmDeleteModal;