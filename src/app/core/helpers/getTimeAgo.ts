export default function getTimeAgo(date: string | number): string {

  if (!date) return '';

  const timestamp = typeof date === 'string'
    ? new Date(date).getTime()
    : date;

  const diff = Date.now() - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);     
  const years = Math.floor(days / 365);     

  if (seconds < 60) return `${seconds} sec ago`;
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;

  return `${years} year${years > 1 ? 's' : ''} ago`;
}