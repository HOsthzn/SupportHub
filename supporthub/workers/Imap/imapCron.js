const cron = require('node-cron');
const Imap = require("./imap")

function convertToCronExpression(refreshInterval) {
    const seconds = Math.round(refreshInterval / 1000);
    const minutes = Math.round(refreshInterval / 1000 / 60);

    if (seconds < 60) {
        return `*/${seconds} * * * * *`;
    } else if (minutes < 60) {
        return `0 */${minutes} * * * *`;
    } else {
        const hours = Math.round(refreshInterval / 1000 / 60 / 60);
        return `0 0 */${hours} * * *`;
    }
}

const imapCronManager = {
    tasks: {},
    startTask(IMAPHost) {
        let refreshInterval = convertToCronExpression(IMAPHost.refreshInterval);
        console.log("refreshInterval", refreshInterval)
        this.tasks[IMAPHost._id] = cron.schedule(refreshInterval, async () => {
            const imap = new Imap(IMAPHost);
            try {
                await imap.connect();
                await imap.getMessages();
            } catch (err) {
                console.log(err);
            } finally {
                await imap.disconnect();
            }
        });
    },
    stopTask(imapHostId) {
        if (this.tasks[imapHostId]) {
            this.tasks[imapHostId].stop();
            delete this.tasks[imapHostId];
        }
    },
    restartTask(IMAPHost) {
        this.stopTask(IMAPHost._id);
        this.startTask(IMAPHost);
    }
}

module.exports = imapCronManager;