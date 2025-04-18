const node_resty = require("./NodeResty")
this.MakePOST = async (url, data, more_opts = {}) => {

    if ("headers" in more_opts) {
        more_opts = { ...more_opts.headers }
    }
    const get_config = await node_resty.NodeRestyConfig("POST", 30, 4, 2)
    const mres = await node_resty.MakeRequest(url, data, more_opts, get_config)
    return mres
}