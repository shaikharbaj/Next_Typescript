import Navbar from "@/app/components/Navbar/Navbar";
import Protected from "../utils/LoaderWrapper";
import { GuestWrapper } from "../utils/Wrapper/GuestWrapper";

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Protected> */}
      <GuestWrapper>
        <Navbar />
        {children}
      </GuestWrapper>

      {/* </Protected> */}
    </>
    //   </section>
  );
}
