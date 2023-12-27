import HeaderProfile from "../ui/profile/Header/HeaderProfile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="">
        <HeaderProfile />
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
}
