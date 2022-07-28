import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './views/MainPage';
import { IssuesProvider } from './views/MainPage/context';

function App() {
  return (
    <div className="p-4">
      <IssuesProvider>
        <MainPage />
      </IssuesProvider>
    </div>
  );
}

export default App;
