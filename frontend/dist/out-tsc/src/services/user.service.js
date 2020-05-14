import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.logsUrls = serverUrl + '/logs';
        this.usersUrl = serverUrl + '/users';
        this.quizGameUrl = serverUrl + '/quiz-game';
        this.contrast = [
            [224, 224, 224],
            [192, 192, 192],
            [128, 128, 128],
            [64, 64, 64],
            [0, 0, 0]
        ];
        this.currentUser$ = new Subject();
        //////////// USER CREATION ///////////
        this.availableUsers$ = new Subject();
    }
    updateUser() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.currentUser = yield this.setLastUserFromLogs();
            this.currentUser$.next(this.currentUser);
        });
    }
    setLastUserFromLogs() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.http.get(this.logsUrls).toPromise();
            const currentUser = users[users.length - 1];
            return currentUser;
        });
    }
    addUserToLogs(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userLogJson = {
                userId: user.id
            };
            yield this.http.post(this.logsUrls, userLogJson, httpOptionsBase).toPromise();
            this.updateUser();
        });
    }
    changeFontSize(sizeChange) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modifiedUserJson = {
                firstName: this.currentUser.firstName,
                lastName: this.currentUser.lastName,
                fontSizePreference: this.currentUser.fontSizePreference + sizeChange,
                fontContrastPreference: this.currentUser.fontContrastPreference
            };
            yield this.http.put(this.usersUrl + '/' + this.currentUser.id, modifiedUserJson, httpOptionsBase).toPromise();
            this.updateUser();
            console.log('New font for user is', this.currentUser);
        });
    }
    changeFontContrast(contrastChange) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modifiedUserJson = {
                firstName: this.currentUser.firstName,
                lastName: this.currentUser.lastName,
                fontSizePreference: this.currentUser.fontSizePreference,
                fontContrastPreference: this.currentUser.fontContrastPreference + contrastChange
            };
            yield this.http.put(this.usersUrl + '/' + this.currentUser.id, modifiedUserJson, httpOptionsBase).toPromise();
            this.updateUser();
            console.log('New contrast for user is', this.currentUser);
        });
    }
    createNewUser(firstName, lastName) {
        const newUserJson = {
            firstName,
            lastName,
            fontSizePreference: 40,
            fontContrastPreference: 0
        };
        this.http.post(this.usersUrl, newUserJson, httpOptionsBase).subscribe(() => this.setUsersFromUrl());
    }
    setUsersFromUrl() {
        this.http.get(this.usersUrl).subscribe((users) => {
            this.availableUsers$.next(users);
        });
    }
    deleteUser(user) {
        const usersUrlWithId = this.usersUrl + '/' + user.id;
        const quizGameUrlWithId = this.quizGameUrl + '/' + user.id;
        const logUrlWithId = this.logsUrls + '/' + user.id;
        this.http.delete(quizGameUrlWithId, httpOptionsBase);
        this.http.delete(logUrlWithId, httpOptionsBase);
        this.http.delete(usersUrlWithId, httpOptionsBase).subscribe(() => this.setUsersFromUrl());
    }
    convertToHexa(number) {
        const numberInHex = '#' + number.toString(16) + number.toString(16) + number.toString(16);
        console.log(numberInHex);
        return numberInHex;
    }
};
UserService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map