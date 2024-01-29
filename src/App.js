import React from 'react';
import './App.css';
import UserValidation from './components/UserValidation/UserValidation';
import ReferralTypeSelection from './components/ReferralTypeSelection/ReferralTypeSelection';
import ReferralSubmission from './components/ReferralSubmission/ReferralSubmission';
import { useSelector } from 'react-redux';
import SessionTimer from './components/SessionTimer/SessionTimer';
import { IdleTimerProvider } from 'react-idle-timer';

function App() {
  const currentStep = useSelector(state => state.appStep)

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = 'You will loose any data if you close the tab / window';
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);

  return (
    <div className="App">
      <IdleTimerProvider>
        {/*<SessionTimer/>*}*/}
        {currentStep === 0 && <UserValidation />}
        {(currentStep === 1 || currentStep === 2) && <SessionTimer/>}
        {currentStep === 1 && <ReferralTypeSelection />}
        {currentStep === 2 && <ReferralSubmission />}
      </IdleTimerProvider>
    </div>
  );
}

export default App;
