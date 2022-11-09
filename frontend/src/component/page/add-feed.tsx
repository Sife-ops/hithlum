import defaultArtwork from "../../assets/default/artwork.svg";
import { useNavigate } from "react-router-dom";
import { useAddFeed } from "./add-feed-hook";

export const AddFeed = () => {
  const nav = useNavigate();
  const page = useAddFeed();

  // todo: spinner
  // todo: skeletons
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Add Feed</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          page.addFeed();
        }}
      >
        <input
          value={page.newFeedUrl}
          onChange={(e) => page.setNewFeedUrl(e.target.value)}
        />
        <button type="submit">submit</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            nav(-1);
          }}
        >
          back
        </button>
      </form>
      {page.feed && (
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            backgroundColor: "lightgreen",
          }}
        >
          <img
            src={page.feed.image || defaultArtwork}
            alt="artwork"
            style={{
              width: "128px",
              height: "auto",
            }}
          />
          <div>
            <h3>{page.feed.title}</h3>
            {page.feed.description && <p>{page.feed.description}</p>}
          </div>
        </div>
      )}
      {page.error && (
        <div
          style={{
            backgroundColor: "lightpink",
          }}
        >
          {page.error}
        </div>
      )}
    </div>
  );
};
