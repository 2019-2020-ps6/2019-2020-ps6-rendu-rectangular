import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private logsUrls = serverUrl + '/logs';
    private usersUrl = serverUrl + '/users';
    private quizGameUrl = serverUrl + '/quiz-game';

    currentUser: User;
    currentUser$: Subject<User> = new Subject<User>();

    constructor(private http: HttpClient) {

    }

    async updateUser() {
        this.currentUser = await this.setLastUserFromLogs();
        this.currentUser$.next(this.currentUser);
    }

    async setLastUserFromLogs(): Promise<User> {
        const users = await this.http.get<User[]>(this.logsUrls).toPromise();
        const currentUser = users[users.length-1]
        return currentUser;
    }

    async addUserToLogs(user: User) {
        const userLogJson = {
            userId: user.id
        }
        await this.http.post(this.logsUrls, userLogJson, httpOptionsBase).toPromise();
        this.updateUser();
    
    }

    async changeFontSize(sizeChange: number) {
        const modifiedUserJson = {
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            fontSizePreference: this.currentUser.fontSizePreference + sizeChange
        }
        await this.http.put(this.usersUrl + '/' + this.currentUser.id, modifiedUserJson, httpOptionsBase).toPromise()
        this.updateUser();
        console.log('New font for user is', this.currentUser);
    }

    //////////// USER CREATION ///////////

    availableUsers$: Subject<User[]> = new Subject<User[]>();

    createNewUser(firstName: string, lastName: string) {
        const newUserJson = {
            firstName,
            lastName,
            fontSizePreference: 40
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
        this.http.delete(quizGameUrlWithId, httpOptionsBase).subscribe(() => {});
        this.http.delete(logUrlWithId, httpOptionsBase).subscribe(() => {});
        this.http.delete(usersUrlWithId, httpOptionsBase).subscribe(() => this.setUsersFromUrl());
      }
}