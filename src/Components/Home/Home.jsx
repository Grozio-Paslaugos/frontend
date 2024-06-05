import UserProceduresList from "../UserProcedureList/UserProceduresList";
import ProceduresList from "../ProcedureList/ProcedureList";

const procedures = [
  {
    name: "Knee Surgery",
    category: "Orthopedics",
    picture: "https://via.placeholder.com/160",
    averageRating: 4,
    totalRatings: 200,
    price: 1.5,
    data: "2024-10-15",
  
  },
  {
    name: "Root Canal",
    category: "Dentistry",
    picture: "https://via.placeholder.com/160",
    averageRating: 2,
    price: 100,
    totalRatings: 500,
    data: "2024-09-13",
  },
  {
    name: "Cataract Surgery",
    category: "Ophthalmology",
    picture: "https://via.placeholder.com/160",
    averageRating: 5,
    totalRatings: 50,
    price: 6000,
    data: "2024-08-05",
  },
];
export default function Home() {
  return (
    <>
      <ProceduresList procedures={procedures} />
    </>
  );
}
