type FilterItemProps = {
  currentItem: {
    name: string;
    title: string;
  };
  onFilterChange: (title: string) => void;
  currentFilterValue: string[];
}

function FilterItem({ currentItem, currentFilterValue, onFilterChange }: FilterItemProps): JSX.Element {
  const checked = currentFilterValue.includes(currentItem.title);

  return (
    <div key={currentItem.name} className="custom-checkbox catalog-filter__item">
      <label>
        <input type="checkbox" name={currentItem.name} onClick={() => onFilterChange(currentItem.title)} defaultChecked={checked} />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{currentItem.title === 'Фотоаппарат' ? 'Фотокамера' : currentItem.title}</span>
      </label>
    </div>
  );
}

export default FilterItem;
