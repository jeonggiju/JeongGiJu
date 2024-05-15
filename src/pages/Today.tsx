import { useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";

export const Today = () => {
  const param = useParams();

  return (
    <div>
      <BaseNote page={param.page} site="TODAY" />
    </div>
  );
};

export default Today;
