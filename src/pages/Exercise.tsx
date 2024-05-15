import { useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";

export const Exercise = () => {
  const param = useParams();
  return (
    <div>
      <BaseNote page={param.page} site="EXERCISE"></BaseNote>
    </div>
  );
};

export default Exercise;
