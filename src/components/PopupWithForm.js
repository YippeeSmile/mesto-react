import React from 'react';

function PopupWithForm(props) { //name, title, formName, submitButtonValue, isOpen, children

    return ( <
        div className = "PopupWithForm" >
        <
        section onClick = { props.onClose }
        className = { `popup popup_${props.name} ${props.isOpen && 'popup_opened'}` } >
        <
        div className = "popup__container" >
        <
        button className = "popup__close" / >
        <
        h2 className = "popup__title" > { props.title } < /h2> <
        form className = "popup__form"
        name = { props.formName }
        noValidate > { props.children } <
        button type = "submit"
        className = "popup__save-button"
        value = { props.submitButtonValue } > { props.submitButtonValue } < /button> <
        /form> <
        /div> <
        /section> <
        /div>
    )
}

export default PopupWithForm;