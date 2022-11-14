import React, { prevState, useState, useEffect, useRef } from "react";
import { Comment, Form, Button, Header, Icon } from "semantic-ui-react";
import moment from "moment";
import axios from "axios";

import human from "./img/human.png";
// npm install moment

function SingleComment(detail) {
  let user = sessionStorage.getItem("mem_Id");

  const idRef = useRef([]);
  const contentRef = useRef([]);

  function comment() {
    axios
      .get("/detail", {
        mem_Id: idRef.current.value,
        rv_Content: contentRef.current.value,
      })
      .then(function (res) {
        console.log("이건 코멘트", res);
      });
  }
  return (
    <Comment>
      <Comment.Content>
        <Comment.Avatar src={human} width="50px" />
        <Comment.Author as="a">{user}</Comment.Author>
        <Comment.Metadata ref={idRef}>
          <div>{detail.info.time}</div>
        </Comment.Metadata>
        <Comment.Text ref={contentRef}>{detail.info.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      inputContent: "",
      inputTime: "",
      commentsList: [],
      //
    };
  }

  render() {
    console.log(this.state.commentsList);
    return (
      <Comment.Group className="comment">
        {/* <Header as='h3' dividing className='comment'>
                    Comments
                </Header> */}

        {this.state.commentsList.map((comments) => (
          <SingleComment info={comments} />
        ))}

        <Form reply>
          {/* 밑에 댓글창 박스에 댓글을 입력해주세요 ~~ */}
          <Form.TextArea
            value={this.state.inputContent}
            placeholder="댓글을 입력해주세요"
            onChange={(e) => this.setState({ inputContent: e.target.value })}
          />
          <button
            type="button"
            content="등록?"
            labelPosition="left"
            icon="edit"
            primary
            onClick={() => {
              if (this.state.inputContent != "") {
                this.setState((prevState) => {
                  return {
                    commentsList: [
                      ...prevState.commentsList,
                      {
                        content: this.state.inputContent,
                        time: moment().format("YYYY년 MM월 DD일 HH시 mm분"),
                      },
                    ],
                    inputContent: "",
                  };
                });
              } else {
                alert("댓글을 입력해야합니다");
              }
            }}
          >
            등록
          </button>
        </Form>
      </Comment.Group>
    );
  }
}

export default Comments;
