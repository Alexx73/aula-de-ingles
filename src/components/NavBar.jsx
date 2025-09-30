import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar fluid rounded>
      {/* Logo */}
      <NavbarBrand as={Link} to="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-8"
          alt="Flowbite Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Aula de Inglés 2do año
        </span>
      </NavbarBrand>

      {/* Botón Hamburguesa */}
      <NavbarToggle />

      {/* Links de navegación */}
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/dialogo">
          Diálogo
        </NavbarLink>
        <NavbarLink as={Link} to="/numbers">
          Numbers2
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
