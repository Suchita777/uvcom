import { El_Messiri } from "@next/font/google";
import Footer from "./footer";
import Navbar from "./navbar";

const elMessiri = El_Messiri({ weight: "700", subsets: ["latin"] });

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <Navbar font={elMessiri} />
      <main>{children}</main>
      <Footer font={elMessiri} />
    </>
  );
}
