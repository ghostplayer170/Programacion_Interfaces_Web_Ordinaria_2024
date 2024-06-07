import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

type Data = {
  userid: string;
  videoid: string;
  videofav: boolean;
};

const Fav: FunctionComponent<Data> = ({ userid, videoid, videofav }) => {
  const [fav, setfav] = useState<boolean>(videofav);
  const toggleFav = async (userid: string, videoid: string) => {
    try {
      const response = await fetch(
        `https://videoapp-api.deno.dev/fav/${userid}/${videoid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        setfav(!fav);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <button
      class="fav-button"
      onClick={() => {
        toggleFav(userid, videoid);
      }}
    >
      {fav
        ? "\u2764\uFE0F Remove from Favorites"
        : "\u{1F90D} Add to Favorites"}
    </button>
  );
};
export default Fav;
