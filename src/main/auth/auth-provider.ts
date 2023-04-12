import { IncomingMessage } from 'http'
import UserProfile from '../../types/user'

export abstract class AuthenticationProvider {
	protected readonly redirect = 'http://localhost:1234/login'
	protected readonly url: string
	protected readonly clientId: string
	protected readonly secret: string
	protected readonly scope: string

	constructor(url: string, clientId: string, secret: string, scope: string) {
		this.url = url
		this.clientId = clientId
		this.secret = secret
		this.scope = scope
	}

	public getAuthenticationUrl(): string {
		const queryParams = {
			redirect_uri: this.redirect,
			response_type: 'code',
			access_type: 'offline',
			client_id: this.clientId,
			scope: this.scope,
			prompt: 'select_account'
		}

		const url = new URL(this.url)
		url.search = new URLSearchParams(queryParams).toString()
		return url.toString()
	}

	public abstract getUserProfile(request: IncomingMessage): Promise<UserProfile>
}
