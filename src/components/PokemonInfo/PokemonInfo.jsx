import { Component } from 'react';
import PokemonDataView from '../PokemonDataView/PokemonDataView'
import PokemonErrorView from '../PokemonErrorView/PokemonErrorView'

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;
    if (prevName !== nextName) {
      console.log('Змінилось Name покемона');
      //console.log('prevProps.pokemonInfo', prevProps.pokemonName)
      //console.log('this.props.pokemonInfo', this.props.pokemonName)
      this.setState({ status: 'pending' /*pokemon: null */ });
      fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Покемона з name ${nextName} немає`));
        })
        .then(pokemon => this.setState({ pokemon, status: 'resolved' })) // тільки, якщо прийшов покемон
        .catch(error => this.setState({ error, status: 'rejected' })) //тільки, якщо помилка
      /*.finally(() => this.setState({ loading: false }));*/
    }
  }

  render() {
    const { pokemon, error, status } = this.state;

    if (status === 'idle') {
      return <div>Введить name покемона</div>;
    }

    if (status === 'pending') {
      return <div>Завантажуємо ...</div>;
    }

    if (status === 'rejected') {
      return <PokemonErrorView message={error.message}/> 
    }

    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon}/>
    }
    /*
    return (
      <div>
        {error && <h1>{error.message}</h1>}
        {loading && <div>Завантажуємо ...</div>}
        {!pokemonName && <div>Введить name покемона</div>}
        {pokemon && (
          <div>
            <p>{pokemon.name}</p>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              width="240"
            />
            <ul>
              {pokemon.stats.map(entry => (
                <li key={entry.stat.name}>
                  {entry.stat.name}: {entry.base_stat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );*/
  }
}
