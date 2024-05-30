import UserProceduresList from "../UserProcedureList/UserProceduresList";
import ProceduresList from "../ProcedureList/ProcedureList";

const procedures = [
  {
    name: "Knee Surgery",
    category: "Orthopedics",
    picture: "https://via.placeholder.com/160",
    rating: 4.5,
  },
  {
    name: "Root Canal",
    category: "Dentistry",
    picture: "https://via.placeholder.com/160",
    rating: 4.2,
  },
  {
    name: "Cataract Surgery",
    category: "Ophthalmology",
    picture: "https://via.placeholder.com/160",
    rating: 4.8,
  },
];
export default function Home() {
  return (
    <>
      <ProceduresList procedures={procedures} />
    </>
  );
}
