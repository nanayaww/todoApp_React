import { PropagateLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <PropagateLoader />
    </div>
  );
}
