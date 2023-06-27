import { Link } from 'react-router-dom';

export type TabType = 'specs' | 'description';

export type TabItem = { title: string; id: TabType };

type TabTitleProps = {
  tabItem: TabItem;
  isActive: boolean;
  onClick: () => void;
};

function TabTitle({ tabItem, isActive, onClick }: TabTitleProps): JSX.Element {
  return (
    <Link to={`?tab=${tabItem.id}`} data-testid={'tab-title'}>
      <button
        className={`tabs__control${isActive ? ' is-active' : ''}`}
        type="button"
        id={tabItem.id}
        data-testid={'tab-button'}
        onClick={onClick}
      >
        {tabItem.title}
      </button>
    </Link>
  );
}

export default TabTitle;
