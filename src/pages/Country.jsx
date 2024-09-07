import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

const Country = () => {

  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const {countryId} = useParams();
  console.log('params-', countryId);

  useEffect(() => { 

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data); 

      } catch (error) {
        setError(error);
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchData();
  },[countryId])

  return (
    <Section>
      <Container>
        {country && <CountryInfo {...country} />}
        {isLoading && <Loader />}
        {error && <Heading title="Its wrong" bottom />}
      </Container>
    </Section>
  );
};

export default Country;
