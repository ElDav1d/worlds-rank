import { useState } from "react";
import { GetStaticProps } from "next";
import { CountryFromAll } from "../interfaces";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";

type Props = {
  countries: CountryFromAll[];
};

export default function Home({ countries }: Props) {
  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter(
    ({ name, region, subregion }) =>
      name.toLowerCase().includes(keyword) ||
      region.toLowerCase().includes(keyword) ||
      subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (event: Event) => {
    event.preventDefault();
    const eTarget = event.target as HTMLInputElement;
    setKeyword(eTarget.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
