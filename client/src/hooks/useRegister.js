import { useState } from "react";
import { useAuthContext } from './useAuthContext'

const BASE_URL = 'https://cloud-deploy-test-384518.uk.r.appspot.com:1337'

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async (username, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(BASE_URL + '/api/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
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

    return { register, isLoading, error }
}