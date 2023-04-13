import { IncomingMessage } from 'http'
import { AuthenticationProvider } from './auth-provider'
import UserProfile from '../../types/user'
import url from 'url'
import axios from 'axios'

export default class MicrosoftAuthenticationProvider extends AuthenticationProvider {
	public async getUserProfile(request: IncomingMessage): Promise<UserProfile> {
		const searchParams = new url.URL(request.url!, this.redirect).searchParams

		const form = new FormData()
		form.append('code', searchParams.get('code')!)
		form.append('client_id', this.clientId)
		form.append('client_secret', this.secret)
		form.append('redirect_uri', this.redirect)
		form.append('grant_type', 'authorization_code')
		form.append('scope', this.scope)

		const auth = await axios.post(
			'https://login.microsoftonline.com/common/oauth2/v2.0/token',
			form
		)

		const res = await axios.get('https://graph.microsoft.com/v1.0/me', {
			headers: { Authorization: 'Bearer ' + auth.data.access_token }
		})

		return {
			id: res.data.id,
			name: res.data.displayName,
			firstName: res.data.givenName,
			lastName: res.data.surname,
			email: res.data.userPrincipalName,
			profile: 'https://graph.microsoft.com/v1.0/me/photos/120x120/$value',
			locale: res.data.preferredLanguage
		}
	}
}
