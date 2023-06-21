type TabTitleProps = {
  title: string;
  id: number;
  selectedTabIndex: number;
  onClick: (tabIndex: number) => void;
};

function TabTitle({ title, id, selectedTabIndex, onClick }: TabTitleProps): JSX.Element {
  return (
    <button
      className={`tabs__control${selectedTabIndex === id ? ' is-active' : ''}`}
      type="button"
      id={id.toString()}
      onClick={() => onClick(id)}
    >{title}
    </button>
  );
}

export default TabTitle;
