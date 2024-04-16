export default function DateComponent({ dateString }: { dateString: string }) {
  const formattedDate = new Intl.DateTimeFormat("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
  return <time dateTime={dateString}>{formattedDate}</time>;
}
