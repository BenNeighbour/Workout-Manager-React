import React, { useState, useRef } from 'react';
import { withRouter } from "react-router-dom";
import Info from "@material-ui/icons/Info"
import { Overlay, Popover, Button } from "react-bootstrap";

const TodoItemPopover = (props) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div style={{ display: "inline-block", marginLeft: "0.5vw" }}>
      <Button style={{ width: "fit-content", backgroundColor: "white", border: "none", padding: "0" }} onClick={handleClick}><Info style={{ color: "var(--custom)" }} /></Button>

      <Overlay
        show={show}
        target={target}
        container={ref.current}
        placement="left"
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">{props.title.name}</Popover.Title>
          <Popover.Content>
            <b>Description:</b> {props.title.description}
            <br /><br />

            <Button>Go to workout</Button>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  )
  
}   

export default withRouter(TodoItemPopover);