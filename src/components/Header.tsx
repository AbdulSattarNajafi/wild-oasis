import Navigation from "./Navigation";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
