export function classifyByVisibleMean(entries) {
  if (entries.length === 0) return [];

  // Values represent money, so normalize group totals to cents before comparing to the mean.
  const cents = entries.map((entry) => Math.round(entry.value * 100));
  const averageCents = cents.reduce((total, value) => total + value, 0) / cents.length;
  return entries.map((entry, index) => ({
    ...entry,
    atOrAboveMean: cents[index] >= averageCents,
  }));
}
