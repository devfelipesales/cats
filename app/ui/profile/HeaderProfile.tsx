import NavProfile from "./NavProfile";
import Title from "./Title";

export default function HeaderProfile() {
  return (
    <header className="flex items-center justify-between">
      <Title />
      <NavProfile />
    </header>
  );
}
