interface Props {
  text: string;
  maxLength: number;
}
export default function TruncatedText({ text, maxLength }: Props) {
  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }
  const truncatedText = truncateText(text, maxLength);

  return <div>{truncatedText}</div>;
}
