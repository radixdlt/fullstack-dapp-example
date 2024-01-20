export const config = {
	gateway: {
		baseUrl: process.env.GATEWAY_BASE_URL!
	},
	websocket: {
		port: parseInt(process.env.NOTIFICATION_WEBSOCKET_PORT!)
	},
	logLevel: process.env.LOG_LEVEL!,
	jwt: {
		secret: process.env.JWT_SECRET!
	}
}
