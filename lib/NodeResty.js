//!++++++++++++++++++++++++++++++++++++++++++++
// | @Author: Emcode
// | @Desc: It uses exponential backoff to make 
// | http requests with the nodejs request lib
//++++++++++++++++++++++++++++++++++++++++++++
const request = require("request")
// default configuration
const Configs = {
    method: "POST", // POST - default
    timeout: 30, // seconds
    retries: 3,
    exponential_delay: 2 // 2 seconds delay in an exponential orders
}

/** make post request */
this.Post = async (url, data, r_headers = {}, request_options = {}) => {

    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json', ...r_headers
            },
            body: {
                ...data
            },
            json: true,
            ...request_options

        };

        request(options, function (error, response, body) {
            console.log('\x1b[41m%s\x1b[0m', 'response', error, "body", body, "code: ", response?.statusCode)
            if (response) {
                if (response.statusCode >= 500) {
                    // return reject(`Request failed with ${response.statusCode}`)
                    return reject(body)
                }
                if (response.statusCode == 404) {
                    //return reject(`Request failed with ${response.statusCode}`)
                    return reject(body)
                }
                if (response.statusCode == 422) {
                    //return reject(`Request failed with ${response.statusCode}`)
                    return reject(body)
                }

            }

            if (error) {
                // return reject(`${error}`)
                return reject(body)
            }
            resolve(body);
        })

    })
}
/** make get request */
this.Get = async (url, data = {}, r_headers = {}, request_options = {}) => {
    // console.log('\x1b[41m%s\x1b[0m', 'r_headers', r_headers)
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url,
            headers: {
                'Content-Type': 'application/json', ...r_headers
            },
            body: {
                ...data
            },
            json: true,
            ...request_options

        };

        request(options, function (error, response, body) {
            console.log('\x1b[41m%s\x1b[0m', 'response', error, "body", body, "code: ", response?.statusCode)
            if (response) {
                if (response.statusCode >= 500) {
                    // return reject(`Request failed with ${response.statusCode}`)
                    return reject(body)
                }
                if (response.statusCode == 404) {
                    //return reject(`Request failed with ${response.statusCode}`)
                    return reject(body)
                }
                if (response.statusCode == 422) {
                    //   return reject(`Request failed with ${response.statusCode}`)
                    return reject(body)
                }

            }

            if (error) {
                //  return reject(`${error}`)
                return reject(body)
            }
            resolve(body);
        })

    })
}
/** make api requests */
this.MakeRequest = async (url, data, headers = {}, configs = {}) => {
    const total_retries = []
    const request_messages = []
    if (configs?.timeout) {
        configs.timeout = +configs.timeout * 1000
    }
    const new_config = { ...Configs, ...configs }
    const retries = new_config.retries
    const method = new_config.method
    const exp_delays = new_config.exponential_delay
    let failed_count = 0
    let result
    for (let i = 0; i < retries + 1; i++) {
        total_retries.push(i)
        try {
            if (method == "POST") {
                result = await this.Post(url, data, headers, configs)
            } else if (method == "GET") {
                result = await this.Get(url, data, headers, configs)
            } else {
                result = await this.Post(url, data, headers, configs)
            }

            request_messages.push(`Request completed - attempts ${i + 1} in ${total_retries.length} retries`)
            console.log('\x1b[41m%s\x1b[0m', 'request_messages', request_messages)
            return result
        } catch (ex) {
            failed_count++
            console.log('\x1b[41m%s\x1b[0m', 'Request failed: ....', request_messages)
            request_messages.push(`Request failed (${failed_count}) - attempts ${i + 1} in ${total_retries.length} retries`)
            const delays = Math.pow(exp_delays, failed_count)
            if (failed_count > retries) {
                return ex
                //break
            }
            await new Promise(r => setTimeout(r, delays * 1000))
        }
    }

}

this.NodeRestyConfig = async (method = "POST", timeout_seconds = 30, retries = 5, back_off_delay = 2) => {
    const configs = {
        method, // GET or POST
        timeout: timeout_seconds,
        retries,
        exponential_delay: back_off_delay
    }
    return configs
}