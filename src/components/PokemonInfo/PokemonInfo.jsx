import { Component } from 'react';

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;
    if (prevName !== nextName) {
      console.log('Змінилось Name покемона');
      //console.log('prevProps.pokemonInfo', prevProps.pokemonName)
      //console.log('this.props.pokemonInfo', this.props.pokemonName)
      this.setState({ loading: true, pokemon: null });
      fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Покемона з name ${nextName} немає`));
        })
        .then(pokemon => this.setState({ pokemon }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { pokemon, loading, error } = this.state;
    const { pokemonName } = this.props;
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
    );
  }
}
