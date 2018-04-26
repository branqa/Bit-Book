import React from "react";
import { Dropdown } from "semantic-ui-react";

const NewPostButton = props => {
  return (
    <div>
      <h4 className="showFeed">Add new post</h4>
      <Dropdown compact selection labeled button className="icon" icon="add" onChange={props.openPost} text="Post" options={[{ key: "text", text: "Text", value: "text" }, { key: "image", text: "Image", value: "image" }, { key: "video", text: "Video", value: "video" }]} />
     </div>
  )
}

export default NewPostButton;
