import React from 'react';
import {Message} from 'semantic-ui-react';
const ErrorComponent = (props) => {
    return(
        <div warning className={props.errorMessage ? 'error':'invisible'}>
        <div className='errMsg'>
       
       <p> An error has occurred:</p>
        {props.errorMessage}</div>
        </div>
    )
}

export default ErrorComponent;