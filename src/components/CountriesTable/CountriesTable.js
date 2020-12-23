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
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
        >
          <div>Name</div>
          {value === 'name' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>Population</div>
          {value === 'population' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}
        >
          <div>Area (km<sup style={{ fontSize: '0.75rem' }}>2</sup>)</div>
          {value === 'area' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}
        >
          <div>Gini</div>
          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country, index) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <a className={styles.row} key={index}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0}</div>
          </a>
        </Link>
      ))}

    </div>
  );
};

export default CountriesTable;