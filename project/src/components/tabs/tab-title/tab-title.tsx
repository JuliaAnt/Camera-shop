import { Link } from 'react-router-dom';

type TabTitleProps = {
  title: string;
  id: number;
  selectedTabIndex: number;
  onClick: (tabIndex: number) => void;
};

function TabTitle({ title, id, selectedTabIndex, onClick }: TabTitleProps): JSX.Element {
  return (
    <Link to={`?${id === 0 ? 'specs' : 'description'}`}>
      <button
        className={`tabs__control${selectedTabIndex === id ? ' is-active' : ''}`}
        type="button"
        id={id.toString()}
        onClick={() => onClick(id)}
      >{title}
      </button>
    </Link>
  );
}

export default TabTitle;
