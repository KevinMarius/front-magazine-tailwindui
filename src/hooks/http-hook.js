import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(async (url, method = 'get', data = null, headers = {}) => {
		setIsLoading(true);
		const httpAbortCtrl = new AbortController();
		activeHttpRequests.current.push(httpAbortCtrl);

		try {
			const response = await axios({
				url,
				method,
				data,
				headers,
				signal: httpAbortCtrl.signal
			});

			const responseData = await response.data;

			activeHttpRequests.current = activeHttpRequests.current.filter(
				reqCtrl => reqCtrl !== httpAbortCtrl
			);

			if (!response.statusText === "OK") {
				throw new Error(responseData.message);
			}


			setIsLoading(false);
			return responseData;
		} catch (err) {
			setError(err.response.data.message);
			setIsLoading(false);
			throw err;
		}
	},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
