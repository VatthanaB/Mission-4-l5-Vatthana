import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import BlueButton from "./BlueButton";
import { Car, Tags } from "../interfaces/interfaces";
import { DataFromAzure } from "../interfaces/interfaces";

const ApiKey = import.meta.env.VITE_API_KEY;
const AzureEndpoint = import.meta.env.VITE_API_ENDPOINT;
const backendUrl = import.meta.env.VITE_BACKEND_IMAGE_ENDPOINT;
interface Props {
  setCarsFromDB: (value: Car[]) => void;
  setCarTags: (value: Tags) => void;
  setLoading: (value: boolean) => void;
}

const ImageInput = (props: Props) => {
  // State to manage the image .
  const [image, setImage] = useState<FileList>();
  // State to manage the data from Azure
  const [dataFromApi, setDataFromApi] = useState<DataFromAzure[]>([]);

  useEffect(() => {
    console.log(`AzureEndpoint: ${AzureEndpoint}`);
  }, [image, setImage]);
  // Fetch key tags from AI API.
  async function getImageData(e: { preventDefault: () => void }) {
    e.preventDefault();

    props.setLoading(true);
    if (image) {
      try {
        const response = await axios.post(AzureEndpoint, image[0], {
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": ApiKey,
          },
        });

        console.log(response.data.tagsResult.values);
        const data = response.data.tagsResult.values;
        setDataFromApi(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  // Fetch data from backend and update state with data
  const fetchFromBackend = async () => {
    const responseBackend: AxiosResponse = await axios.post(
      backendUrl,
      dataFromApi,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    props.setCarsFromDB(responseBackend.data.result);
    props.setCarTags(responseBackend.data.tags);
    console.log(responseBackend.data);
    props.setLoading(false);
  };
  // Fetch data from backend when dataFromApi state changes and is not empty
  useEffect(() => {
    if (dataFromApi.length > 0) {
      fetchFromBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDataFromApi, dataFromApi]);
  return (
    <form
      className="flex flex-col items-center space-y-8"
      onSubmit={getImageData}
    >
      <h1 className="text-xl font-semibold">Upload image</h1>

      <input
        type="file"
        name="image"
        onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files);
          }
        }}
      />

      <BlueButton text="Submit uploaded image" />

      {image && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Selected Photo Preview</h2>
          <img
            className="rounded-lg shadow-md shadow-slate-600 w-full h-72 object-cover "
            src={URL.createObjectURL(image[0])}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </form>
  );
};

export default ImageInput;
