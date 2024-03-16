export function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
}

export function formatDateTime(dateString: string | number | Date) {
  const date = new Date(dateString);
  return (
    date
      .toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
      .replace(/ /g, '') +
    ' ' +
    date.toLocaleDateString('en-GB')
  );
}

export function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
