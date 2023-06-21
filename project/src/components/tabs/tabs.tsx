import { useState } from 'react';
import TabTitle from './tab-title/tab-title';
import TabDescription from './tab-description/tab-description';
import TabSpecs from './tab-specs/tab-specs';

type TabpProps = {
  vendorCode: string | undefined;
  type: string | undefined;
  category: string | undefined;
  description: string | undefined;
  level: string | undefined;
}

const TAB_TITLES = [
  {
    title: 'Характеристики',
    id: 0,
  },
  {
    title: 'Описание',
    id: 1,
  },
];

function Tabs({ description, level, type, category, vendorCode }: TabpProps): JSX.Element {
  const [selectedTabIndex, setTabIndex] = useState(TAB_TITLES[0].id);

  const tabContent = () => {
    switch (selectedTabIndex) {
      case 0:
        return <TabSpecs level={level} type={type} category={category} vendorCode={vendorCode} id={0} selectedTabIndex={selectedTabIndex} />;
      case 1:
        return <TabDescription description={description} id={1} selectedTabIndex={selectedTabIndex} />;
    }
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {TAB_TITLES.map((tabItem) => <TabTitle key={tabItem.id} title={tabItem.title} id={tabItem.id} onClick={setTabIndex} selectedTabIndex={selectedTabIndex} />)}
      </div>
      <div className="tabs__content">
        {tabContent()}
      </div>
    </div>
  );
}

export default Tabs;
