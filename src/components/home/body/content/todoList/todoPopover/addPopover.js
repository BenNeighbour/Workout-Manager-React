import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { reduxForm } from "redux-form";

let AddTodoModal = (props) => {
    const [show, setShow] = useState(props.showing);

    const handleClose = () => setShow(false);
  
    if (show === false) {
        window.location.reload()
    }
    
    return (
        <div>
            <Modal show={show} style={{ height: "fit-content" }} onHide={handleClose}>
                <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
                <Modal.Body style={{ height: "50vh" }}>
                    <form onSubmit={props.handleSubmit} style={{transform: "translate(-50%,-56%)"}} className="loginForm">
                        
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}   

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//     <div className="field">
//         <input {...input} className="form-control" placeholder={label} type={type} />

//         <div className="message">
//             {touched && ((error && <p style={{ marginBottom: "0px", marginTop: "0px", color: "red"}}>{error}</p>) || (warning && <p>{warning}</p>))}
//         </div>
//     </div>
// );

AddTodoModal = reduxForm({
    form: "AddTodoForm"
})(AddTodoModal);

export default withRouter(AddTodoModal);