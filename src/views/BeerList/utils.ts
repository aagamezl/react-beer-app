import { getBeerList, getBeerMetaData, searchBeerList } from '../../api';
import { ApiParams, Beer, Metadata } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void, params?: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMetaData = (setData: (data: number) => void, params?: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerMetaData(params);
      setData(response.data.total | 0);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchDataSearch = (setData: (data: Array<Beer>) => void, params: string) => {
  (async () => {
    try {
      const response = await searchBeerList(params);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};


export { fetchData, fetchMetaData, fetchDataSearch };
