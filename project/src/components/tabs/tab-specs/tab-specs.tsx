type TabSpecsProps = {
  vendorCode: string | undefined;
  type: string | undefined;
  category: string | undefined;
  level: string | undefined;
  id: number;
  selectedTabIndex: number;
}

function TabSpecs({ vendorCode, type, category, level, id, selectedTabIndex }: TabSpecsProps): JSX.Element {
  return (
    <div className={`tabs__element${selectedTabIndex === id ? ' is-active' : ''}`} id={id.toString()} data-testid={'tab-specs'}>
      <ul className="product__tabs-list">
        <li className="item-list"><span className="item-list__title">Артикул: </span>
          <p className="item-list__text">{vendorCode}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Категория: </span>
          <p className="item-list__text" data-testid={'tab-specs-category'}>{category === 'Фотоаппарат' ? 'Фотокамера' : category}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Тип камеры: </span>
          <p className="item-list__text" data-testid={'tab-specs-type'}>{type || ''}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Уровень: </span>
          <p className="item-list__text" data-testid={'tab-specs-level'}>{level || ''}</p>
        </li>
      </ul>
    </div>
  );
}

export default TabSpecs;
