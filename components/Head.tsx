import { FunctionComponent } from "preact";
import Logout from "../islands/Logout.tsx";

type Data = {
  userName: string;
};

const Head: FunctionComponent<Data> = ({ userName }) => {
  return (
    <>
      <header class="header-container">
        <div class="header-content">
          <span class="user-name">{userName}</span>
          <Logout />
        </div>
      </header>
    </>
  );
};

export default Head;
