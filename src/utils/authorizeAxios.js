import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'

// Khởi tạo một đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án.
let authorizedAxiosInstance = axios.create()
// Thời gian chờ tối đa của 1 reqquest: để 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ lưu JWT tokens (refresh & access) vào trong httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(
    (config) => {
        // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
        interceptorLoadingElements(true)

        return config
    }, (error) => {
        return Promise.reject(error)
    }
);

authorizedAxiosInstance.interceptors.response.use(
    (response) => {
        // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
        interceptorLoadingElements(false)

        return response
    }, (error) => {
        // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
        interceptorLoadingElements(false)

        let errorMessage = error?.message
        if (error.response?.data?.message) {
            errorMessage = error.response?.data?.message
        }
        if (error.response?.status !== 410) {
            toast.error(errorMessage)
        }
        return Promise.reject(error)
    }
);


export default authorizedAxiosInstance