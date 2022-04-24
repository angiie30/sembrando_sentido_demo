import { Car } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateFormat } from "../common/commonFunctions";
import { getList } from "../repository/cars";

interface CarListProps {
  categoryId: number;
}
const CarListAccordion: React.FC<CarListProps> = ({
  categoryId,
}): JSX.Element => {
  const [list, setList] = useState<Car[]>([]);

  useEffect(() => {
    getList(categoryId).then(setList);
  }, [categoryId]);

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {list.map((car, index) => (
        <div key={index} className="accordion-item">
          <h2 className="accordion-header" id={`flush-${index}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse${index}`}
              aria-expanded="false"
              aria-controls={`flush-collapse${index}`}
            >
              {car.title}
            </button>
          </h2>
          <div
            id={`flush-collapse${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`flush-${index}`}
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <strong>Description</strong>
              <p>{!car.description ? "--" : car.description}</p>
              <strong>Status:</strong> {car.active ? "Active" : "Inactive"}
              <br />
              <strong>Modified:</strong> {DateFormat(car.modified)}
              <div className="d-grid gap-2 mt-3">
                <Link href={`/car/${car.id}`}>
                  <a className="btn btn-sm btn-outline-secondary">Edit</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarListAccordion;
