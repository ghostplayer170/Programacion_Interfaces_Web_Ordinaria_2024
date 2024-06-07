import { FunctionComponent } from "preact";

type Data = {
  userName: string;
};

const Head: FunctionComponent<Data> = ({ userName }) => {
  return (
    <>
      <header class="header-container">
        <div class="header-content">
          <span class="user-name">{userName}</span>
          <a class="logout-button">Logout</a>
        </div>
      </header>
    </>
  );
};

export default Head;
