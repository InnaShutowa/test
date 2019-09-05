import * as typesAuth from '../Constants/ActionAuthTypes';
// 1 - email в авторизации
// 2 - пароль в авторизации
// 3 - имя при регистрации
// 4 - фамилия при регистрации
// 5 - EMAIL при регистрации
// 6 - первый ввод пароля при регистрации
// 7 - повторниый ввод пароля при регистрации
function SetPoleAuthAction(data, type) {
    switch(type) {
        case 1:{
            return {
                type: typesAuth.SET_EMAIL_CONSTANT,
                data
            };
        }
        case 2:{
            return {
                type: typesAuth.SET_PASSWORD_CONSTANT,
                data
            }
        }
        
    }

    
}

export default SetPoleAuthAction;