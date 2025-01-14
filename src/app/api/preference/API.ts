// import Toast from '@/components/common/Toast'
import axios from 'axios'


export const API = axios.create()
let callOnce = 0

interface MyErrorType {
  code?: string
  response?: {
    status: number
    data?: {}
    error?: boolean
    message?: string
  }
}

API.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/require-await
  async (req) => {
    // const { pathname } = new URL(req.url);
    // const index = pathname.replace("/api/", "");
    
    // const ENDPOINT = apiRoutes[index as keyof typeof apiRoutes] as string;
    
    req.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    req.headers.Pragma = 'no-cache';
    req.headers["Content-Type"] = "application/json";
    req.maxContentLength = Infinity; 
    req.maxBodyLength = Infinity;
  
    return req
  },
  async (err) => await Promise.reject(err)
)

// API response interceptor
API.interceptors.response.use(
  (res) => {
    return res
  },
  async (err: MyErrorType) => {
    if (typeof window !== 'undefined') {
      if (((err?.response?.status === 401) || (err?.response?.status === 403 ))) {
        callOnce = 1
        // Toast('error', 'Your session has expired! Please Re-login.')
      }
    }
    return await Promise.reject(err)
  }
)

export default API