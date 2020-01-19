export class APICalls {

	public static getInstance(): APICalls {
		if (this.instance === undefined || this.instance === null) {
			this.instance = new APICalls();
		}
		return this.instance;
	}
	private static instance: APICalls;
	private baseRequestURL: string;

	private constructor() {
		// This is a proxy server to bypass cors problems.
		this.baseRequestURL = 'https://cors-anywhere.herokuapp.com/';
	}

	public async getAllMapsFromPoeNinja() {
		return new Promise<any>(async (resolve, reject) => {
			const res = await this.getData(`https://poe.ninja/api/data/itemoverview?league=Metamorph&type=Map&language=en`, 'GET', '');
			resolve(res);
		});
	}

	public encodeRFC5987ValueChars(str: string) {
		return (
			encodeURIComponent(str)
				// Beachte, dass obwohl RFC3986 "!" reserviert, es nicht kodiert
				// werden muss, weil RFC5987 es nicht reserviert.
				.replace(/['()]/g, escape) // i.e., %27 %28 %29
				.replace(/\*/g, '%2A')
				// Die folgenden Zeichen müssen nicht nach RFC5987 kodiert werden,
				// daher können wir bessere Lesbarkeit übers Netzwerk sicherstellen:
				// |`^
				.replace(/%(?:7C|60|5E)/g, unescape)
		);
	}

	// Calls the specified URL
	private async getData(relativeUrl: string, requestMethod: string, data: {}) {
		const dataAsJson = JSON.stringify(data);
		return new Promise<any>(async (resolve, reject) => {
			let headers = {
				'Content-Type': 'application/json',
				'accept': 'application/json'
			};
			let requestURL = this.baseRequestURL + relativeUrl;
			let fetchBody = {
				method: '',
				headers: {},
				body: '',
			};

			if (requestMethod === 'GET') {
				delete fetchBody.body;
			}

			fetchBody.headers = headers;

			switch (requestMethod) {
				case 'GET':
					fetchBody.method = requestMethod;
					break;
				case 'POST':
					fetchBody.method = requestMethod;
					fetchBody.body = dataAsJson;
					break;
				case 'PUT':
					fetchBody.method = requestMethod;
					fetchBody.body = dataAsJson;
					break;
				default:
					resolve('Invalid requestmethod');
			}

			if (requestMethod === 'POST') {
				fetch(requestURL, {
					headers,
					method: 'POST',
					body: JSON.stringify(data),
				}).then((responseJson: { json: () => void }) => {
					let result = responseJson.json();
					resolve(result);
				});
			} else if (requestMethod === 'PUT') {
				fetch(requestURL, {
					headers,
					method: 'PUT',
					body: JSON.stringify(data),
				}).then((responseJson: { json: () => void }) => {
					let result = responseJson;
					resolve(result);
				});
			} else {
				fetch(requestURL, fetchBody).then(
					(responseJson: { json: () => void }) => {
						let result = responseJson.json();
						resolve(result);
					},
				);
			}
		});
	}
}
