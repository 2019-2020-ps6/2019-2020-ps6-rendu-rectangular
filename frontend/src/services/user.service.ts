import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    private logsUrls = serverUrl + '/logs';
    private usersUrl = serverUrl + '/users';
    private quizGameUrl = serverUrl + '/quiz-game';

    contrast = [
        [224, 224, 224],
        [192, 192, 192],
        [128, 128, 128],
        [64, 64, 64],
        [0, 0, 0]
    ];

    currentUser: User;
    currentUser$: Subject<User> = new Subject<User>();

    //////////// USER CREATION ///////////

    availableUsers$: Subject<User[]> = new Subject<User[]>();

    async updateUser() {
        this.currentUser = await this.setLastUserFromLogs();
        this.currentUser$.next(this.currentUser);
        console.log("last user retrived form log : ", this.currentUser); 
    }

    async setLastUserFromLogs(): Promise<User> {
        const users = await this.http.get<User[]>(this.logsUrls).toPromise();
        const currentUser = users[users.length - 1];
        return currentUser;
    }

    async addUserToLogs(user: User) {
        const userLogJson = {
            userId: user.id
        };
        await this.http.post(this.logsUrls, userLogJson, httpOptionsBase).toPromise();
        this.updateUser();

    }

    async changeFontSize(sizeChange: number) {
        const modifiedUserJson = {
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            admin: this.currentUser.admin,
            fontSizePreference: this.currentUser.fontSizePreference + sizeChange,
            fontContrastPreference: this.currentUser.fontContrastPreference,
            isDaltonian: this.currentUser.isDaltonian
        };
        await this.http.put(this.usersUrl + '/' + this.currentUser.id, modifiedUserJson, httpOptionsBase).toPromise();
        this.updateUser();
        console.log('New font for user is', this.currentUser);
    }

    async changeFontContrast(contrastChange: number) {
        const modifiedUserJson = {
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            admin: this.currentUser.admin,
            fontSizePreference: this.currentUser.fontSizePreference,
            fontContrastPreference: this.currentUser.fontContrastPreference + contrastChange,
            isDaltonian: this.currentUser.isDaltonian
        };
        await this.http.put(this.usersUrl + '/' + this.currentUser.id, modifiedUserJson, httpOptionsBase).toPromise();
        this.updateUser();
        console.log('New contrast for user is', this.currentUser);
    }

    async changeDaltonianMode(daltonianMode: boolean) {
        const modifiedUserJson = {
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            admin: this.currentUser.admin,
            fontSizePreference: this.currentUser.fontSizePreference,
            fontContrastPreference: this.currentUser.fontContrastPreference,
            isDaltonian: daltonianMode
        };
        await this.http.put(this.usersUrl + '/' + this.currentUser.id, modifiedUserJson, httpOptionsBase).toPromise();
        this.updateUser();
        console.log('New daltonian choice for user is', this.currentUser);
    }

    createNewUser(firstName: string, lastName: string, admin: boolean) {
        const newUserJson = {
            firstName,
            lastName,
            admin,
            fontSizePreference: 40,
            fontContrastPreference: this.contrast.length - 1,
            isDaltonian: false
        };
        this.http.post(this.usersUrl, newUserJson, httpOptionsBase).subscribe(() => this.setUsersFromUrl());
    }

    setUsersFromUrl() {
        this.http.get<User[]>(this.usersUrl).subscribe((users: User[]) => {
            this.availableUsers$.next(users);
        });
    }

    deleteUser(user: User) {
        const usersUrlWithId = this.usersUrl + '/' + user.id;
        const quizGameUrlWithId = this.quizGameUrl + '/' + user.id;
        const logUrlWithId = this.logsUrls + '/' + user.id;
        this.http.delete(quizGameUrlWithId, httpOptionsBase);
        this.http.delete(logUrlWithId, httpOptionsBase);
        this.http.delete(usersUrlWithId, httpOptionsBase).subscribe(() => this.setUsersFromUrl());
    }

    convertToHexa(number: number): string {
        const numberInHex =  '#' + number.toString(16) + number.toString(16) + number.toString(16);
        return numberInHex;
    }
}
