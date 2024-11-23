import { Container, CountryList, Heading, Loader, Section } from 'components';
import { getCountries } from 'service/countryApi';
import { useEffect, useState } from 'react';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        <CountryList countries={countries} />
        {error && <Heading title={error} bottom />}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default Home;
