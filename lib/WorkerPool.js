
const { WorkerPool } = require("@emcode/worker-pool");
// const { join } = require("path")
/** create a new worker */
this.NewChildWorker = (worker_path, no_of_workers = 4, timeout_per_job = 10, retries = 3) => {
    const pool = new WorkerPool(worker_path, no_of_workers, {
        // const pool = new WorkerPool(join(__dirname, "worker.js"), 4, {
        timeout: timeout_per_job * 1000,
        retries
    })
    return pool
}

