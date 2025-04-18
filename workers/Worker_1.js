const { parentPort } = require("worker_threads");

parentPort.on("message", async (msg) => {
    console.log('\x1b[41m%s\x1b[0m', 'data to work on', msg.data)
    try {
        // send result back
        parentPort.postMessage({
            id: msg.id,
            result: "cpu jobs processed by a worker 1 ....",
        });
    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', 'error', err)
        // parentPort.postMessage({
        //     id: msg.id,
        //     error: err.message || "Unknown error"
        // });

    }
});


// Recommended: Catch uncaught exceptions
process.on("uncaughtException", (ex) => {
    console.log('\x1b[41m%s\x1b[0m', 'Uncaught Exception:', ex);
});