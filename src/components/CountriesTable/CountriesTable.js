import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import { useState } from 'react';
import styles from './CountriesTable.module.css';
import Link from 'next/Link';

const orderBy = (countries, value, direction) => {

  if (direction === 'ascending') {
    return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
  } else if (direction === 'descending') {
    return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1);
  }

  return countries;
}

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === 'descending') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else if (direction === 'ascending') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
}

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection('descending');
    } else if (direction === 'descending') {
      setDirection('ascending');
    } else {
      setDirection(null)
    }
  }

  const setValueAndDirection = value => {
    switchDirection();
    setValue(value)
  }


  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
        >
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
      </div>

      {orderedCountries.map((country, index) => (
        <Link href={`/country/${country.alpha3Code}`} >
          <a className={styles.row} key={index}>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
          </a>
        </Link>
      ))}

    </div>
  );
};

export default CountriesTable;