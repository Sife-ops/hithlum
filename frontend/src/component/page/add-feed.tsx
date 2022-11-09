import { useNavigate } from "react-router-dom";
import { useAddFeed } from "./add-feed-hook";

export const AddFeed = () => {
  const nav = useNavigate();
  const page = useAddFeed();

  return (
    <div>
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
          cancel
        </button>
      </form>
    </div>
  );
};
