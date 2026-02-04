import HomeNav from "../nav/home-nav";
import FooterNav from "../nav/footer-nav";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WebsiteShell = ({ children }: Props) => {
  return (
    <>
      <HomeNav />
      {children}
      <FooterNav />
    </>
  );
};

WebsiteShell.displayName = "WebsiteShell";

export default WebsiteShell;
