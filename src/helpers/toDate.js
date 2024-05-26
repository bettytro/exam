export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('nb-NO');
}

export function formatDateWithoutTime(dateString) {
    const date = new Date(dateString);
    
    return date.toLocaleDateString('nb-NO');
}