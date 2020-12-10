
export class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}){
        this._nameSelector = document.querySelector(nameSelector);
        this._jobSelector = document.querySelector(jobSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }
    getUserInfo(){
        return { name: this._nameSelector.textContent, job: this._jobSelector.textContent};
    }
    setUserInfo(name, link){
        this._nameSelector.textContent = name;
        this._jobSelector.textContent = link;
        this._avatarSelector.alt = name;
    }
}