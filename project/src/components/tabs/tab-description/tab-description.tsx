type TabDescriptionProps = {
  description: string | undefined;
  id: number;
  selectedTabIndex: number;
}

function TabDescription({ description, id, selectedTabIndex }: TabDescriptionProps): JSX.Element {
  return (
    <div className={`tabs__element${selectedTabIndex === id ? ' is-active' : ''}`} id={id.toString()} data-testid={'tab-description'}>
      <div className="product__tabs-text">
        <p>{description || ''}</p>
      </div>
    </div>
  );
}

export default TabDescription;
