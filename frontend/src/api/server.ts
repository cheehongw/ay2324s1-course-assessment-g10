import axios from 'axios'

export const userServiceClient = axios.create({
    baseURL:'http://localhost:8081',
    withCredentials: true
})

export const questionServiceClient = axios.create({
    baseURL:'http://localhost:8080',
    withCredentials: true
})

export const executionServiceClient = axios.create({
  baseURL: "http://localhost:8090",
  withCredentials: true,
});