import React from "react";

interface Props {
  text: string;
  value: string;
  setForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const GreyButton = (props: Props) => {
  return (
    <button
      value={props.value}
      onClick={props.setForm}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {" "}
      {props.text}
    </button>
  );
};

export default GreyButton;
