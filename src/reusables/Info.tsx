import { RiInformationLine } from "@remixicon/react";

interface Props {
  text: string;
}

export default function Info({ text }: Props) {
  return (
    <span className=" flex flex-row text-xs md:text-base items-center justify-center gap-2 bg-gray-200 md:p-2 p-1 rounded-full">
      <RiInformationLine />
      <p>{text}</p>
    </span>
  );
}
