import {
  Container,
  CountryList,
  Heading,
  Loader,
  SearchForm,
  Section,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) return;
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const countries = await fetchByRegion(region);
        setCountries(countries);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, [searchParams]);

  const onSubmit = region => {
    setSearchParams({ region });
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        <CountryList countries={countries} />
        {error && <Heading title={error} bottom />}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
