import React, { useState, useRef } from 'react';
import { withRouter } from "react-router-dom";
import Info from "@material-ui/icons/Info"
import { Overlay, Popover, Button } from "react-bootstrap";
import { store } from '../../../../../../redux/store';
import axios from "axios";

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
        <Popover id="popover-contained" style={{marginLeft: "30px", width: "max-content", overflow: "hidden" }}>
          <Popover.Title style={{ fontSize: "130%", fontWeight: "15" }}>{props.title.name}</Popover.Title>
          <Popover.Content style={{ display: "inline-block" }}>
            <p style={{ fontWeight: "450" }}>Description:</p><p style={{ fontWeight: "15" }}>{props.todo.description}</p>

            <Button onClick={async () => {
              await store.dispatch({ type: "POST_CURRENT_WID", payload: props.title.wid })
              props.history.push("/workout/info")
            }} variant={`outline-${props.theme}`} size="sm">Go to workout</Button>
            
            <div style={{ paddingTop: "10px" }}>
              <Button onClick={async () => {
                // await store.dispatch({ type: "REMOVE_TODO", payload: props.iid })

                await store.dispatch({
                  type: "REMOVE_TODO", payload: 
                    axios.delete(
                      `http://localhost:8080/api/v1/user/todos/${store.getState().user.uid}/${store.getState().user.user}/${props.iid}/delete?access_token=${store.getState().user.accessToken}`,
                      {}
                    )
                })

                if (store.getState().todo.error === 200) {
                  window.location.reload()
                }
              }} variant={`outline-danger`} size="sm">Delete Todo</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  )
  
}   

export default withRouter(TodoItemPopover);