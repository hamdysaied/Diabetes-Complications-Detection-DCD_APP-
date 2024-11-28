import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Success = ({ message }) => {
  return (
    <div
      class="flex items-center p-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      role="alert"
    >
      <FontAwesomeIcon className="mr-3" icon={faCheck}></FontAwesomeIcon>
      <div>
        <span class="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Success;
