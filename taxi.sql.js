import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database
});

await db.migrate();

export async function joinQueue() {
    // console.log('join queue')
    await db.run("INSERT INTO passenger_queue DEFAULT VALUES");
}

export async function leaveQueue() {
    const passengerQueueCount = await queueLength();

    if (passengerQueueCount > 0) {
        await db.run("DELETE FROM passenger_queue WHERE rowid = (SELECT rowid FROM passenger_queue LIMIT 1)");
    }
}

export async function joinTaxiQueue() {
    await db.run("INSERT INTO taxi_queue DEFAULT VALUES");
}

export async function queueLength() {
    const result = await db.get("SELECT COUNT(*) AS count FROM passenger_queue");
    return result.count;
}

export async function taxiQueueLength() {
    const result = await db.get("SELECT COUNT(*) AS count FROM taxi_queue");
    return result.count;
}

export function taxiDepart() {
    if (this.queueCount >= 12) {
        this.taxiQueueCount -= 1;
        this.queueCount -= 12;
    }

}