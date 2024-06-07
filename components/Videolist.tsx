import { FunctionComponent } from "preact";
import { video } from "../types.ts";

type Data = {
  videos: video[];
  userid: string;
};

const Videolist: FunctionComponent<Data> = ({ videos, userid }) => {
  return (
    <>
      <div class="video-page-container">
        <h1 class="video-list-title">Curso Deno Fresh</h1>
        <div class="video-list-container">
          {videos.map((vid) => {
            return (
              <div class="video-item" key={vid.id}>
                <a href={`/video/${vid.id}}`} class="video-link">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    class="video-thumbnail"
                  />
                  <div class="video-info">
                    <h3 class="video-title">{vid.title}</h3>
                    <p class="video-description">{vid.description}</p>
                    <p class="video-release-date">
                      Release date: {new Date(vid.date).toLocaleDateString()}
                    </p>
                  </div>
                </a>
                <button class="fav-button">🤍 Add to Favorites</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Videolist;
