import './card-list.style.css';
import MonsterCard from '../card/card.component';

const CardList = ({ monsters }) => (
  <div className="card-list">
    {monsters.map((monster) => {
      const { name, id, email } = monster;
      return <MonsterCard key={id} id={id} email={email} name={name} />;
    })}
  </div>
);

export default CardList;
