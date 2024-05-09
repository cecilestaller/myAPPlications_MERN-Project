import "./Header.scss";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header>
      <nav>
        <NavLink to="/">
          <h1>myAPPlications</h1>
        </NavLink>
        <div>
          <Person2Icon />
          <LogoutIcon />
          <MenuIcon onClick={() => setShowMenu(!showMenu)} />
        </div>
      </nav>
      <div className={showMenu ? "menu-show" : "menu-hide"}>
        <p>laufende Bewerbungen</p>
        <p>abgeschlossene Bewerbungen</p>
        <p>alle Bewerbungen</p>
        <p>Bewerbung hinzugfügen</p>
      </div>
    </header>
  );
};

export default Header;
