import React from 'react';
import { Footer, Header, ExploreCard } from '../components';

const Explore = () => (
  <div>
    <Header page="Explore" />
    <ExploreCard type="food" />
    <ExploreCard type="drink" />
    <Footer />
  </div>
);

export default Explore;
