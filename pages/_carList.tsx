import { Car } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateFormat } from "../common/commonFunctions";
import { getList } from "../repository/cars";

interface CarListProps {
  categoryId: number;
}
const CarList: React.FC<CarListProps> = ({ categoryId }): JSX.Element => {
  const [list, setList] = useState<Car[]>([]);

  useEffect(() => {
    getList(categoryId).then(setList);
  }, [categoryId]);

  return (
    <table className="table table-striped table-hover mt-3">
      <thead>
        <tr>
          <th scope="col" className="col-1">
            Model
          </th>
          <th scope="col" className="col-7">
            Description
          </th>
          <th scope="col" className="col-1">
            Status
          </th>
          <th scope="col" className="col-2">
            Modified
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {list.map((car, index) => (
          <tr key={index}>
            <th>{car.title}</th>
            <td>{!car.description ? "--" : car.description}</td>
            <td>{car.active ? "Active" : "Inactive"}</td>
            <td>{DateFormat(car.modified)}</td>
            <td>
              <div className="d-grid gap-2">
                <Link href={`/car/${car.id}`}>
                  <a className="btn btn-sm btn-outline-secondary">Edit</a>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarList;
