import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const Error = ({ message }) => {
  return (
    <div
      class="flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <FontAwesomeIcon className="mr-3" icon={faXmark}></FontAwesomeIcon>
      <div>
        <span class="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Error;
