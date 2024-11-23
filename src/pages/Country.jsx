import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

const Country = () => {
  const location = useLocation();
  const [country, setCountry] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { countryId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countryId]);
  return (
    <Section>
      <Container>
        <Link to={location.state || '/'}>Go back</Link>
        {isLoading && <Loader />}
        {isError && <Heading title={isError} bottom />}

        {country && (
          <CountryInfo
            flag={country.flag}
            capital={country.capital}
            countryName={country.countryName}
            languages={country.languages}
            population={country.population}
          />
        )}
      </Container>
    </Section>
  );
};

export default Country;
