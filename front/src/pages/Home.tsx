import Cover from "../components/Cover";
import { useDaysStateContext } from "../hook/useDaysStateContext";

export const Home = () => {
  const data = useDaysStateContext();

  console.log(data);

  return (
    <div>
      <Cover />
    </div>
  );
};

export default Home;
