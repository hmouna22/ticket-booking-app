import Footer from "./Footer";

type TripType = {
    id: number;
    departure: string;
    destination: string;
    date: Date;
    price: number;
}
interface Props {
    trip: TripType;
}

export default function TripDetails({trip}:Props) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="py-16">
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">City {trip.departure} to City {trip.destination}</h3>
                        <p>Departure: {trip.id}</p>
                        <p>Price: {trip.price} DT</p>
                        <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">
                            Book Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
