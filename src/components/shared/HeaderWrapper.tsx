'use client';

import { useAppContext } from '@/context/AppContext';
import { Fragment } from 'react';
import Navbar from './navbar/Navbar';
import TopNavHeading from './TopNavHeading';

const HeaderWrapper = () => {
  const { showTopNavDescription, isLoaded } = useAppContext();

  return (
    <Fragment>
      <TopNavHeading />
      <Navbar showTopNav={isLoaded && showTopNavDescription} />
    </Fragment>
  );
};

HeaderWrapper.displayName = 'HeaderWrapper';
export default HeaderWrapper;
