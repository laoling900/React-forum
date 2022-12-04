import React from "react";
import { Row, Col } from "react-bootstrap";
import NewReply from "../fragments/NewReply";


function ForEachReply(props) {

    //This is the component for each reply

    return(
        
        <div key={props.value.reply_id}>
        <br></br>
        <div key={props.value.reply_id} >
            <h6 className="text-primary">{props.value.user.user_name}</h6>
            <div dangerouslySetInnerHTML={{__html:props.value.reply_text}} className="eachReplyText"></div>
            <div><NewReply post_id={props.value.post_id}  replyTo_id={props.value.reply_id}/></div>

            {props.replies.map((i) =>
                i.replyTo_id ===props.value.reply_id &&(
                    <Row key={i.reply_id} >
                        <Col></Col>
                        <Col xs={10}>
                        <h6 className="text-primary">{i.user.user_name}</h6>
                        <div dangerouslySetInnerHTML={{ __html: i.reply_text }}></div>
                        <div><NewReply post_id={props.value.post_id}  replyTo_id={i.replyTo_id}/></div>
                        </Col>
                    </Row>

                )
            )}

            </div>


        </div>
    );
}

export default ForEachReply;

