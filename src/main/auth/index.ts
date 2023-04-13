import GoogleAuthenticationProvider from './google-provider'
import MicrosoftAuthenticationProvider from './microsoft-provider'
import http from 'http'
import open from 'open'

export const authenticateClient = (name: AuthService): Promise<any> => {
	const service = services[name]

	return new Promise(async (resolve, reject) => {
		const server = http.createServer(async (req, res) => {
			if (req.url?.indexOf('/login') !== -1) {
				service
					.getUserProfile(req)
					.then(resolve)
					.catch(reject)
					.finally(() => {
						res.end('Authentication successful. You may close this tab.')
						server.close()
					})
			}
		})

		server.listen(1234, () => {
			const url = service.getAuthenticationUrl()
			open(url, { wait: false }).then(cp => cp.unref())
		})
	})
}

export type AuthService = keyof typeof services

export const services = {
	google: new GoogleAuthenticationProvider(
		'https://accounts.google.com/o/oauth2/v2/auth',
		'927017703620-v7c5aqdr40t7ud60v5ohhsdt3949qr45.apps.googleusercontent.com',
		'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',
		'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
	),
	microsoft: new MicrosoftAuthenticationProvider(
		'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
		'd9f8e616-278e-4b5c-a6a2-26dfd6451609',
		'xFg8Q~epC3wHVOQqXnNWhsqZVlBgWW~DbT2h-bZG',
		'user.read openid offline_access'
	)
}
