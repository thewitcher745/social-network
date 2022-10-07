export function getPostHeaderTime(createdAt) {
  const millisecondsPast = new Date() - new Date(createdAt);
  const secondsPast = Math.round(millisecondsPast / 1000);
  if (secondsPast > 60) {
    const minutesPast = Math.round(secondsPast / 60);
    if (minutesPast > 60) {
      const hoursPast = Math.round(minutesPast / 60);
      if (hoursPast > 24) {
        const daysPast = Math.round(hoursPast / 24);
        if (daysPast > 7) {
          const weeksPast = Math.round(daysPast / 7);
          if (weeksPast > 4) {
            const monthsPast = Math.round(weeksPast / 4);
            if (monthsPast > 12) {
              const yearsPast = Math.round(monthsPast / 4);
              return `${yearsPast}y ago`;
            }
            return `${monthsPast}mo ago`;
          }
          return `${weeksPast}w ago`;
        }
        return `${daysPast}d ago`;
      }
      return `${hoursPast}h ago`;
    }
    return `${minutesPast}m ago`;
  }
  return "< 1m ago";
}
