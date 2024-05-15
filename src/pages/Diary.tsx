import { useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";

export const Diary = () => {
  const param = useParams();
  return (
    <div>
      <BaseNote page={param.page} site="DIARY"></BaseNote>
    </div>
  );
};

export default Diary;
