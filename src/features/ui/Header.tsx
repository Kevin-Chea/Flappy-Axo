import { useScore } from "../score/useScore";
import "./Header.css";

const Header = () => {
  const { score, bestScore } = useScore();
  return (
    <div className="header">
      <span>Current score : {score}</span>
      <span>Best score : {bestScore}</span>
    </div>
  );
};

export default Header;
