import { useQuery } from 'react-query';
import axios from '../utils/axios';

export function useBooks(params = {}) {
  return useQuery(['book_list', params], async () => {
    const { data } = await axios.get('/api/highlights/books/');
    return data;
  });
}

export function useBookDetail({ id }) {
  return useQuery(['book_detail', id], async () => {
    const { data } = await axios.get(`/api/highlights/books/${id}`);
    return data;
  });
}
