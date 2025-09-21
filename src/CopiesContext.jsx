import {createContext} from 'react';

const CopiesContext = createContext({
  copies: '',
  setCopies: () => {}
});

export default CopiesContext;