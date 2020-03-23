import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Overlay, Popover } from "react-bootstrap";

const TodoItemPopover = props => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(() => {
    console.log("gh")
    handleClick()
  })

  return (
    <div ref={ref}>
      <Overlay
        show={show}
        target={target}
        container={ref.current}
        placement="left"
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Popover bottom</Popover.Title>
          <Popover.Content>
            <strong>Holy guacamole!</strong> Check this info.
      </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  )
  
}   

export default withRouter(TodoItemPopover);