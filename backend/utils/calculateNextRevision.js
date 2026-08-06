const MS_IN_A_DAY = 24 * 60 * 60 * 1000;

const REVISION_INTERVALS = {
    Hard:   [7, 10, 14],
    Medium: [7, 12, 20],
    Easy:   [7, 16, 24]
};

function getNextRevisionDate(difficulty, revisionCount, fromDate = new Date()) {
    const intervals = REVISION_INTERVALS[difficulty];

    if (!intervals) {
        throw new Error(`Invalid difficulty: ${difficulty}`);
    }

    const index = Math.min(revisionCount, intervals.length - 1);
    const daysToAdd = intervals[index];

    const nextDate = new Date(fromDate.getTime() + daysToAdd * MS_IN_A_DAY);
    return nextDate;
}

module.exports = getNextRevisionDate;