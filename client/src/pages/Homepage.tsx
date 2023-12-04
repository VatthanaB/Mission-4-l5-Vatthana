import { useState, useEffect } from "react";
import Card from "../components/Card";
import FormUrlInput from "../components/FormUrlInput";
import ImageInput from "../components/ImageInput";
import GreyButton from "../components/GreyButton";
import { Car, Tags } from "../interfaces/interfaces";

function Homepage() {
  // State to manage the preview
  const [showPreview, setShowPreview] = useState(false);
  // State to manage the image URL
  const [carImageUrl, setCarImageUrl] = useState("");
  // State to manage the tags
  const [carTags, setCarTags] = useState<Tags>({
    colorTags: "",
    carTypeTag: "",
    carBrandTag: "",
  });
  // State to manage the cars from the DB
  const [carsFromDB, setCarsFromDB] = useState<Car[]>([]);
  // State to manage the cards
  const [carCards, setCarCards] = useState<JSX.Element[] | null>(null);
  // State to manage the loading
  const [loading, setLoading] = useState(false);
  // State to manage the form to show (URL or Upload)
  const [formToShow, setFormToShow] = useState<"url" | "upload">("url");

  // Update the cards when the carsFromDB state changes
  useEffect(() => {
    // Create an array of JSX elements
    const cards = carsFromDB.map((car: Car) => {
      return <Card car={car} />;
    });
    // Update the state with the array of JSX elements
    setCarCards(cards);
  }, [carTags, carsFromDB]);

  // Function to update the image URL with a random image
  const randomUrl = () => {
    const urls: string[] = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGKY0_reCR-crKOqt1T6jwGu202Qa8bnY6w&usqp=CAU",
      "https://hips.hearstapps.com/hmg-prod/images/toyota-corolla-hatchback-2019-1280-0e-1540924924.jpg",
      "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg",
      "https://di-uploads-pod15.dealerinspire.com/lakeforestsportscars/uploads/2019/10/Ferrari-LaFerrari-Aperta.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwWiccjdAd-05y1caXfO4PIb9N7EaahMZFyw&usqp=CAU",
      "https://all-good.co.nz/cdn/shop/files/AG-new-lgo_1200x1200.png?v=1651285323",
    ];
    const randomIndex = Math.floor(Math.random() * urls.length);
    setCarImageUrl(urls[randomIndex]);
  };

  // Function to display the form to upload an image or to use an URL
  const setForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    // Update the state to show the form
    if (target.value === "url") {
      setFormToShow("url");
      setCarImageUrl("");
      setCarsFromDB([]);
      setCarTags({
        colorTags: "",
        carTypeTag: "",
        carBrandTag: "",
      });
    }
    // Update the state to show the form
    if (target.value === "upload") {
      setFormToShow("upload");
      setCarImageUrl("");
      setCarsFromDB([]);
      setCarTags({
        colorTags: "",
        carTypeTag: "",
        carBrandTag: "",
      });
    }
  };
  // Check if the tags are undefined
  const areTagsUndefined =
    carTags.carBrandTag === undefined &&
    carTags.carTypeTag === undefined &&
    carTags.colorTags === undefined;

  // Display the tags
  const tagsDisplay =
    carTags.carBrandTag || carTags.carTypeTag || carTags.colorTags ? (
      <p className="text-xl m-5 font-bold">
        Tags Found on your image:{" "}
        {`${carTags.colorTags} & ${carTags.carBrandTag} & ${carTags.carTypeTag}`}
      </p>
    ) : null;
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-16 ">
      {/* HEADER */}
      <h1 onClick={randomUrl} className="text-4xl font-bold">
        Find Your Dream Car !{" "}
      </h1>
      {/* BUTTON URL OR UPLOAD */}
      <div>
        <GreyButton text="Url" value="url" setForm={setForm} />
        <GreyButton text="Upload" value="upload" setForm={setForm} />
      </div>

      {/* FORM TO DISPLAY */}
      <div>
        {formToShow === "url" && (
          <FormUrlInput
            carImageUrl={carImageUrl}
            setCarImageUrl={setCarImageUrl}
            setCarsFromDB={setCarsFromDB}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            setCarTags={setCarTags}
            setLoading={setLoading}
          />
        )}
        {formToShow === "upload" && (
          <ImageInput
            setCarsFromDB={setCarsFromDB}
            setCarTags={setCarTags}
            setLoading={setLoading}
          />
        )}
        {/* TAGS DISPLAY */}
        {areTagsUndefined ? (
          <p className="text-xl font-bold m-5">
            No tags match : Here are all our cars !
          </p>
        ) : (
          tagsDisplay
        )}
        {/* LOADING DISPLAY */}
        {loading && (
          <p className=" text-2xl font-bold">Looking for your dream car ... </p>
        )}
      </div>
      {/* CARD DISPLAY */}
      <div className="grid  grid-cols-4 gap-x-8 gap-y-6 justify-center">
        {carCards && carCards}
      </div>
    </div>
  );
}

export default Homepage;
