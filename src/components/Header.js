import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAddState }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          bgColor={showAddState ? "red" : "green"}
          text={showAddState ? "close" : "Add New Task"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

// for case that prop don't pass from App.js in Header tag
Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
