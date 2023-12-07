import React from "react";
import BlueButton from "./BlueButton";
import axios from "axios";
import { Car, Tags } from "../interfaces/interfaces";

interface Props {
  carImageUrl: string;
  setCarImageUrl: React.Dispatch<React.SetStateAction<string>>;

  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setCarTags: (value: Tags) => void;
  setCarsFromDB: (value: Car[]) => void;
  setLoading: (value: boolean) => void;
}

const FormUrlInput = (props: Props) => {
  const { carImageUrl, setCarImageUrl, showPreview } = props;
  const backendUrl = import.meta.env.VITE_PATH_BACKEND;

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.setLoading(true);
    props.setShowPreview(true);

    console.log(carImageUrl);

    try {
      const body = { imageUrl: carImageUrl };

      // Make the POST request using Axios
      const res = await axios.post(backendUrl, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Update the state with the response
      console.log(res.data);
      // Update the state with the response from backend Capitalize first letter of each tag
      const tags: Tags = res.data.tags;
      if (tags.colorTags !== undefined) {
        tags.colorTags =
          tags.colorTags.charAt(0).toUpperCase() + tags.colorTags.slice(1);
      }
      if (tags.carBrandTag !== undefined) {
        tags.carBrandTag =
          tags.carBrandTag.charAt(0).toUpperCase() + tags.carBrandTag.slice(1);
      }
      if (tags.carTypeTag !== undefined) {
        tags.carTypeTag =
          tags.carTypeTag.charAt(0).toUpperCase() + tags.carTypeTag.slice(1);
      }
      if (tags.carTypeTag === undefined) {
        tags.carTypeTag = "No car type found";
      }
      if (tags.carBrandTag === undefined) {
        tags.carBrandTag = "No car brand found";
      }
      if (tags.colorTags === undefined) {
        tags.colorTags = "No color found";
      }
      props.setCarTags(res.data.tags);
      props.setCarsFromDB(res.data.result);
      props.setLoading(false);
    } catch (error) {
      console.error("Error during POST request:", error);
      props.setLoading(false);
      // Handle errors as needed
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-3"
    >
      <div className="text-xl font-semibold">Car Image URL</div>

      <input
        className="bg-gray-300 w-96 h-10 px-5 pr-16 rounded-lg text-md focus:outline-none "
        type="text"
        value={carImageUrl}
        onChange={(e) => setCarImageUrl(e.target.value)}
        required
      />
      {carImageUrl && showPreview && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Selected Photo Preview</h2>
          <img
            className="rounded-lg shadow-md shadow-slate-600 w-full h-72 object-cover "
            src={carImageUrl}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
      <BlueButton text="Submit URL" />
    </form>
  );
};

export default FormUrlInput;
