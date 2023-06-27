type TabDescriptionProps = {
  description: string | undefined;
}

function TabDescription({ description, }: TabDescriptionProps): JSX.Element {
  return (
    <div className={'tabs__element is-active'} id={'description'} data-testid={'tab-description'}>
      <div className="product__tabs-text">
        <p>{description || ''}</p>
      </div>
    </div>
  );
}

export default TabDescription;
