type FilterItemProps = {
  currentItem: {
    name: string;
    title: string;
  };
  disabled: boolean;
  onFilterChange: (title: string) => void;
  currentFilterValue: string[] | string;
}

function FilterItem({ currentItem, currentFilterValue, disabled, onFilterChange }: FilterItemProps): JSX.Element {
  const checked = Boolean(currentFilterValue.includes(currentItem.title) || currentFilterValue === currentItem.title);

  return (
    <div key={currentItem.name} className="custom-checkbox catalog-filter__item" data-testid={'filterItem'}>
      <label>
        <input type="checkbox" name={currentItem.name} disabled={disabled} onClick={() => onFilterChange(currentItem.title)} checked={checked} />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{currentItem.title === 'Фотоаппарат' ? 'Фотокамера' : currentItem.title}</span>
      </label>
    </div>
  );
}

export default FilterItem;
