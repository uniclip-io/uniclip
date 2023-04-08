import { OAuth2Client } from 'google-auth-library'
import destroyer from 'server-destroy'
import http from 'http'
import url from 'url'
import open from 'open'

export const authenticate = async () => {
	const client = await getAuthenticatedClient()
	const url = 'https://www.googleapis.com/auth/userinfo.profile'
	await client.request({ url })
	const tokenInfo = await client.getTokenInfo(client.credentials.access_token ?? '')
	console.log(tokenInfo)
}

const getAuthenticatedClient = (): Promise<OAuth2Client> => {
	return new Promise(resolve => {
		const oAuth2Client = new OAuth2Client(
			'927017703620-v7c5aqdr40t7ud60v5ohhsdt3949qr45.apps.googleusercontent.com',
			'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',
			'http://127.0.0.1:1234/callback'
		)

		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile'
		})

		const server = http.createServer(async (req, res) => {
			if (req.url?.indexOf('/oauth2callback')) {
				const query = new url.URL(req.url, 'http://127.0.0.1:1234').searchParams
				const code = query.get('code') ?? ''
				res.end('Authentication successful. You may close this tab.')
				server.destroy()

				const token = await oAuth2Client.getToken(code)
				oAuth2Client.setCredentials(token.tokens)
				resolve(oAuth2Client)
			}
		})

		server.listen(1234, () => {
			open(authorizeUrl, { wait: false }).then(cp => cp.unref())
		})

		destroyer(server)
	})
}
