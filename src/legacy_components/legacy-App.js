// import { Component } from 'react';
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import CardList from './card-list/card-list.comnponent';
import SearchBox from './search-box/search-box.component';

// Functional component style

const App = () => {
  const [searchFiled, setSearchFiled] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filterMonsters, setFilterMonsters] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilterMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchFiled);
    });
    setFilterMonsters(newFilterMonsters);
  }, [filterMonsters, searchFiled]);

  const onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchFiled(searchString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Moein monsters</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        type="search"
        className="monster-search-box"
      />
      <CardList monsters={filterMonsters} />
    </div>
  );
};

// Class component style

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchFiled: '',
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((user) => {
//         this.setState({ monsters: user });
//       });
//   }

//   onSearchChange = (event) => {
//     const searchString = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchFiled: searchString };
//     });
//   };

//   render() {
//     const { monsters, searchFiled } = this.state;
//     const { onSearchChange } = this;

//     const filterMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchFiled);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Moein monsters</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//           type="search"
//           className="monster-search-box"
//         />
//         <CardList monsters={filterMonsters} />
//       </div>
//     );
//   }
// }

export default App;
