import React from 'react';
import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(false);

    const closeAllPopups = (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            setEditProfilePopupOpen(false);
            setAddPlacePopupOpen(false);
            setEditAvatarPopupOpen(false);
            setSelectedCard(false);
        }
    }

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }

    const handleCardClick = (obj) => {
        setSelectedCard(obj)
    }

    //запрос на данные user's и cards
    React.useEffect(() => {
        Promise.all([api.getProfile(), api.getCards()])
            .then(([res, cards]) => {
                console.log(cards);
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
                setCards(cards)
            })
    }, []);

    return ( <
        div className = "App" >
        <
        div className = "page" >
        <
        Header / >
        <
        Main onEditAvatar = { handleEditAvatarClick }
        onEditProfile = { handleEditProfileClick }
        onAddPlace = { handleAddPlaceClick }
        name = { userName }
        avatar = { userAvatar }
        about = { userDescription }
        cards = { cards }
        handleCardClick = { handleCardClick }
        /> <
        Footer / >
        <
        PopupWithForm name = "profile-edit"
        title = "Редактировать профиль"
        submitButtonValue = "Сохранить"
        isOpen = { isEditProfilePopupOpen }
        onClose = { closeAllPopups }
        formName = "profile-form" >
        <
        input id = "username"
        required name = "username"
        value = "Жак-Ив Кусто"
        placeholder = "Имя"
        minLength = "2"
        maxLength = "40"
        className = "popup__input popup__input_name" / >
        <
        span id = "username-error"
        className = "error-message error-message_visible" / >
        <
        input id = "usertext"
        required name = "userjob"
        value = "Исследователь океана"
        placeholder = "О себе"
        minLength = "2"
        maxLength = "200"
        className = "popup__input popup__input_about" / >
        <
        span id = "usertext-error"
        className = "error-message error-message_visible" / >
        <
        /PopupWithForm> <
        PopupWithForm name = "card-edit"
        title = "Новое место"
        submitButtonValue = "Создать"
        onClose = { closeAllPopups }
        isOpen = { isAddPlacePopupOpen }
        formName = "edit-card" >
        <
        input id = "cardname"
        type = "text"
        name = "name"
        placeholder = "Название"
        minLength = "2"
        maxLength = "40"
        className = "popup__input popup__input_card-name"
        required / >
        <
        span id = "cardname-error"
        className = "error-message error-message_visible" / >
        <
        input id = "cardlink"
        type = "url"
        name = "link"
        placeholder = "Ссылка на картинку"
        className = "popup__input popup__input_card-link"
        required / >
        <
        span id = "cardlink-error"
        className = "error-message error-message_visible" / >
        <
        /PopupWithForm> <
        PopupWithForm name = "card-delete"
        title = "Вы уверены?"
        formName = "card-form"
        submitButtonValue = "Да" /
        >
        <
        ImagePopup card = { selectedCard }
        onClose = { closeAllPopups }
        /> <
        PopupWithForm name = "popup popup_avatar-edit"
        title = "Обновить аватар"
        formName = "avatar-form"
        submitButtonValue = "Сохранить"
        onClose = { closeAllPopups }
        isOpen = { isEditAvatarPopupOpen } >
        <
        input id = "avatarlink"
        type = "url"
        name = "avatarlink"
        placeholder = "Ссылка на картинку"
        className = "popup__input popup__input_avatar-link"
        required / >
        <
        span id = "avatarlink-error"
        className = "error-message error-message_visible" / >
        <
        /PopupWithForm> <
        /div>

        <
        /div>
    );
}

export default App;