import { useState } from "react";
import { Star } from "lucide-react";
import styles from "./wishButton.module.css";

const WishButton = () => {
  const [favorited, setFavorited] = useState(false);

  return (
    <button
      onClick={() => setFavorited(!favorited)}
      className={`${styles.wishButton}`}
    >
      <Star
        size={16}
        color={favorited ? "gold" : "gray"}
        fill={favorited ? "gold" : "none"}
      />
    </button>
  );
};

export default WishButton;
