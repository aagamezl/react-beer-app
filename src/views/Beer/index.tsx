import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Link, Box, Chip } from '@mui/material';
import {
  BallotRounded,
  Business,
  Close,
  ExploreRounded,
  LocalBar,
  LocalDrink,
  LocationCity,
  LocationOn,
  Phone,
  Public,
  Room,
  Schedule,
  SportsBarRounded,
  WaterDrop,
} from '@mui/icons-material';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  useEffect(() => {
    fetchData(setBeer, id);
  }, [id]);

  if (!beer) {
    return <div>Loading...</div>;
  }

  const {
    name,
    brewery_type,
    address_1,
    address_2,
    address_3,
    city,
    state_province,
    postal_code,
    country,
    longitude,
    latitude,
    phone,
    website_url,
  } = beer;

  // Mapping beer types to respective icons
  const beerTypeIcons = {
    micro: { icon: <LocalBar />, label: 'Micro brewery' },
    nano: { icon: <WaterDrop />, label: 'Nano Brewery' },
    regional: { icon: <LocationCity />, label: 'Regional Brewery' },
    brewpub: { icon: <SportsBarRounded />, label: 'Brewpub' },
    large: { icon: <LocalDrink />, label: 'Large Brewery' },
    planning: { icon: <Schedule />, label: 'Planning' },
    bar: { icon: <SportsBarRounded />, label: 'Bar' },
    contract: { icon: <BallotRounded />, label: 'Contract Brewery' },
    proprietor: { icon: <Business />, label: 'Proprietor Brewery' },
    closed: { icon: <Close />, label: 'Closed Brewery' },
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" >
          <Typography variant="h4" component="h2" gutterBottom>
            {name}
          </Typography>
          <Chip
            icon={beerTypeIcons[brewery_type].icon}
            label={beerTypeIcons[brewery_type].label}
            color="primary"
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              <LocationOn /> {address_1}
            </Typography>
            {address_2 && (
              <Typography variant="body1" gutterBottom>
                {address_2}
              </Typography>
            )}
            {address_3 && (
              <Typography variant="body1" gutterBottom>
                {address_3}
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              <Room /> {city}, {state_province}, {country}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Phone /> {phone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <ExploreRounded /> Longitude: {longitude}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <ExploreRounded /> Latitude: {latitude}
            </Typography>
            {website_url && (
              <Typography variant="body1" gutterBottom>
                <Link href={website_url} target="_blank" rel="noopener">
                  <Public /> Visit Brewery Website
                </Link>
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Beer;
