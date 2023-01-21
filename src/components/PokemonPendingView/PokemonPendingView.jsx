import { ImSpinner } from 'react-icons/im';
const styles = {
    spinner: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
      fontSize: 24,
    },
  };

export default function PokemonPendingView({ pokemonName }) {
    return (
        <div role="alert">
          <div style={styles.spinner}>
            <ImSpinner size="32" className="icon-spin" />
            Завантажуємо ...
          </div>
          {/*<PokemonDataView pokemon={pokemon} />*/}
        </div>
      );
}