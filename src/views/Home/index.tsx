import { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { fetchDataSearch } from './../BeerList/utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

const FAVOURITES_KEY = 'favourites-beers';

const getFromStorage = (key: string): Array<Beer> => {
  return JSON.parse(localStorage.getItem(key) ?? '[]');
};

const saveToStorage = (key: string, data: Array<Beer>) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>(getFromStorage(FAVOURITES_KEY));
  const [searchText, setSearchText] = useState('');

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const addToSavedList = (beer: Beer) => {
    const newSavedList = [...savedList, beer];

    saveToStorage(FAVOURITES_KEY, newSavedList);

    setSavedList(() => [...savedList, beer]);
  };

  const onReloadList = () => fetchData(setBeerList);

  const onRemoveAllItems = () => {
    setSavedList([]);
    saveToStorage(FAVOURITES_KEY, []);
  }

  const onFilterChange = (value: string) => {
    setSearchText(value);

    if (value) {
      fetchDataSearch(setBeerList, value);
    } else {
      fetchData(setBeerList)
    }
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined' value={searchText} onChange={(e) => onFilterChange(e.target.value)} />
                <Button variant='contained' onClick={onReloadList}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox onChange={(event) => addToSavedList(beer)} />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={onRemoveAllItems}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
