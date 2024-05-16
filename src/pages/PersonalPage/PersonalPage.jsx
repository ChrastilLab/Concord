import MainNavBar from "../../components/Navbar/MainNavBar";
import PersonNavBar from "./components/PersonNavBar";
import { Separator } from "../../components/ui/separator";

function PersonalPage() {
  return (
    <div className="personal-page">
      <MainNavBar></MainNavBar>
      <div className="main">
        <Separator></Separator>
        <PersonNavBar></PersonNavBar>
      </div>
    </div>
  );
}

export default PersonalPage;
