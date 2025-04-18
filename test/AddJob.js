(

    async () => {
        const qtask = require("../qtask-manager-v2/jobs/Generic")

        const q_data = {
            "params": { add_1: 23, add_2: 100 },
            // "queue_handler": "processor/handlefunc/CpuJob",
            "queue_handler": "processor/handlefunc/LongTask",
            "queue_type": "processor",
            "fxn_name": "DoJob",
            "job_id": `${Date.now()}_default_`,
        }
        // const q_data_repeat = {
        //     "params": { add_1: 23, add_2: 100 },
        //     "queue_handler": "repeater/handlefunc/Repeater",
        //     "queue_type": "repeater",
        //     "fxn_name": "DoCronJob",
        //     "job_id": `${Date.now()}_default_`,
        // }
        const q_data_repeat_cpu = {
            "params": { add_1: 23, add_2: 100 },
            "queue_handler": "processor/handlefunc/CpuJob",
            "queue_type": "repeater",
            "fxn_name": "DoJob",
            "job_id": `${Date.now()}_default_`,
        }

        // job config

        //! config

        const config = {
            // cron: xxxx,
            // repeat_id: xxxx
        }
        //! end config
        // bullmq options
        //! bullmq options
        // const bull_options = {} // default
        const bull_options = { attempts: 5 } // default
        //const bull_options =  {
        //     attempts: 5, // Retry up to 3 times if the job fails
        //     backoff: {
        //         type: 'exponential',
        //         delay: 5000  // Initial delay of 2 seconds
        //     },
        //     // removeOnComplete: true // Remove the job from Redis once it's completed
        //     removeOnComplete: false, // 1500, // keep 1500 recent jobs
        // }
        //! end bullmq options

        const config_repeater = {
            repeat_id: "002",
            cron: "*/10 * * * * *"
        }
        // const test = await qtask.AddJob("BUY_CRYPTO", "Buy", config, q_data)

        // const allres = await Promise.allSettled([
        // qtask.AddJob("SELL_CRYPTO", "Sell", config, q_data),
        //     qtask.AddJob("SELL_CRYPTO", "Sell", config, q_data),
        //     qtask.AddJob("SELL_CRYPTO", "Sell", config, q_data),
        //     qtask.AddJob("SELL_CRYPTO", "Sell", config, q_data)
        // ])
        // q_data.params.user_id = Date.now()
        // "INIT_AXIS_ORDER", "RECEIVE_AXIS_ORDER", "CREDIT_AXIS_ORDER", "CLOSE_AXIS_ORDER", "PROCESS_AXIS_ORDER", "REPEAT_AXIS_ORDER"
        //! INIT_AXIS_ORDER
        // await qtask.AddJob("Add Numbers Together", "INIT_AXIS_ORDER", config, q_data, bull_options)
        // //! RECEIVE_AXIS_ORDER
        // await qtask.AddJob("Add Numbers Together", "RECEIVE_AXIS_ORDER", config, q_data, bull_options)
        // //! CREDIT_AXIS_ORDER
        // await qtask.AddJob("Add Numbers Together - CREDIT_AXIS_ORDER", "CREDIT_AXIS_ORDER", config, q_data, bull_options)
        // //! CLOSE_AXIS_ORDER
        // await qtask.AddJob("Add Numbers Together - CLOSE_AXIS_ORDER", "CLOSE_AXIS_ORDER", config, q_data, bull_options)
        // //! PROCESS_AXIS_ORDER
        Array.from({ length: 12 }, (val, index) => {
            qtask.AddJob("Add Numbers Together - PROCESS_AXIS_ORDER", "PROCESS_AXIS_ORDER", config, q_data, bull_options)
        })
        // const test = await qtask.AddJob("Add Numbers Together - PROCESS_AXIS_ORDER", "PROCESS_AXIS_ORDER", config, q_data, bull_options)
        //! for repeater
        // const test = await qtask.AddJob("REPEAT ADDING NUMBER", "REPEAT_AXIS_ORDER", config_repeater, q_data_repeat_cpu)

        console.log('\x1b[41m%s\x1b[0m', '## RESULT ==>: ', "test")

    }

)()