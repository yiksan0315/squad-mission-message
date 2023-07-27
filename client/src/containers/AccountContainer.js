import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts } from '../modules/Account';
import HomeScreen from '../screens/HomeScreen';
import ErrorBox from '../components/ErrorBox';
import LoadingBox from '../components/LoadingBox';

const AccountContainer = ({ token }) => {
  const dispatch = useDispatch();

  const accounts = useSelector((state) => {
    return state.Account.accounts;
  });

  useEffect(() => {
    dispatch(setAccounts());
  }, [dispatch]);

  if (accounts.error) {
    return <ErrorBox error={accounts.error}></ErrorBox>;
  } else {
    if (accounts.loading) {
      return <LoadingBox message={'Loading Accounts...'} />;
    } else {
      return <HomeScreen token={token} accounts={accounts.data}></HomeScreen>;
    }
  }
};

export default AccountContainer;
