import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import BlueButton from "./BlueButton";
import { Car, Tags } from "../interfaces/interfaces";
import { DataFromAzure } from "../interfaces/interfaces";

const ApiKey = import.meta.env.VITE_API_KEY;
const AzureEndpoint = import.meta.env.VITE_API_ENDPOINT;
const backendUrl = import.meta.env.VITE_PATH_BACKEND_IMAGE;
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
    console.log(image);

    props.setLoading(true);
    if (image) {
      try {
        const response = await axios.post(
          AzureEndpoint +
            "computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags&language=en&gender-neutral-caption=False",
          image[0],
          {
            headers: {
              "Content-Type": "application/octet-stream",
              "Ocp-Apim-Subscription-Key": ApiKey,
            },
          }
        );

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
    console.log("Fetching data from backend");
    try {
      console.log(backendUrl);
      const responseBackend: AxiosResponse = await axios.post(
        backendUrl,
        dataFromApi,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Update the state with the response from backend Capitalize first letter of each tag
      const tags: Tags = responseBackend.data.tags;
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
      props.setCarsFromDB(responseBackend.data.result);
      props.setCarTags(responseBackend.data.tags);
      console.log(responseBackend.data);
      props.setLoading(false);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      props.setLoading(false);
    }
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
