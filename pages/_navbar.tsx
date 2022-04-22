import clsx from "clsx";
import Router, { useRouter } from "next/router";
import { logOut } from "../repository/user";
import { Profile } from "../types";

interface NavBarProps {
  user?: Profile;
}
const NavBar: React.FC<NavBarProps> = ({ user }): JSX.Element => {
  const router = useRouter();

  const logout = async () => {
    try {
      await logOut();
      Router.push(`/`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          Sembrando Sentido Demo
        </a>
        <div className="d-flex text-white">
          <a
            className={clsx("btn nav-link text-white", {
              "d-none": router.route === "/login" || user,
            })}
            onClick={() => Router.push(`/login`)}
          >
            <i className="bi bi-box-arrow-in-right"></i> Log In
          </a>
          <a
            className={clsx("btn nav-link text-white", {
              "d-none": !user,
            })}
            onClick={() => logout()}
          >
            {user?.name} (Log Out)
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
