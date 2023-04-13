import { IncomingMessage } from 'http'
import { AuthenticationProvider } from './auth-provider'
import UserProfile from '../../types/user'
import url from 'url'
import axios from 'axios'

export default class GoogleAuthenticationProvider extends AuthenticationProvider {
	public async getUserProfile(request: IncomingMessage): Promise<UserProfile> {
		const searchParams = new url.URL(request.url!, this.redirect).searchParams

		const queryParams = {
			code: searchParams.get('code')!,
			client_id: this.clientId,
			client_secret: this.secret,
			redirect_uri: this.redirect,
			grant_type: 'authorization_code'
		}

		const authUrl = new URL('https://oauth2.googleapis.com/token')
		authUrl.search = new URLSearchParams(queryParams).toString()
		const auth = await axios.post(authUrl.toString())

		const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: { Authorization: 'Bearer ' + auth.data.access_token }
		})

		return {
			id: res.data.id,
			name: res.data.name,
			firstName: res.data.given_name,
			lastName: res.data.family_name,
			email: res.data.email,
			profile: res.data.picture,
			locale: res.data.locale
		}
	}
}
