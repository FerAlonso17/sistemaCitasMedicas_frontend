export function formatDate(isoString: string): string {
    const tempDate = new Date(isoString);
    const localDate = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(localDate)
}