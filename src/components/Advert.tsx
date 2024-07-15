interface Props {
  title: string;
  content: string;
}

export default function Advert({ title, content }: Props) {
  return (
    <div className=" w-full py-20 flex flex-col items-center">
      <div className=" flex flex-col items-center text-center justify-center space-y-1 bg-gray-200 w-[80vw] sm:w-[40vw] py-5">
        <h5>{title}</h5>
        <h3 className=" text-xl font-bold"> {content} </h3>
        <h5> 750 * 100 </h5>
      </div>
    </div>
  );
}
