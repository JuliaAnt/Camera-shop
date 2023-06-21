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
    <div className={`tabs__element${selectedTabIndex === id ? ' is-active' : ''}`} id={id.toString()}>
      <ul className="product__tabs-list">
        <li className="item-list"><span className="item-list__title">Артикул: </span>
          <p className="item-list__text">{vendorCode}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Категория: </span>
          <p className="item-list__text">{category === 'Фотоаппарат' ? 'Фотокамера' : category}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Тип камеры: </span>
          <p className="item-list__text">{type || ''}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Уровень: </span>
          <p className="item-list__text">{level || ''}</p>
        </li>
      </ul>
    </div>
  );
}

export default TabSpecs;
