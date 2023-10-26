import React, { useEffect } from 'react';
import './App.css';
import UserValidation from './components/UserValidation/UserValidation';
import ReferralTypeSelection from './components/ReferralTypeSelection/ReferralTypeSelection';
import ReferralSubmission from './components/ReferralSubmission/ReferralSubmission';
import { useSelector } from 'react-redux';

function App() {
  const currentStep = useSelector(state => state.appStep)

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = 'You will loose any data if you close the tab / window';
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);

  return (
    <div className="App">
      {currentStep === 0 && <UserValidation />}
      {currentStep === 1 && <ReferralTypeSelection />}
      {currentStep === 2 && <ReferralSubmission />}
    </div>
  );
}

export default App;
