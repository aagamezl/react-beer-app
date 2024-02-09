import { useEffect, useState } from 'react';
import { Avatar, Typography, Grid, Pagination, CardContent, Card, CardActions, Button, CardActionArea } from '@mui/material';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

import { Beer, SORT, TYPE } from '../../types';
import { fetchData, fetchDataSearch, fetchMetaData } from './utils';
import { FilterOption, SearchBar } from './searchBar';

import styles from './BeerList.module.css'
import { getStringForApi } from '../../utils';

const FILTERS = [
  'City',
  'Dist',
  'Name',
  'State',
  'Postal',
  'Type'
];

const getFilterOptions = (filters: string[]): FilterOption[] => {
  return filters.map(value => ({
    value: getStringForApi(value),
    label: `Filter by ${value}`,
    sortOrder: 'asc'
  }));
}

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState<SORT>('asc');
  const [filterOption, setFilterOption] = useState('');

  const perPage = 8; // Number of items per page

  useEffect(() => {
    const params = {
      page,
      per_page: perPage,
      // sort: sortOrder,
      sort: `${filterOption}:${sortOrder}`
      // [filterOption]: searchText
    };

    fetchData(setBeerList, params); // Fetch beer data based on page and items per page

    fetchMetaData(setTotalPages, params);
  }, [page, perPage, sortOrder, filterOption]);

  useEffect(() => {
    if (searchText) {
      fetchDataSearch(setBeerList, searchText)
    }
  }, [searchText]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <article>
      <section>
        <header>
          <Typography variant="h2" component="h2">Beer List</Typography>
        </header>
        <main>
          <div className={styles.searchBar}>
            <SearchBar
              filterOption={filterOption}
              filterOptions={getFilterOptions(FILTERS)}
              searchText={searchText}
              sortOrder={sortOrder}
              onSearchTextChange={setSearchText}
              onFilterOptionChange={setFilterOption}
              onSortOrderChange={setSortOrder}
            />
          </div>

          <Grid container spacing={2} justifyContent="center">
            {beerList.map((beer) => (
              <Grid item key={beer.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    // '&:hover': {
                    //   cursor: 'pointer',
                    //   backgroundColor: 'background.default',
                    // }
                  }}
                >
                  <CardActionArea onClick={() => onBeerClick(beer.id)}>
                    <CardContent>
                      {/* <Avatar sx={{ width: 56, height: 56 }}>
                        <SportsBarIcon />
                      </Avatar> */}
                      <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                        {beer.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Type:</strong> {beer.brewery_type}
                      </Typography>
                      <Typography variant="body1">
                        <strong>City:</strong> {beer?.city}
                      </Typography>
                      <Typography variant="body1">
                        <strong>State/Province:</strong> {beer?.state_province}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Country:</strong> {beer?.country}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Phone:</strong> {beer.phone}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ marginTop: 'auto' }}>
                    {beer.website_url && <Button
                      href={beer.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </Button>}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(totalPages / perPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            variant="outlined"
            shape="rounded"
            sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
          />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
