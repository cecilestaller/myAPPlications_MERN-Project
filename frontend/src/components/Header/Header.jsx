import "./Header.scss";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AllAppsContext } from "../../context/Context";
import AppCard from "../AppCard/AppCard";
import Menu from "../Menu/Menu";
import MenuHeader from "../Menu/Menu";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const { allApps, setAllApps } = useContext(AllAppsContext);
  function searchApp(e) {
    setSearchInput(e.target.value);

    console.log(searchInput.length);
    const searchMatch = allApps?.filter((app) => {
      if (app?.company?.toLowerCase().includes(searchInput.toLowerCase())) {
        return app;
      } else if (
        app?.jobTitle?.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return app;
      } else if (app?.city?.toLowerCase().includes(searchInput.toLowerCase())) {
        return app;
      }
    });
    setSearchResults(searchMatch);
  }

  useEffect(() => {
    if (searchInput === "") {
      setSearchResults([]);
    }
  }, [searchInput]);

  console.log(searchInput);
  console.log("searchResult: ", searchResult);
  return (
    <header>
      <nav>
        <NavLink to="/">
          <h1>myAPPlications</h1>
        </NavLink>
        <div className="searchbar">
          <input
            onChange={searchApp}
            value={searchInput}
            autoComplete="off"
            type="text"
            name="searchbar"
            placeholder="Suche nach Firma, Position oder Stadt"
          />
        </div>
        <div className="icon-wrap">
          <Person2Icon />
          <LogoutIcon />
          <MenuHeader />
        </div>
      </nav>

      <div className="search-results">
        {searchResult?.length > 0 ? (
          <div>
            {searchResult.map((app) => (
              <Link to={`/details/${app?._id}`} key={app?._id}>
                <p>
                  {app?.company} | {app?.jobTitle} | {app?.city}
                </p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
