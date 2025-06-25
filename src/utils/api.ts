import axios, { AxiosError } from "axios";
import { ApiError } from "src/models/Api";
import { handleGetAccessToken } from "./auth";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = 'http://localhost:8000/api/v1'

export async function useApi<TypeDataResponse>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: object,
    withAuth: boolean = true
): Promise<{
    data?: TypeDataResponse,
    detail: string
}> {
    // Authentication
    const access_token = handleGetAccessToken();

    let headers = {};

    if (withAuth && access_token) {
        headers['Authorization'] = `Bearer ${access_token}`
    }

    try {
        const request = await axios(`${baseURL}/${endpoint}`, {
            method,
            data: method != 'GET' && data,
            params: method == 'GET' && data
        })

        return {
            data: request.data,
            detail: ''
        }
    } catch (e) {
        const error = e as AxiosError<ApiError>;

        return {
            data: null,
            detail: error.response.data.detail || error.message
        }
    }
}