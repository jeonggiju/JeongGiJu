import { useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { DiariesProvider } from "../provider/DiariesProvider";

export const Diary = () => {
  const param = useParams();
  return (
    <div>
      <DiariesProvider>
        <BaseNote page={param.page} site="DIARY"></BaseNote>
      </DiariesProvider>
    </div>
  );
};

export default Diary;
