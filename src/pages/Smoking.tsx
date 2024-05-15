import { useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";

export const Smoking = () => {
  const param = useParams();

  return (
    <div>
      <BaseNote page={param.page} site="SMOKING"></BaseNote>
    </div>
  );
};

export default Smoking;
