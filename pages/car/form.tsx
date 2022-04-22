import { Car, Category } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FormValidation } from "../../types";
import { getCategories } from "../../repository/categories";
import { getCarDetail } from "../../repository/cars";

interface CarFormProps {
  id?: number;
  formValidation: FormValidation;
  submit: (record: Car) => void;
  remove?: (record: Car) => void;
}
const CarForm: React.FC<CarFormProps> = ({
  id,
  formValidation,
  submit,
  remove,
}): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [car, setCar] = useState<Car>({
    id: Number(id),
    title: "",
    description: "",
    active: true,
    categoryId: 1,
    created: new Date(),
    modified: new Date(),
  });

  useEffect(() => {
    getCategories().then(setCategories);

    if (id !== undefined && !isNaN(+id)) getCarDetail(Number(id)).then(setCar);
  }, [id]);

  console.log(id);

  return (
    <>
      <main className="container mt-3">
        <div className="row">
          <div className="col-9">
            <p className="fs-3">{id === undefined ? "Add" : "Update"} Car</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <form
              className={clsx({ "was-validated": formValidation.isInvalid })}
            >
              <div className="row">
                <div className="form-group col-12">
                  <label>Brand</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={car.categoryId}
                    onChange={(ev: any) =>
                      setCar({ ...car, categoryId: Number(ev.target.value) })
                    }
                    required
                  >
                    <option selected>Select a brand</option>
                    {categories.map((category, index) => (
                      <option value={category.id} key={index}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Brand is required</div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="form-group col-12">
                  <label>Model</label>
                  <input
                    type="text"
                    className="form-control"
                    value={car.title}
                    onChange={(ev: any) =>
                      setCar({ ...car, title: ev.target.value })
                    }
                    required
                  />
                  <div className="invalid-feedback">Model is required</div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="form-group col-12">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={car.description}
                    onChange={(ev: any) =>
                      setCar({ ...car, description: ev.target.value })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="row mt-5">
                <div className="form-group col-12">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={car.active ? 1 : 0}
                    onChange={(ev: any) =>
                      setCar({
                        ...car,
                        active: ev.target.value === "1" ? true : false,
                      })
                    }
                    required
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                  <div className="invalid-feedback">Status is required</div>
                </div>
              </div>
            </form>
          </div>
          <div
            className={clsx("col-12 col-lg-6", {
              "d-none": id === undefined,
              "d-none d-lg-block": id !== undefined,
            })}
          >
            <div className="row justify-content-end">
              <div className="col-12 col-lg-10 mt-5 mt-lg-3">
                <h5>Delete Car</h5>
                <p>
                  Do you want to delete the record? This action is permanent,
                  there is no way to reverse it.
                </p>
                <button
                  type="button"
                  className="btn btn-warning float-end"
                  onClick={() => remove && remove(car)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div
            className={clsx("col-12 col-lg-6", { "d-none": id !== undefined })}
          >
            <div className="row mt-5 mt-lg-3">
              <div className="col-12">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere soluta quibusdam, commodi sequi laboriosam odit. Error
                  dicta eaque eius nihil beatae. Vitae hic corrupti aspernatur,
                  sequi quos iusto deserunt excepturi. kk
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-6 col-lg-3">
            <Link href={`/?cat=${car.categoryId}`}>
              <a className="btn btn-outline-secondary">Cancel</a>
            </Link>
          </div>
          <div className="col-6 col-lg-3">
            <button
              type="button"
              className="btn btn-primary float-end"
              onClick={() => submit(car)}
            >
              {id === undefined ? "Create" : "Update"}
            </button>
          </div>
        </div>

        <div
          className={clsx("mt-5 d-felx d-lg-none", {
            "d-none": id === undefined,
          })}
        >
          <div className="row col-12">
            <h5>Delete Car</h5>
            <p>
              Do you want to delete the record? This action is permanent, there
              is no way to reverse it.
            </p>
          </div>
          <div className="row justify-content-end">
            <div className="col-2 ">
              <button
                type="button"
                className="btn btn-warning float-end mt-1"
                onClick={() => remove && remove(car)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CarForm;
