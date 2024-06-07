import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const MenuHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: "rgb(222, 239, 245)",
          color: "rgb(33, 37, 41)",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
          transition:
            "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgb(200, 220, 230)",
            boxShadow:
              "0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.05)",
          },
        }}
      >
        Menü
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/allapps">Alle Bewerbungen</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/openapps">Offene Bewerbungen</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/closedapps">Abgeschlossene Bewerbungen</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/addapp">Bewerbung hinzufügen</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuHeader;
