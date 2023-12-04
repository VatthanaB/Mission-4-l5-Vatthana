interface Car {
  _id: string;
  brand: string;
  image: string;
  color: string;
  price: number;
  type: string;
}
interface Props {
  car: Car;
}
const Card = (props: Props) => {
  const { car } = props;
  return (
    <div
      className="flex-col items-center justify-center max-w-md bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      key={car.image}
    >
      <div>
        <img
          className="rounded-lg object-cover h-48 w-full"
          src={car.image}
          alt="car"
        />

        <p>Description: </p>
        <p>Price: {`${car.price}$`}</p>
        <p>Brand: {car.brand}</p>
        <p>Color: {car.color}</p>
        <p>Type: {car.type}</p>

        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Purchase
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Card;
