import { useScore } from "../hooks/useScore";

const Header = () => {
  const { score } = useScore();
  return <div>{score}</div>;
};

export default Header;
