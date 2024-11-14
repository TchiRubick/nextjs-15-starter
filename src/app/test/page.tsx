import { Greeting } from "@/components/greeting";
import { getImageStorage } from "@/lib/get-image-storage";
import Image from "next/image";

export default async function Test() {
  return (
    <>
      <Greeting />
      <Image src={getImageStorage('pexels-huuhuynh-19358148.jpg')} width={200} height={200} alt="test" />
    </>
  );
}
