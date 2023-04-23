import { useState } from "react";
import { useAuthContext } from './useAuthContext'

const BASE_URL = 'https://cloud-deploy-test-384518.uk.r.appspot.com'

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(BASE_URL + '/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // Saves User to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update AuthContext
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }

    return { login, isLoading, error }
}