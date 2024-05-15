import { useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";

export const Study = () => {
  const param = useParams();

  return (
    <div>
      <BaseNote page={param.page} site="STUDY"></BaseNote>
    </div>
  );
};
export default Study;
