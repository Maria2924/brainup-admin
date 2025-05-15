/**
 * Converts course duration in minutes to "H:MM hours" format
 * @param minutes - Total duration in minutes
 * @returns A string like "3:45 hours"
 */
export function formatCourseDuration(minutes: number): string {
    if (typeof minutes !== 'number' || minutes < 0 || isNaN(minutes)) {
        return '0:00 hours';
    }

    const hrs: number = Math.floor(minutes / 60);
    const mins: number = minutes % 60;

    return `${hrs}:${mins.toString().padStart(2, '0')} hours`;
}
