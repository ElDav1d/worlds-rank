import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./SearchInput.module.css";

type incomingEvent = any;

type Props = {
  placeholder: string;
  onChange: (event: incomingEvent) => void;
};

const SearchInput = ({ placeholder, onChange }: Props) => {
  console.log(placeholder);
  return (
    <div className={styles.wrapper}>
      <SearchRounded />
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
