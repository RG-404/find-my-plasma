import { useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/listing/1");
  }, []);
  return <div></div>;
};

export default index;
