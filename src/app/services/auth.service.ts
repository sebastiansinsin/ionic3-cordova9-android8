import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private storage: Storage
	) { }

	isLogged(): Promise<any> {
		return this.storage.get('bearer_token');
	}

	saveLocalStorageUserData(data) {
		if (data.id && data.ttl && data.created && data.userId) {
			const token = JSON.stringify({
				id: data.id,
				ttl: data.ttl,
				created: data.created,
				userId: data.userId
			});
			this.storage.set('token', token);
		}
		if (data.id) {
			console.log('data.id', data.id);
			this.storage.set('bearer_token', data.id);
		}
		if (data.user) {
			this.storage.set('user', JSON.stringify(data.user));
		}
		if (data.package) {
			this.storage.set('package', JSON.stringify(data.package));
		}
		if (data.company) {
			this.storage.set('company', JSON.stringify(data.company));
		}
		if (data.user_module_role) {
			this.storage.set('user_module_role', JSON.stringify(data.user_module_role));
		}
		if (data.language) {
			this.storage.set('language', JSON.stringify(data.language));
		}
		this.storage.set('first-login', JSON.stringify(true));
	}

}
