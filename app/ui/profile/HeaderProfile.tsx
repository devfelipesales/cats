import NavProfile from "./NavProfile";
import Title from "./Title";

export default function HeaderProfile() {
  return (
    <div className="flex items-center justify-between">
      <Title />
      <NavProfile />
    </div>
  );
}
