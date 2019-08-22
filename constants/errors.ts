export default class RequestError extends Error {
	private statusCode: number;
	constructor(message: string, status: number) {
		super();
		this.message = message;
		this.statusCode = status;
	}
}