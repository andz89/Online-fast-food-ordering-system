import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
const NoPageFound = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <div className="flex flex-col justiy-center items-center gap-5 mt-12">
        <div className="flex flex-col justiy-center items-center gap-1">
          <FaExclamationTriangle className="text-yellow-500" size="5rem" />
          <div className="text-2xl font-semibold">No Page Found</div>
        </div>

        <div className="flexGrow">
          <button
            className="bg-primary text-white rounded p-2"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default NoPageFound;
