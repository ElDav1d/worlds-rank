import { useState } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { Country } from "../../interfaces";
import styles from "./CountriesTable.module.css";
import Link from "next/Link";

type Props = {
  countries: Country[];
};

type Value = string;

type Direction = string;

const orderBy = (countries: Country[], value: Value, direction: Direction) => {
  if (direction === "ascending") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  } else if (direction === "descending") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "descending") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else if (direction === "ascending") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }: Props) => {
  const [direction, setDirection] = useState("");
  const [value, setValue] = useState("");

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("descending");
    } else if (direction === "descending") {
      setDirection("ascending");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value: Value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.75rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map(
        ({ alpha3Code, name, flag, population, area, gini }) => (
          <Link href={`/country/${alpha3Code}`} key={name}>
            <a className={styles.row}>
              <div className={styles.flag}>
                <img src={flag} alt={name} />
              </div>
              <div className={styles.name}>{name}</div>
              <div className={styles.population}>{population}</div>
              <div className={styles.area}>{area || 0}</div>
              <div className={styles.gini}>{gini || 0}</div>
            </a>
          </Link>
        )
      )}
    </div>
  );
};

export default CountriesTable;
