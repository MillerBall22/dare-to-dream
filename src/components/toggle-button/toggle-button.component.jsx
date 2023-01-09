import { useState, useEffect, Fragment } from 'react';

import Button from '../button/button.component';
import DisabledButton from '../disabled-button/disabled-button.component';

const ToggleButton = ({buttonState, onClick}) => {
    const [buttonType, setButtonType] = useState();

    useEffect(() => {
        switch (buttonState) {
            case 'sold out':
                setButtonType(<DisabledButton title="Sold Out"/>)
                break;
            case 'unavailable':
                setButtonType(<DisabledButton title='Purchase Required'/>)
                break;
            default:
                setButtonType(<Button title='Add To Cart' onClick={onClick}/>)
                break;
        }
    },[buttonState])

    return (
        <Fragment>
            {
                buttonType
            }
        </Fragment>
    );
}

export default ToggleButton;