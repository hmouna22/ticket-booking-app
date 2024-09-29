import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import TripDetails from "./TripDetails"

type TripType = {
    id: number;
    departure: string;
    destination: string;
    date: Date;
    price: number;
}

interface Props {
    trips: TripType[];
}

export default function Home({ trips }: Props) {
    const navigate = useNavigate()

    const navigateToSearch = () => {
        navigate("/search")
        {console.log('mounaaaaaaaaaaaaaaaa',trips)}
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="py-16 bg-green-900 text-white">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">Find and Book Bus Tickets</h2>
                        <p className="text-lg">Discover the best bus routes and book tickets with ease.</p>
                        <button
                            onClick={() => navigateToSearch()}
                            className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Popular Bus Routes</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {trips.map(trip=> <TripDetails trip={trip} />)}
                        
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

