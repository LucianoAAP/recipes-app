import React, {} from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  const clearEmail = () => localStorage.clear();
  const email = userEmail ? userEmail.email : '';
  const history = useHistory();

  return (
    <div>
      <header data-testid="profile-email">{ email }</header>
      <section>

        <Button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </Button>

        <Button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </Button>

        <Button
          type="button"
          onClick={ () => { clearEmail(); history.push('/'); } }
          data-testid="profile-logout-btn"
        >
          Sair
        </Button>
      </section>
    </div>
  );
};

export default UserProfile;