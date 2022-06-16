import { observable, action, makeObservable,autorun  } from 'mobx';

class AuthStore{
    values = {
        email: '',
        password: '',
    };
    isActiveComponent = 'loginComponent';
    token = window.localStorage.getItem('jwt');


    constructor(){
        makeObservable(this,{
            values: observable,
            token: observable,
            setEmail: action,
            setPassword: action,

            isActiveComponent : observable,
            handleActiveComponent : action
        });
        autorun(this.setTokenInLocalStorage);
    }
    setEmail = (email) =>{
        this.values.email = email;
    }
    setPassword = (password) => {
        this.values.password = password;
    }
    setToken = (token) => {
        this.token = token;
    }
    setTokenInLocalStorage = () =>{
        if (this.token) {
            window.localStorage.setItem('jwt', this.token);
        } else {
            window.localStorage.removeItem('jwt');
        }
    }

    /*****/
    handleActiveComponent = (currentComponent) => {
        this.isActiveComponent = currentComponent;
    }
}
export default new AuthStore();