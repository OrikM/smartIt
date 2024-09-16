import React from 'react';
import UserTable from './components/UserTable';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserTable />
      </div>
    </Provider>
  );
};

export default App;
