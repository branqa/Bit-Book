import React from 'react'
import { Image, Header } from 'semantic-ui-react'

const UserCard = (props) => {

    let userId = JSON.parse(sessionStorage.getItem('userId'));
    return (
        <div id='userCard'>
            <Image src={props.user.avatarUrl} size='medium' circular centered />
            <Header size='large'>{props.user.name} </Header>
            <button onClick={props.handleClick} id="editButton" className={(userId === props.user.userId) ? 'visible' : 'invisible'}>Edit profile</button>
            <p id="about">
                {props.user.about}
            </p>

        </div>
    )
}
export default UserCard;