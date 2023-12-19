import { Component } from 'react';

import './card.style.css';

class MonsterCard extends Component {
  render() {
    const { id, name, email } = this.props;
    return (
      <div className="card-container">
        <img
          alt="mosnter"
          src={`https://robohash.org/${id}?set=set2&size=180x180`}
        />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    );
  }
}

export default MonsterCard;
//TODO: class component
