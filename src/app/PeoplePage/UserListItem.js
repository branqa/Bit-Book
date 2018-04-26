import React from 'react';
import { Link } from 'react-router-dom'
import { List, Image } from "semantic-ui-react";

const UserListItem = (props) => {

    const cutDate = () => {

        const dateUser = new Date(props.oneUser.upDate);
        const nowDate = new Date();

        let interval = Date.parse(nowDate)-Date.parse(dateUser)
        let intervalDays = interval / 1000 / 60 / 60 / 24
      
        let postHours = dateUser.getHours();
        let postMinutes = dateUser.getMinutes();
        let postYears = dateUser.getFullYear();
        let postMonth = dateUser.getMonth() + 1;
        let postDay = dateUser.getDay();
        const timePost = `${postHours}: ${postMinutes}`;
        const fullTimePost = `${postYears}-${postMonth}-${postDay} ${timePost}`
      
      if(intervalDays < 1) {
        return timePost;
      } else {
        return fullTimePost;
      }
       
    }


    return <Link to={`/profile/${props.oneUser.id}`}>
        <List divided verticalAlign="middle">
          <List.Item className="list-item">
            <Image src={props.oneUser.avatarUrl} alt={props.oneUser.name} avatar />
            <List.Content>
              <List.Header>{props.oneUser.name}</List.Header>
              <List.Description>
                {props.oneUser.shortAbout}
              </List.Description>
              <p>Last post at {cutDate()}</p>
            </List.Content>
          </List.Item>
        </List>
      </Link>
}

export default UserListItem;