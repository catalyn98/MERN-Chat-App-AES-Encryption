import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 container">
        <Sidebar />
        <MessageContainer />
      </div>
      <div className="responsive-message">
        For now, the application can be used on devices with screens larger than
        640 pixels. Please use a different device or enlarge the window to
        access the application.
      </div>
    </div>
  );
};
export default Home;
