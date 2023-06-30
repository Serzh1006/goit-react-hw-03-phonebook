import PropTypes from 'prop-types';
import css from './filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <label className={css.filterLabel}>
      Find contacts by Name
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={value}
        onChange={onChangeFilter}
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
